import { IReviewDeployment } from '@/models/Deployment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGithubClient from './useGithubClient';

function useReviewPendingDeployment(
    owner: string,
    repo: string,
    run_id: number,
) {
    const client = useGithubClient();
    const query_client = useQueryClient();
    const { mutate } = useMutation(
        (data: IReviewDeployment) =>
            client.review_pending_deployments_workflow_run_async(
                owner,
                repo,
                run_id,
                data,
            ),
        {
            onSuccess: () => {
                query_client.invalidateQueries([
                    owner,
                    repo,
                    'pending_deployments',
                    run_id,
                ]);
                query_client.invalidateQueries([owner, repo, 'jobs', run_id]);
            },
        },
    );

    return { mutate };
}

export default useReviewPendingDeployment;
