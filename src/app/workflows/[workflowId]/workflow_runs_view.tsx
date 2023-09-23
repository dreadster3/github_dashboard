'use client';

import useGetWorkflowRuns from '@/hooks/useGetWorkflowRuns';
import { useEffect, useMemo, useState } from 'react';
import WorkflowRunsTable from './data_table/WorkflowRunsTable';

interface IWorkflowViewParams {
    workflowId: number;
}

interface IWorkflowViewProps {
    params: IWorkflowViewParams;
    default_per_page?: number;
}

function WorkflowRunsView({ params, default_per_page }: IWorkflowViewProps) {
    const [current_page, set_current_page] = useState(1);
    const [per_page, set_per_page] = useState(default_per_page ?? 10);
    const { data, isLoading, isFetching, prefetch_next_page } =
        useGetWorkflowRuns(params.workflowId, {
            page: current_page,
            per_page: per_page,
        });
    const total_pages = useMemo(
        () => Math.ceil((data?.total_count ?? 0) / per_page),
        [data, per_page],
    );

    useEffect(() => {
        prefetch_next_page();
    }, [current_page, per_page, prefetch_next_page]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex w-full flex-row justify-center">
            <WorkflowRunsTable
                isDataLoading={isLoading || isFetching}
                workflow_id={params.workflowId}
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

export default WorkflowRunsView;
