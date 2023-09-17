'use client';

import useGetWorkflows from '@/hooks/useGetWorkflows';
import { useMemo, useState } from 'react';

function Workflows() {
    const [current_page, set_current_page] = useState(1);
    const [per_page, set_per_page] = useState(10);
    const { data, isLoading } = useGetWorkflows({
        page: current_page,
        per_page: per_page,
    });
    const total_pages = useMemo(
        () => Math.ceil((data?.total_count ?? 0) / per_page),
        [data, per_page],
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex w-full flex-row justify-center">
            {data?.workflows.map((workflow) => (
                <div key={workflow.id}>{workflow.name}</div>
            ))}
            {/* <WorkflowTable */}
            {/*     data={data} */}
            {/*     setPerPage={set_per_page} */}
            {/*     perPage={per_page} */}
            {/*     totalPages={total_pages} */}
            {/*     currentPage={current_page} */}
            {/*     setCurrentPage={set_current_page} */}
            {/* /> */}
        </div>
    );
}

export default Workflows;
