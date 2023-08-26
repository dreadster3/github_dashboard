import { useMutation, useQueryClient } from 'react-query';
import useGithubClient from './useGithubClient';
import { OWNER, REPOSITORY_NAME } from '../constants';
import { EWorkflowRunStatus, IWorkflowRun } from '../models/WorkflowRun';

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
                // OPTIMISTIC UPDATE
                const data: IWorkflowRun[] | undefined =
                    queryClient.getQueryData([
                        'workflow_runs',
                        vars.workflow_id,
                    ]);

                if (data && data.length > 0) {
                    const workflow = data[0];

                    workflow.status = EWorkflowRunStatus.QUEUED;
                    workflow.conclusion = undefined;

                    queryClient.setQueryData(
                        ['workflow_runs', vars.workflow_id],
                        [workflow],
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
