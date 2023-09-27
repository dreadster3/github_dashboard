'use client';

import useGetAllWorkflowRuns from '@/hooks/useGetAllWorkflowRuns';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { IRun } from '../models/Run';
import { SideNavButton } from './SideNav';
import WorkflowStatusLabel from './WorkflowStatusLabel';

function LatestWorkflows() {
    const { organizationName, repositoryName } = useParams();

    console.log(organizationName, repositoryName);

    const { data } = useGetAllWorkflowRuns(
        organizationName as string,
        repositoryName as string,
        {
            page: 1,
            per_page: 10,
        },
    );

    const unique_workflows = useMemo(
        () =>
            data?.workflow_runs.reduce((acc, workflow_run) => {
                if (
                    acc.find(
                        (run) => run.workflow_id === workflow_run.workflow_id,
                    ) === undefined
                ) {
                    acc.push(workflow_run);
                }

                return acc;
            }, [] as IRun[]),
        [data],
    );

    return (
        <>
            {unique_workflows &&
                unique_workflows
                    .slice(0, 5)
                    .map((workflow_run) => (
                        <SideNavButton
                            key={workflow_run.id.toString()}
                            text={workflow_run.name}
                            to={`/organizations/${organizationName}/${repositoryName}/${workflow_run.workflow_id}`}
                            prefix_icon={
                                <WorkflowStatusLabel
                                    owner={organizationName as string}
                                    repo={repositoryName as string}
                                    workflow_id={workflow_run.workflow_id}
                                />
                            }
                        />
                    ))}
        </>
    );
}

export default LatestWorkflows;
