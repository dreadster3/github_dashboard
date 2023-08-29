import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { OWNER, REPOSITORY_NAME } from '../constants';
import { EWorkflowRunStatus } from '../models/WorkflowRun';
import { IWorkflowRuns } from '../models/WorkflowRuns';
import useGithubClient from './useGithubClient';

interface IUseDispatchWorkflowMutationProps {
    workflow_id: number;
    branch?: string;
    inputs?: { [key: string]: string };
}

function useDispatchWorkflow() {
    const github_client = useGithubClient();
    const queryClient = useQueryClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const { mutate, isLoading } = useMutation(
        ({
            workflow_id,
            branch,
            inputs,
        }: IUseDispatchWorkflowMutationProps) => {
            return github_client.dispatch_workflow_async(
                owner,
                repo,
                workflow_id,
                branch ?? 'main',
                inputs,
            );
        },
        {
            onSuccess: (_, vars) => {
                const queries: [QueryKey, IWorkflowRuns | undefined][] =
                    queryClient.getQueriesData({
                        queryKey: [
                            'workflow_runs',
                            vars.workflow_id,
                            { page: 1 },
                        ],
                        exact: false,
                    });

                const query = queries.reduce(
                    (
                        prev: [QueryKey, IWorkflowRuns | undefined],
                        current: [QueryKey, IWorkflowRuns | undefined],
                    ) => {
                        return (prev[1]?.workflow_runs ?? 0) >
                            (current[1]?.workflow_runs ?? 0)
                            ? prev
                            : current;
                    },
                );

                // OPTIMISTIC UPDATE
                const old_data: IWorkflowRuns | undefined = query[1];

                const old_runs = old_data?.workflow_runs;

                if (old_runs && old_runs.length > 0) {
                    const workflow = old_runs[0];
                    const new_workflow_run = Object.assign({}, workflow, {
                        run_number: workflow.run_number + 1,
                        status: EWorkflowRunStatus.QUEUED,
                        conclusion: undefined,
                    });

                    queryClient.setQueriesData(
                        {
                            queryKey: ['workflow_runs', vars.workflow_id],
                            exact: false,
                        },
                        {
                            total_count: old_data.total_count + 1,
                            workflow_runs: [
                                new_workflow_run,
                                ...old_runs.slice(0, old_runs.length - 1),
                            ],
                        },
                    );
                }
            },
        },
    );

    return {
        dispatch_workflow: mutate,
        isLoading,
    };
}

export default useDispatchWorkflow;
