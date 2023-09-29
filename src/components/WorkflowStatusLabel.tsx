import { useMemo } from 'react';
import StatusLabel from '../components/StatusLabel';
import useGetWorkflowRuns from '../hooks/useGetWorkflowRuns';

interface IWorkflowStatusLabelProps {
    owner: string;
    repo: string;
    workflow_id: number;
}

function WorkflowStatusLabel({
    owner,
    repo,
    workflow_id,
}: IWorkflowStatusLabelProps) {
    const { data, isLoading } = useGetWorkflowRuns(owner, repo, workflow_id, {
        page: 1,
        per_page: 1,
    });

    const workflow_run = useMemo(() => {
        const workflows = data?.workflow_runs ?? [];
        return workflows.length > 0 ? workflows[0] : undefined;
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <StatusLabel
            status={workflow_run?.conclusion ?? workflow_run?.status}
        />
    );
}

export default WorkflowStatusLabel;
