import { useQuery } from 'react-query';
import useGithubClient from './useGithubClient';
import { OWNER, REPOSITORY_NAME } from '../constants';
import { IPageQueryParameters } from '../clients/github_client';

function useGetWorkflows(options?: IPageQueryParameters) {
    const client = useGithubClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading } = useQuery(['workflows'], () =>
        client.get_workflows_async(owner, repo, options),
    );

    return { data, isLoading };
}

export default useGetWorkflows;
