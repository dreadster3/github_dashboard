import { useMemo } from 'react';
import useGetWorkflowRuns from '../../hooks/useGetWorkflowRuns';
import useGetWorkflows from '../../hooks/useGetWorkflows';
import WorkflowTable from './data_table/WorkflowTable';

function Home() {
    const { data, isLoading } = useGetWorkflows();
    const workflow_data = useMemo(() => data ?? [], [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center pt-32">
            <WorkflowTable data={workflow_data} />
        </div>
    );
}

export default Home;
