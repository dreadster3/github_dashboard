import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    IPageQueryParameters,
    IWorkflowRunQueryParameters,
} from '../clients/github_client';
import { DATA_STALE_TIME, OWNER, REPOSITORY_NAME } from '../constants';
import { IRun } from '../models/Run';
import { IRuns } from '../models/Runs';
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
                const cached_data: IRuns | undefined = queryClient.getQueryData(
                    ['workflow_runs', workflow_id],
                    {
                        predicate: (query) => {
                            const query_options = query
                                .queryKey[2] as IPageQueryParameters;

                            if (query_options !== null) {
                                return (
                                    query_options.page ==
                                        (options?.page ?? 1) &&
                                    (query_options.per_page ?? 30) >
                                        (options?.per_page ?? Infinity)
                                );
                            }

                            return true;
                        },
                        exact: false,
                    },
                );

                const cached_workflow_runs: IRun[] =
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
                queryClient.getQueryState(['workflow_runs'])?.dataUpdatedAt,
            placeholderData: () => {
                const cached_data: IRuns | undefined = queryClient.getQueryData(
                    [
                        'workflow_runs',
                        {
                            page: options?.page ?? 1,
                            per_page: options?.per_page,
                        },
                    ],
                    {
                        exact: false,
                    },
                );

                const cached_workflow_runs: IRun[] =
                    cached_data?.workflow_runs.filter(
                        (w) => w.workflow_id == workflow_id,
                    ) ?? [];

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
