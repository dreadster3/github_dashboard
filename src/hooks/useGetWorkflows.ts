import { useQuery } from '@tanstack/react-query';
import { IPageQueryParameters } from '../clients/github_client';
import { OWNER, REPOSITORY_NAME } from '../constants';
import useGithubClient from './useGithubClient';

function useGetWorkflows(options?: IPageQueryParameters) {
    const client = useGithubClient();

    const owner = OWNER;
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

export default useGetWorkflows;
