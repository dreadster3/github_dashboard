import { REPOSITORY_NAME, REPOSITORY_OWNER } from '@/constants';
import get_query_client from '@/utils/query_client';
import get_server_github_client from '@/utils/server_github_client';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { IPageQueryParameters } from '../clients/github_client';
import useGithubClient from './useGithubClient';

function useGetWorkflows(options?: IPageQueryParameters) {
    const client = useGithubClient();
    const owner = REPOSITORY_OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading } = useQuery(
        [
            'workflows',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () => client.get_workflows_async(owner, repo, options),
    );

    return { data, isLoading };
}

export const prefetchWorkflows = async (
    options?: IPageQueryParameters,
): Promise<QueryClient> => {
    const github_client = await get_server_github_client();
    const query_client = get_query_client();
    const owner = REPOSITORY_OWNER;
    const repo = REPOSITORY_NAME;

    await query_client.prefetchQuery(
        [
            'workflows',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () => github_client.get_workflows_async(owner, repo, options),
    );

    return query_client;
};

export default useGetWorkflows;
