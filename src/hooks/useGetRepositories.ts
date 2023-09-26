import { IPageQueryParameters } from '@/clients/github_client';
import { useQuery } from '@tanstack/react-query';
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

export default useGetOrganizationRepositories;
