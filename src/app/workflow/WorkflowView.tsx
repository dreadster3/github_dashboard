import { useParams } from 'react-router-dom';

function WorkflowView() {
    const params = useParams();
    const id = params.id;

    return <div>{id}</div>;
}

export default WorkflowView;
