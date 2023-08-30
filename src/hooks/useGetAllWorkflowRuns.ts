import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IWorkflowRunQueryParameters } from '../clients/github_client';
import { OWNER, REPOSITORY_NAME } from '../constants';
import { IRun } from '../models/Run';
import { IRuns } from '../models/Runs';
import useGithubClient from './useGithubClient';

function useGetAllWorkflowRuns(options?: IWorkflowRunQueryParameters) {
    const github_client = useGithubClient();
    const query_client = useQueryClient();

    const owner = OWNER;
    const repo = REPOSITORY_NAME;

    const { data, isLoading, error } = useQuery(
        ['workflow_runs'],
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
                    query_client.getQueryData(['workflow_runs'], {
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
