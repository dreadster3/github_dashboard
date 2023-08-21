import { useQuery } from 'react-query';
import useGithubClient from './useGithubClient';
import { DATA_STALE_TIME, OWNER, REPOSITORY_NAME } from '../constants';

function useGetWorkflows() {
    const client = useGithubClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading } = useQuery(
        'workflows',
        () => client.get_workflows_async(owner, repo),
        {
            staleTime: DATA_STALE_TIME,
            keepPreviousData: true,
        },
    );

    return { data, isLoading };
}

export default useGetWorkflows;
