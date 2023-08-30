import { useQuery } from '@tanstack/react-query';
import { IPageQueryParameters } from '../clients/github_client';
import { OWNER, REPOSITORY_NAME } from '../constants';
import useGithubClient from './useGithubClient';

function useGetJobs(run_id: number, options?: IPageQueryParameters) {
    const client = useGithubClient();

    const owner = OWNER;
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

export default useGetJobs;
