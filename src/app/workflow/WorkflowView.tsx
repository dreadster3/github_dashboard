import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import LatestWorkflows from '../../components/LatestWorkflows';
import useGetWorkflowRuns from '../../hooks/useGetWorkflowRuns';
import { useSideBarNavigation } from '../../providers/SideBarNavigationProvider';
import WorkflowRunsTable from './data_table/WorkflowRunsTable';

function WorkflowView() {
    const { set_menu_items } = useSideBarNavigation();
    const [current_page, set_current_page] = useState(1);
    const [per_page, set_per_page] = useState(10);
    const params = useParams();
    const workflow_id = parseInt(params.workflowId!);
    const { data, isLoading, isFetching, prefetchNextPage } =
        useGetWorkflowRuns(workflow_id, {
            page: current_page,
            per_page: per_page,
        });
    const total_pages = useMemo(
        () => Math.ceil((data?.total_count ?? 0) / per_page),
        [data, per_page],
    );

    useEffect(() => {
        prefetchNextPage();
    }, [current_page, per_page, prefetchNextPage]);

    useEffect(() => {
        set_menu_items(<LatestWorkflows />);
    }, [set_menu_items]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-row justify-center w-full">
            <WorkflowRunsTable
                isDataLoading={isLoading || isFetching}
                workflow_id={workflow_id}
                data={data}
                perPage={per_page}
                setPerPage={set_per_page}
                currentPage={current_page}
                setCurrentPage={set_current_page}
                totalPages={total_pages}
            />
        </div>
    );
}

export default WorkflowView;
