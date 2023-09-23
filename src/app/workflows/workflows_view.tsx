'use client';

import LatestWorkflows from '@/components/LatestWorkflows';
import useGetWorkflows from '@/hooks/useGetWorkflows';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { useEffect, useMemo, useState } from 'react';
import WorkflowTable from './data_table/WorkflowTable';

interface IWorkflowTableProps {
    default_per_page?: number;
}

function WorkflowsView({ default_per_page }: IWorkflowTableProps) {
    const { set_menu_items } = useSideNavigation();
    const [current_page, set_current_page] = useState(1);
    const [per_page, set_per_page] = useState(default_per_page ?? 10);
    const { data, isLoading } = useGetWorkflows({
        page: current_page,
        per_page: per_page,
    });
    const total_pages = useMemo(
        () => Math.ceil((data?.total_count ?? 0) / per_page),
        [data, per_page],
    );

    useEffect(() => {
        set_menu_items(<LatestWorkflows />);
    }, [set_menu_items]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex w-full flex-row justify-center">
            <WorkflowTable
                data={data}
                setPerPage={set_per_page}
                perPage={per_page}
                totalPages={total_pages}
                currentPage={current_page}
                setCurrentPage={set_current_page}
            />
        </div>
    );
}

export default WorkflowsView;