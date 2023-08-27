import { useQuery, useQueryClient } from 'react-query';
import useGithubClient from './useGithubClient';
import { DATA_STALE_TIME, OWNER, REPOSITORY_NAME } from '../constants';
import { IWorkflowRunQueryParameters } from '../clients/github_client';
import { IWorkflowRun } from '../models/WorkflowRun';
import { IWorkflowRuns } from '../models/WorkflowRuns';

function useGetWorkflowRuns(
    workflow_id: number,
    options?: IWorkflowRunQueryParameters,
) {
    const githubClient = useGithubClient();
    const queryClient = useQueryClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const queryParams = Object.assign(
        options?.per_page ? { per_page: options.per_page } : {},
        options?.page ? { page: options.page } : {},
    );

    const { data, isLoading } = useQuery(
        ['workflow_runs', workflow_id, queryParams],
        async () =>
            githubClient.get_workflow_runs_async(
                owner,
                repo,
                workflow_id,
                options,
            ),
        {
            refetchOnWindowFocus: true,
            refetchInterval: DATA_STALE_TIME,
            keepPreviousData: true,
            initialData: () => {
                const cached_data: IWorkflowRuns | undefined =
                    queryClient.getQueryData(
                        ['workflow_runs', workflow_id, { page: options?.page }],
                        {
                            exact: false,
                        },
                    );

                const cached_workflow_runs: IWorkflowRun[] =
                    cached_data?.workflow_runs ?? [];

                if (
                    cached_workflow_runs.length <
                    (queryParams.per_page ??
                        cached_data?.total_count ??
                        Infinity)
                ) {
                    return undefined;
                }

                return {
                    total_count: cached_workflow_runs.length,
                    workflow_runs: cached_workflow_runs.slice(
                        0,
                        Math.min(
                            cached_workflow_runs.length,
                            options?.per_page ?? cached_workflow_runs.length,
                        ),
                    ),
                };
            },
            initialDataUpdatedAt: () =>
                queryClient.getQueryState([
                    'workflow_runs',
                    workflow_id,
                    { page: options?.page },
                ])?.dataUpdatedAt,
            placeholderData: () => {
                const cached_data: IWorkflowRuns | undefined =
                    queryClient.getQueryData(['workflow_runs', workflow_id], {
                        exact: false,
                    });

                const cached_workflow_runs: IWorkflowRun[] =
                    cached_data?.workflow_runs ?? [];

                return {
                    total_count: cached_workflow_runs.length,
                    workflow_runs: cached_workflow_runs.slice(
                        0,
                        Math.min(
                            cached_workflow_runs.length,
                            options?.per_page ?? cached_workflow_runs.length,
                        ),
                    ),
                };
            },
            enabled: !!workflow_id,
        },
    );

    return { data, isLoading };
}

export default useGetWorkflowRuns;
