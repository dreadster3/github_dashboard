import get_query_client from '@/utils/query_client';
import get_server_github_client from '@/utils/server_github_client';
import { useQuery } from '@tanstack/react-query';
import { IPageQueryParameters } from '../clients/github_client';
import { REPOSITORY_NAME, REPOSITORY_OWNER } from '../constants';
import useGithubClient from './useGithubClient';

function useGetJobs(run_id: number, options?: IPageQueryParameters) {
    const client = useGithubClient();

    const owner = REPOSITORY_OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading } = useQuery(
        ['jobs', run_id, { per_page: options?.per_page, page: options?.page }],
        () => client.get_workflow_run_jobs_async(owner, repo, run_id, options),
        {
            enabled: !!run_id,
        },
    );

    return { data, isLoading };
}

export const server_prefetch_workflow_run_jobs_async = async (
    run_id: number,
    options?: IPageQueryParameters,
) => {
    const github_client = await get_server_github_client();
    const query_client = get_query_client();
    const owner = REPOSITORY_OWNER;
    const repo = REPOSITORY_NAME;

    await query_client.prefetchQuery(
        [
            'jobs',
            run_id,
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () =>
            github_client.get_workflow_run_jobs_async(
                owner,
                repo,
                run_id,
                options,
            ),
    );

    return query_client;
};

export default useGetJobs;
