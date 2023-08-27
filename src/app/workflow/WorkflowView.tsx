import { useParams } from 'react-router-dom';
import useGetWorkflowRuns from '../../hooks/useGetWorkflowRuns';
import { useMemo, useState } from 'react';
import WorkflowRunsTable from './data_table/WorkflowRunsTable';

function WorkflowView() {
    const [current_page, set_current_page] = useState(1);
    const params = useParams();
    const workflow_id = parseInt(params.id!);
    const { data, isLoading } = useGetWorkflowRuns(workflow_id, {
        page: current_page,
        per_page: 10,
    });
    const table_data = useMemo(() => data?.workflow_runs ?? [], [data]);
    const total_pages = useMemo(
        () => Math.ceil((data?.total_count ?? 0) / 10),
        [data],
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center pt-32">
            <WorkflowRunsTable
                data={table_data}
                currentPage={current_page}
                setCurrentPage={set_current_page}
                totalPages={total_pages}
            />
        </div>
    );
}

export default WorkflowView;
