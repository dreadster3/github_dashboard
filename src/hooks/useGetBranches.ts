import { IPageQueryParameters } from '@/clients/github_client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import useGithubClient from './useGithubClient';

function useGetBranches(
    owner: string,
    repo: string,
    options?: IPageQueryParameters,
) {
    const client = useGithubClient();
    const { data: session } = useSession();

    const { data, isLoading, isError } = useQuery(
        [
            owner,
            repo,
            'branches',
            {
                page: options?.page ?? 1,
                per_page: options?.per_page,
            },
        ],
        () => client.get_branches_async(owner, repo, options),
        {
            enabled: !!session,
        },
    );

    return { data, isLoading, isError };
}

export default useGetBranches;
