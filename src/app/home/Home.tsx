import { useMemo, useState } from 'react';
import useGetWorkflows from '../../hooks/useGetWorkflows';
import WorkflowTable from './data_table/WorkflowTable';

function Home() {
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
        <div className="flex flex-row justify-center w-full">
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

export default Home;
