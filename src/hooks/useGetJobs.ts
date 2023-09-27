import get_query_client from '@/utils/query_client';
import get_server_github_client from '@/utils/server_github_client';
import { useQuery } from '@tanstack/react-query';
import { IPageQueryParameters } from '../clients/github_client';
import useGithubClient from './useGithubClient';

function useGetJobs(
    owner: string,
    repo: string,
    run_id: number,
    options?: IPageQueryParameters,
) {
    const client = useGithubClient();

    const { data, isLoading } = useQuery(
        [
            owner,
            repo,
            'jobs',
            run_id,
            { per_page: options?.per_page, page: options?.page },
        ],
        () => client.get_workflow_run_jobs_async(owner, repo, run_id, options),
        {
            enabled: !!run_id,
        },
    );

    return { data, isLoading };
}

export const server_prefetch_workflow_run_jobs_async = async (
    owner: string,
    repo: string,
    run_id: number,
    options?: IPageQueryParameters,
) => {
    const github_client = await get_server_github_client();
    const query_client = get_query_client();

    await query_client.prefetchQuery(
        [
            owner,
            repo,
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
