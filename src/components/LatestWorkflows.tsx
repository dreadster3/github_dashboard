import { useMemo } from 'react';
import WorkflowStatusLabel from '../app/home/data_table/WorkflowStatusLabel';
import useGetAllWorkflowRuns from '../hooks/useGetAllWorkflowRuns';
import { IRun } from '../models/Run';
import { SideNavButton } from './SideNav';

function LatestWorkflows() {
    const { data } = useGetAllWorkflowRuns({
        page: 1,
        per_page: 10,
    });

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
                            to={`/workflows/${workflow_run.workflow_id}/runs`}
                            icon={
                                <WorkflowStatusLabel
                                    workflow_id={workflow_run.workflow_id}
                                />
                            }
                        />
                    ))}
        </>
    );
}

export default LatestWorkflows;