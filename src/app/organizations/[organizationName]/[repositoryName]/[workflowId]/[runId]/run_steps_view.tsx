'use client';

import { SideNavButton } from '@/components/SideNav';
import StatusLabel from '@/components/StatusLabel';
import Title from '@/components/Title';
import Button from '@/components/core/Button';
import Checkbox from '@/components/core/Checkbox';
import Accordion from '@/components/core/accordion/Accordion';
import AccordionBody from '@/components/core/accordion/AccordionBody';
import AccordionHeader from '@/components/core/accordion/AccordionHeader';
import useGetJobLogs from '@/hooks/useGetJobLogs';
import useGetJobs from '@/hooks/useGetJobs';
import useGetPendingDeployments from '@/hooks/useGetPendingDeployments';
import useReviewPendingDeployment from '@/hooks/useReviewPendingDeployment';
import { EConclusion, EStatus } from '@/models/Status';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
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
    const { set_menu_items } = useSideNavigation();
    const { data: jobs, isLoading } = useGetJobs(
        params.organizationName,
        params.repositoryName,
        params.runId,
    );
    const [active_job, set_active_job] = useState<number>(0);
    const [show_timestamps, set_show_timestamps] = useState<boolean>(false);
    const [open, set_open] = useState(0);
    const { data: logs } = useGetJobLogs(
        params.organizationName,
        params.repositoryName,
        jobs?.jobs[active_job].id,
    );
    const { data: pending_deployments } = useGetPendingDeployments(
        params.organizationName,
        params.repositoryName,
        params.runId,
    );

    const { mutate: review } = useReviewPendingDeployment(
        params.organizationName,
        params.repositoryName,
        params.runId,
    );

    const logs_to_array = (logs: string) => {
        const lines = logs.split('\n').slice(5);
        const log_object: string[][] = [[]];
        let current_step = 0;

        lines.forEach((line) => {
            if (line === '') return;

            while (
                jobs?.jobs[active_job].steps[current_step].conclusion ===
                EConclusion.SKIPPED
            ) {
                log_object[current_step] = ['Job Skipped'];
                current_step++;
                log_object[current_step] = [];
            }

            if (line.match(/\#\#\[group\]Run /) || line.match(/Cleaning/)) {
                current_step++;
                log_object[current_step] = [];
            }

            if (line.match(/##\[error\]Process/)) {
                log_object[current_step] =
                    log_object[current_step].concat(line) ?? '';

                current_step++;
                log_object[current_step] = [];

                return;
            }

            log_object[current_step] =
                log_object[current_step].concat(line) ?? '';
        });

        return log_object;
    };

    const step_logs = useMemo(() => logs_to_array(logs ?? ''), [logs]);

    useEffect(() => {
        set_menu_items(
            <>
                {jobs?.jobs.map((job, index) => {
                    const new_index = index;

                    return (
                        <SideNavButton
                            className={
                                new_index === active_job
                                    ? 'bg-ctp-blue !text-ctp-base'
                                    : ''
                            }
                            onClick={() => set_active_job(new_index)}
                            key={job.id.toString()}
                            text={job.name}
                            prefix_icon={
                                <StatusLabel
                                    className={
                                        new_index === active_job
                                            ? 'border border-black'
                                            : ''
                                    }
                                    status={job.conclusion ?? job.status}
                                />
                            }
                        />
                    );
                })}
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
                    jobs.jobs[active_job] &&
                    jobs.jobs[active_job].status === EStatus.WAITING && (
                        <div className="flex justify-center items-center w-full h-full gap-10">
                            <Button
                                onClick={() =>
                                    review({
                                        environment_id:
                                            pending_deployments![0].environment
                                                .id,
                                        state: 'approved',
                                    })
                                }
                                disabled={
                                    !pending_deployments![0]
                                        .current_user_can_approve
                                }
                            >
                                Approve Job
                            </Button>
                            <Button
                                onClick={() =>
                                    review({
                                        environment_id:
                                            pending_deployments![0].environment
                                                .id,
                                        state: 'rejected',
                                    })
                                }
                                disabled={
                                    !pending_deployments![0]
                                        .current_user_can_approve
                                }
                                color="red"
                            >
                                Reject Job
                            </Button>
                        </div>
                    )}
                {jobs &&
                    jobs?.jobs?.[active_job] &&
                    jobs.jobs[active_job].steps.map((step, index) => (
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
                                    show_timestamps={show_timestamps}
                                    step_logs={step_logs[index] ?? []}
                                />
                            </AccordionBody>
                        </Accordion>
                    ))}
            </div>
        </div>
    );
}

export default RunStepsView;
