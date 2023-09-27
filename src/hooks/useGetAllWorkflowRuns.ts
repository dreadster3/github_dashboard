import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IWorkflowRunQueryParameters } from '../clients/github_client';
import { IRun } from '../models/Run';
import { IRuns } from '../models/Runs';
import useGithubClient from './useGithubClient';

function useGetAllWorkflowRuns(
    owner: string,
    repo: string,
    options?: IWorkflowRunQueryParameters,
) {
    const github_client = useGithubClient();
    const query_client = useQueryClient();

    const { data, isLoading, error } = useQuery(
        [
            owner,
            repo,
            'workflow_runs',
            { page: options?.page ?? 1, per_page: options?.per_page },
        ],
        () => {
            return github_client.get_all_workflow_runs_async(
                owner,
                repo,
                options,
            );
        },
        {
            placeholderData: () => {
                const cached_data: IRuns | undefined =
                    query_client.getQueryData([owner, repo, 'workflow_runs'], {
                        exact: false,
                    });

                const cached_workflow_runs: IRun[] =
                    cached_data?.workflow_runs ?? [];

                return {
                    total_count: cached_workflow_runs.length,
                    workflow_runs: cached_workflow_runs.slice(
                        0,
                        Math.min(
                            cached_workflow_runs.length,
                            options?.per_page ?? cached_workflow_runs.length,
                        ),
                    ),
                };
            },
        },
    );

    return { data, isLoading, error };
}

export default useGetAllWorkflowRuns;
