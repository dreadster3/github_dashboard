import { useParams } from 'react-router-dom';
import useGetJobs from '../../hooks/useGetJobs';

function WorkflowRunView() {
    const params = useParams();
    const run_id = parseInt(params.runId!);
    const { data, isLoading } = useGetJobs(run_id);

    console.log(data);

    return (
        <div className="flex w-full">
            <div className="flex flex-row">
                <div>Hello</div>
            </div>
        </div>
    );
}

export default WorkflowRunView;
