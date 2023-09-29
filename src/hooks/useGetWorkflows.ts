import get_query_client from '@/utils/query_client';
import get_server_github_client from '@/utils/server_github_client';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { IPageQueryParameters } from '../clients/github_client';
import useGithubClient from './useGithubClient';

function useGetWorkflows(
    owner: string,
    repo: string,
    options?: IPageQueryParameters,
) {
    const client = useGithubClient();
    const { data: session } = useSession();

    const { data, isLoading } = useQuery(
        [
            owner,
            repo,
            'workflows',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () => client.get_workflows_async(owner, repo, options),
        {
            enabled: !!session,
        },
    );

    return { data, isLoading };
}

export const server_prefetch_workflows_async = async (
    owner: string,
    repo: string,
    options?: IPageQueryParameters,
): Promise<QueryClient> => {
    const github_client = await get_server_github_client();
    const query_client = get_query_client();

    await query_client.prefetchQuery(
        [
            owner,
            repo,
            'workflows',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () => github_client.get_workflows_async(owner, repo, options),
    );

    return query_client;
};

export default useGetWorkflows;
