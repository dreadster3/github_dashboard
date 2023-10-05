import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import useGithubClient from './useGithubClient';

function useGetRunLogs(owner: string, repo: string, run_id: number) {
    const client = useGithubClient();
    const { data: session } = useSession();

    const { data, isLoading } = useQuery(
        [owner, repo, 'runs', 'logs', run_id],
        () => client.get_workflow_run_log_async(owner, repo, run_id),
        {
            enabled: !!session && !!owner && !!repo && !!run_id,
        },
    );

    return { data, isLoading };
}

export default useGetRunLogs;
