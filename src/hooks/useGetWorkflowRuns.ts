import { useQuery } from 'react-query';
import useGithubClient from './useGithubClient';
import { DATA_STALE_TIME, OWNER, REPOSITORY_NAME } from '../constants';
import { IWorkflowRunQueryParameters } from '../clients/github_client';

function useGetWorkflowRuns(
    workflow_id: number,
    options?: IWorkflowRunQueryParameters,
) {
    const githubClient = useGithubClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading } = useQuery(
        ['workflow_runs', workflow_id],
        async () =>
            githubClient.get_workflow_runs_async(
                owner,
                repo,
                workflow_id,
                options,
            ),
        {
            cacheTime: 1000 * 60 * 2,
            staleTime: DATA_STALE_TIME,
            refetchOnWindowFocus: true,
            refetchInterval: DATA_STALE_TIME,
            enabled: !!workflow_id,
        },
    );

    return { data, isLoading };
}

export default useGetWorkflowRuns;
