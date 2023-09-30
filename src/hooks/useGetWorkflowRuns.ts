import get_query_client from '@/utils/query_client';
import get_server_github_client from '@/utils/server_github_client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
    IPageQueryParameters,
    IWorkflowRunQueryParameters,
} from '../clients/github_client';
import { query_client_options } from '../constants';
import { IRun } from '../models/Run';
import { IRuns } from '../models/Runs';
import useGithubClient from './useGithubClient';

function useGetWorkflowRuns(
    owner: string,
    repo: string,
    workflow_id: number,
    options?: IWorkflowRunQueryParameters,
) {
    const githubClient = useGithubClient();
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    const { data, isLoading, isFetching } = useQuery(
        [
            owner,
            repo,
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
            refetchInterval:
                query_client_options.defaultOptions?.queries?.staleTime,
            initialData: () => {
                const cached_data: IRuns | undefined = queryClient.getQueryData(
                    [owner, repo, 'workflow_runs', workflow_id],
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
                queryClient.getQueryState([owner, repo, 'workflow_runs'])
                    ?.dataUpdatedAt,
            placeholderData: () => {
                const cached_data: IRuns | undefined = queryClient.getQueryData(
                    [
                        owner,
                        repo,
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
            enabled: !!workflow_id && !!session && !!owner && !!repo,
        },
    );

    const prefetch_next_page = () => {
        if (options?.per_page) {
            if (session) {
                queryClient.prefetchQuery(
                    [
                        owner,
                        repo,
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
        }
    };

    return {
        data,
        isLoading,
        isFetching,
        prefetch_next_page,
    };
}

export const server_prefetch_workflow_runs_async = async (
    owner: string,
    repo: string,
    workflow_id: number,
    options?: IWorkflowRunQueryParameters,
) => {
    const github_client = await get_server_github_client();
    const query_client = get_query_client();

    await query_client.prefetchQuery(
        [
            owner,
            repo,
            'workflow_runs',
            workflow_id,
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () =>
            github_client.get_workflow_runs_async(
                owner,
                repo,
                workflow_id,
                options,
            ),
    );

    return query_client;
};

export default useGetWorkflowRuns;
