import { IRepository } from '@/models/Repository';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import useGithubClient from './useGithubClient';

function useGetRepository(owner: string, repository: string) {
    const { data: session } = useSession();
    const client = useGithubClient();
    const query_client = useQueryClient();

    const { data } = useQuery(
        [owner, 'repositories', repository],
        () => client.get_repository_async(owner, repository),
        {
            enabled: !!session && !!owner && !!repository,
            initialData: () => {
                const cached_data: IRepository[] | undefined =
                    query_client.getQueryData([owner, 'repositories'], {
                        exact: false,
                    });

                const cached_repositories = cached_data ?? [];

                if (!cached_repositories || cached_repositories.length === 0) {
                    return undefined;
                }

                return cached_repositories.find(
                    (repo) => repo.name === repository,
                );
            },
        },
    );

    return { data };
}

export default useGetRepository;
