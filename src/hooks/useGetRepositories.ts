import { IPageQueryParameters } from '@/clients/github_client';
import get_query_client from '@/utils/query_client';
import get_server_github_client from '@/utils/server_github_client';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import useGithubClient from './useGithubClient';

function useGetOrganizationRepositories(
    owner: string,
    options?: IPageQueryParameters,
) {
    const client = useGithubClient();
    const { data: session } = useSession();

    const { data, isLoading } = useQuery(
        [
            owner,
            'repositories',
            {
                page: options?.page ?? 1,
                per_page: options?.per_page,
            },
        ],
        () =>
            owner !== session?.user.username
                ? client.get_organization_repositories_async(owner, options)
                : client.get_authenticated_user_repositories_async(options),
        {
            enabled: !!session,
        },
    );

    return {
        data,
        isLoading,
    };
}

export const server_prefetch_organization_repositories_async = async (
    owner: string,
    options?: IPageQueryParameters,
): Promise<QueryClient> => {
    // TODO: Improve this as server session gets fetched twice
    const session = await getServerSession();
    const github_client = await get_server_github_client();
    const query_client = get_query_client();

    await query_client.prefetchQuery(
        [
            owner,
            'repositories',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () =>
            session?.user.username !== owner
                ? github_client.get_organization_repositories_async(
                      owner,
                      options,
                  )
                : github_client.get_authenticated_user_repositories_async(
                      options,
                  ),
    );

    return query_client;
};

export default useGetOrganizationRepositories;
