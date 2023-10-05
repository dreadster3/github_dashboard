import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import useGithubClient from './useGithubClient';

function useGetPendingDeployments(owner: string, repo: string, run_id: number) {
    const client = useGithubClient();
    const { data: session } = useSession();

    const { data } = useQuery(
        [owner, repo, 'pending_deployments', run_id],
        () =>
            client.get_pending_deployments_workflow_run_async(
                owner,
                repo,
                run_id,
            ),
        {
            enabled: !!session && !!owner && !!repo && !!run_id,
        },
    );

    return { data };
}

export default useGetPendingDeployments;
