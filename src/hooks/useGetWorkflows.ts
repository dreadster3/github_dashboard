import { useQuery } from 'react-query';
import useGithubClient from './useGithubClient';
import { OWNER, REPOSITORY_NAME } from '../constants';

function useGetWorkflows() {
    const client = useGithubClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading } = useQuery(['workflows'], () =>
        client.get_workflows_async(owner, repo),
    );

    return { data, isLoading };
}

export default useGetWorkflows;
