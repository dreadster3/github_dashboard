import { useParams } from 'react-router-dom';

function WorkflowRunView() {
    const params = useParams();
    const workflow_id = parseInt(params.workflowId!);
    const run_id = parseInt(params.runId!);

    console.log(workflow_id, run_id);

    return <div></div>;
}

export default WorkflowRunView;
