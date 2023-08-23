import useGetWorkflowRuns from '../../hooks/useGetWorkflowRuns';
import useGetWorkflows from '../../hooks/useGetWorkflows';
import WorkflowTable from './WorkflowTable';

function Home() {
    // const { data, isLoading } = useGetWorkflows();
    // const { data: run } = useGetWorkflowRuns(data?.[0].id, {
    //     page: 1,
    //     per_page: 1,
    // });

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <WorkflowTable data={[]} />
        </div>
    );
}

export default Home;
