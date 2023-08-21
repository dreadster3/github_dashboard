import { useQuery } from 'react-query';
import useGithubClient from './useGithubClient';

function useGetWorkflows() {
    const client = useGithubClient();

    const env = import.meta.env;

    const owner = env.VITE_GITHUB_REPO_OWNER ?? '';
    const repo = env.VITE_GITHUB_REPO_NAME ?? '';

    const { data, isLoading } = useQuery('workflows', () =>
        client.get_workflows_async(owner, repo),
    );

    return { data, isLoading };
}

export default useGetWorkflows;
