'use client';

import { SideNavButton } from '@/components/SideNav';
import StatusLabel from '@/components/StatusLabel';
import Accordion from '@/components/core/accordion/Accordion';
import AccordionBody from '@/components/core/accordion/AccordionBody';
import AccordionHeader from '@/components/core/accordion/AccordionHeader';
import useGetJobs from '@/hooks/useGetJobs';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface IWorkflowRunViewParams {
    workflowId: number;
    runId: number;
}

interface IWorkflowRunViewProps {
    params: IWorkflowRunViewParams;
}

function RunStepsView({ params }: IWorkflowRunViewProps) {
    const { set_menu_items } = useSideNavigation();
    const { data: jobs, isLoading } = useGetJobs(params.runId);
    const [active_job, set_active_job] = useState<number>(0);
    const [open, set_open] = useState(0);

    useEffect(() => {
        set_menu_items(
            <>
                {jobs?.jobs.map((job, index) => (
                    <SideNavButton
                        className={
                            index === active_job
                                ? 'bg-ctp-blue !text-ctp-base'
                                : ''
                        }
                        onClick={() => set_active_job(index)}
                        key={job.id.toString()}
                        text={job.name}
                        to={`/workflows/${params.workflowId}/runs/${job.run_id}`}
                        prefix_icon={
                            <StatusLabel
                                className={
                                    index === active_job
                                        ? 'border border-black'
                                        : ''
                                }
                                status={job.conclusion ?? job.status}
                            />
                        }
                    />
                ))}
            </>,
        );
    }, [set_menu_items, jobs, params.workflowId, active_job]);

    if (isLoading) {
        return 'Loading...';
    }

    return (
        <div className="flex h-full w-full justify-center">
            <div className="w-2/3">
                {jobs &&
                    jobs?.jobs?.[active_job] &&
                    jobs.jobs[active_job].steps.map((step) => (
                        <Accordion
                            key={`${jobs.jobs[active_job].id}-${step.number}`}
                            icon={
                                <ChevronDownIcon
                                    className={clsx(
                                        'h-4 w-4 text-ctp-blue transition-transform',
                                        open === step.number && 'rotate-180',
                                    )}
                                />
                            }
                            open={open === step.number}
                        >
                            <AccordionHeader
                                className="rounded border-none bg-ctp-surface0 px-10 text-ctp-text hover:text-ctp-blue"
                                onClick={() => {
                                    if (open === step.number) {
                                        set_open(0);
                                    } else {
                                        set_open(step.number);
                                    }
                                }}
                            >
                                <StatusLabel
                                    status={step.conclusion ?? step.status}
                                />
                                {step.name}
                            </AccordionHeader>
                            <AccordionBody className="rounded bg-ctp-surface1 p-5 text-ctp-text">
                                Logs
                            </AccordionBody>
                        </Accordion>
                    ))}
            </div>
        </div>
    );
}

export default RunStepsView;
