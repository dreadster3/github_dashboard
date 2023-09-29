import { IPageQueryParameters } from '@/clients/github_client';
import get_query_client from '@/utils/query_client';
import get_server_github_client from '@/utils/server_github_client';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import useGithubClient from './useGithubClient';

function useGetOrganizations(options?: IPageQueryParameters) {
    const client = useGithubClient();
    const { data: session } = useSession();

    const { data, isLoading, isError } = useQuery(
        [
            'organizations',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () => client.get_organizations_async(options),
        {
            enabled: !!session,
            select: (data) => {
                return [
                    {
                        name: session?.user?.username ?? '',
                        description: 'Private organization',
                        avatar_url: session?.user?.image ?? '',
                    },
                    ...data,
                ];
            },
        },
    );

    return { data, isLoading, isError };
}

export const server_prefetch_organizations_async = async (
    options?: IPageQueryParameters,
): Promise<QueryClient> => {
    const github_client = await get_server_github_client();
    const query_client = get_query_client();

    await query_client.prefetchQuery(
        [
            'organizations',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () => github_client.get_organizations_async(options),
    );

    return query_client;
};

export default useGetOrganizations;
