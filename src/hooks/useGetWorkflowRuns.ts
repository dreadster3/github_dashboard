import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IWorkflowRunQueryParameters } from '../clients/github_client';
import { DATA_STALE_TIME, OWNER, REPOSITORY_NAME } from '../constants';
import { IWorkflowRun } from '../models/WorkflowRun';
import { IWorkflowRuns } from '../models/WorkflowRuns';
import useGithubClient from './useGithubClient';

function useGetWorkflowRuns(
    workflow_id: number,
    options?: IWorkflowRunQueryParameters,
) {
    const githubClient = useGithubClient();
    const queryClient = useQueryClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading, isFetching } = useQuery(
        [
            'workflow_runs',
            workflow_id,
            {
                page: options?.page ?? 1,
                per_page: options?.per_page,
            },
        ],
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
                    (options?.per_page ?? cached_data?.total_count ?? Infinity)
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

    const prefetchNextPage = () => {
        if (options?.per_page) {
            queryClient.prefetchQuery(
                [
                    'workflow_runs',
                    workflow_id,
                    {
                        page: (options?.page ?? 1) + 1,
                        per_page: options.per_page,
                    },
                ],
                async () =>
                    githubClient.get_workflow_runs_async(
                        owner,
                        repo,
                        workflow_id,
                        {
                            page: (options?.page ?? 1) + 1,
                            per_page: options.per_page,
                        },
                    ),
            );
        }
    };

    return { data, isLoading, isFetching, prefetchNextPage };
}

export default useGetWorkflowRuns;
