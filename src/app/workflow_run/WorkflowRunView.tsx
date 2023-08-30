import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SideNavButton } from '../../components/SideNav';
import StatusLabel from '../../components/StatusLabel';
import useGetJobs from '../../hooks/useGetJobs';
import { useSideBarNavigation } from '../../providers/SideBarNavigationProvider';

function WorkflowRunView() {
    const params = useParams();
    const workflow_id = parseInt(params.workflowId!);
    const run_id = parseInt(params.runId!);
    const { set_menu_items } = useSideBarNavigation();
    const { data, isLoading } = useGetJobs(run_id);

    useEffect(() => {
        set_menu_items(
            <>
                {data?.jobs.map((job) => (
                    <SideNavButton
                        key={job.id.toString()}
                        text={job.name}
                        to={`/workflows/${workflow_id}/runs/${job.run_id}`}
                        icon={
                            <StatusLabel
                                status={job.conclusion ?? job.status}
                            />
                        }
                    />
                ))}
            </>,
        );
    }, [set_menu_items, data, workflow_id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex w-full">
            <div className="flex flex-row">
                <div>Hello</div>
            </div>
        </div>
    );
}

export default WorkflowRunView;
