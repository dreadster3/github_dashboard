'use client';

import { SideNavButton } from '@/components/SideNav';
import StatusLabel from '@/components/StatusLabel';
import Title from '@/components/Title';
import Checkbox from '@/components/core/Checkbox';
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
import StepLog from './StepLog';

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
    const [show_timestamps, set_show_timestamps] = useState<boolean>(false);
    const [open, set_open] = useState(0);
    const [unzipped_file, set_unzipped_file] = useState<JSZip | undefined>(
        undefined,
    );
    const { data: logs } = useGetRunLogs(
        params.organizationName,
        params.repositoryName,
        params.runId,
    );

    useEffect(() => {
        if (logs) {
            zip.loadAsync(logs).then((unzipped) => {
                set_unzipped_file(unzipped);
            });
        }
    }, [logs]);

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
            <div className="flex flex-row justify-between items-center">
                <Title>Run Steps</Title>
                <div className="flex flex-row items-center">
                    <Checkbox
                        checked={show_timestamps}
                        onChange={(evt) =>
                            set_show_timestamps(evt.target.checked)
                        }
                    />
                    <label className="text-ctp-text">Show timestamps</label>
                </div>
            </div>
            <div className="flex flex-col w-full h-full">
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
                                className="px-10 rounded border-none bg-ctp-surface0 text-ctp-text hover:text-ctp-blue"
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
                            <AccordionBody className="p-5 rounded bg-ctp-surface1 text-ctp-text">
                                <StepLog
                                    step_number={step.number}
                                    step_name={step.name}
                                    job_name={jobs.jobs[active_job].name}
                                    file={unzipped_file}
                                    show_timestamps={show_timestamps}
                                />
                            </AccordionBody>
                        </Accordion>
                    ))}
            </div>
        </div>
    );
}

export default RunStepsView;
