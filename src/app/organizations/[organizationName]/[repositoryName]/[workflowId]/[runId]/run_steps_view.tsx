'use client';

import { SideNavButton } from '@/components/SideNav';
import StatusLabel from '@/components/StatusLabel';
import Title from '@/components/Title';
import Accordion from '@/components/core/accordion/Accordion';
import AccordionBody from '@/components/core/accordion/AccordionBody';
import AccordionHeader from '@/components/core/accordion/AccordionHeader';
import useGetRunLogs from '@/hooks/useGetJobLog';
import useGetJobs from '@/hooks/useGetJobs';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import JSZip from 'jszip';
import { useEffect, useState } from 'react';

interface IWorkflowRunViewParams {
    organizationName: string;
    repositoryName: string;
    workflowId: number;
    runId: number;
}

interface IWorkflowRunViewProps {
    params: IWorkflowRunViewParams;
}

function RunStepsView({ params }: IWorkflowRunViewProps) {
    const zip = new JSZip();
    const { set_menu_items } = useSideNavigation();
    const { data: jobs, isLoading } = useGetJobs(
        params.organizationName,
        params.repositoryName,
        params.runId,
    );
    const [active_job, set_active_job] = useState<number>(0);
    const [open, set_open] = useState(0);
    const { data: logs } = useGetRunLogs(
        params.organizationName,
        params.repositoryName,
        params.runId,
    );

    // const get_logs_between_time = (start_time: string, end_time: string) => {
    zip.loadAsync(logs ?? '').then((unzipped) => {
        console.log(
            unzipped
                .file('render/2_Hello World.txt')
                ?.async('string')
                .then((data) => {
                    console.log(data);
                }),
        );
    });

    // console.log(logs);

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
        <div className="w-full">
            <Title>Run Steps</Title>
            <div className="flex flex-col h-full w-full">
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
