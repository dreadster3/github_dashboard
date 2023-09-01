import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion, {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../../components/Accordion';
import Loading from '../../components/Loading';
import { SideNavButton } from '../../components/SideNav';
import StatusLabel from '../../components/StatusLabel';
import useGetJobs from '../../hooks/useGetJobs';
import { useSideBarNavigation } from '../../providers/SideBarNavigationProvider';

function WorkflowRunView() {
    const params = useParams();
    const workflow_id = parseInt(params.workflowId!);
    const run_id = parseInt(params.runId!);
    const { set_menu_items } = useSideBarNavigation();
    const { data: jobs, isLoading } = useGetJobs(run_id);
    const [active_job, set_active_job] = useState<number>(0);

    useEffect(() => {
        set_menu_items(
            <>
                {jobs?.jobs.map((job, index) => (
                    <SideNavButton
                        className={
                            index === active_job
                                ? 'bg-blue-200 dark:bg-blue-900'
                                : ''
                        }
                        onClick={() => set_active_job(index)}
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
    }, [set_menu_items, jobs, workflow_id, active_job]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex justify-center w-full h-full">
            <div className="w-2/3">
                <Accordion>
                    {jobs &&
                        jobs?.jobs?.[active_job] &&
                        jobs.jobs[active_job].steps.map((step) => (
                            <AccordionItem key={step.number} value={step.name}>
                                <AccordionTrigger className="bg-black">
                                    <StatusLabel
                                        status={step.conclusion ?? step.status}
                                    />
                                    {step.name}
                                </AccordionTrigger>
                                <AccordionContent>Logs</AccordionContent>
                            </AccordionItem>
                        ))}
                </Accordion>
            </div>
        </div>
    );
}

export default WorkflowRunView;
