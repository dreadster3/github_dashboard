import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import useGithubClient from './useGithubClient';

function useGetJobLogs(
    owner: string,
    repo: string,
    job_id: number | undefined,
) {
    const client = useGithubClient();
    const { data: session } = useSession();

    const { data } = useQuery(
        [owner, repo, 'jobs', 'logs', job_id],
        () => client.get_job_log_async(owner, repo, job_id!),
        {
            enabled: !!session && !!owner && !!repo && !!job_id,
        },
    );

    return { data };
}

export default useGetJobLogs;
