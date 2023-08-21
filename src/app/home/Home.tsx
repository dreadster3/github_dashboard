import useGetWorkflowRuns from '../../hooks/useGetWorkflowRuns';
import useGetWorkflows from '../../hooks/useGetWorkflows';
import { IWorkflow } from '../../models/Workflow';

function Home() {
    const { data } = useGetWorkflows();
    const { data: run } = useGetWorkflowRuns(data?.[0].id, {
        page: 1,
        per_page: 1,
    });

    console.log(run);

    return (
        <div>
            {data?.map((workflow: IWorkflow) => (
                <div key={workflow.id}>
                    <h1>{workflow.name}</h1>
                    <p>{workflow.state}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
