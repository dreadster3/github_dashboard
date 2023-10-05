'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import LogGroup from './LogGroup';

interface IStepLogProps {
    step_logs: string[];
    show_timestamps: boolean;
}

const logs_to_object = (logs: string[]) => {
    let current_group = '';
    const object: any = {};
    for (const line of logs) {
        const sanitized_line = line.replace(
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            '',
        );

        const no_timestamp = sanitized_line
            .replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/, '')
            .trim();
        if (no_timestamp.startsWith('##[group]')) {
            const group_name = sanitized_line.replace('##[group]', '');
            current_group = group_name;
            object[current_group] = [];
        } else if (no_timestamp.startsWith('##[endgroup]')) {
            current_group = '';
        } else {
            if (current_group) {
                object[current_group].push(sanitized_line);
            } else {
                object[sanitized_line] = [];
            }
        }
    }
    return object;
};

function StepLog({ step_logs, show_timestamps }: IStepLogProps) {
    const object_logs = useMemo(
        () => logs_to_object(step_logs.slice()),
        [step_logs],
    );

    return (
        <div>
            {step_logs.length !== 0 ? (
                Object.keys(object_logs).map((key, index) => {
                    const line = key.replace(
                        show_timestamps
                            ? ''
                            : /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s/,
                        '',
                    );
                    const hidden_lines = object_logs[key];

                    if (hidden_lines.length > 0) {
                        return (
                            <LogGroup
                                key={index}
                                line={line}
                                hidden_lines={hidden_lines.map((line: string) =>
                                    line.replace(
                                        show_timestamps
                                            ? ''
                                            : /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s/,
                                        '',
                                    ),
                                )}
                            />
                        );
                    } else {
                        return (
                            <p
                                className={clsx(
                                    line.match(/\#\#\[warning\]/) &&
                                        'text-ctp-peach',
                                    line.match(/\#\#\[error\]/) &&
                                        'text-ctp-red',
                                    line.match(/\[command\]/) &&
                                        'text-ctp-blue',
                                    'whitespace-pre-wrap',
                                )}
                                key={index}
                            >
                                {line
                                    .replace('##[warning]', '')
                                    .replace('##[error]', '')
                                    .replace('[command]', '')}
                            </p>
                        );
                    }
                })
            ) : (
                <p>No logs available</p>
            )}
        </div>
    );
}

export default StepLog;
