'use client';

import JSZip from 'jszip';
import { useEffect, useMemo, useState } from 'react';
import LogGroup from './LogGroup';

interface IStepLogProps {
    job_name: string;
    step_name: string;
    step_number: number;
    file: JSZip | undefined;
    show_timestamps: boolean;
}

const logs_to_object = (logs: string) => {
    let current_group = '';
    const lines = logs.split('\n');
    const object: any = {};
    for (const line of lines) {
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

function StepLog({
    file,
    step_name,
    step_number,
    job_name,
    show_timestamps,
}: IStepLogProps) {
    const [log, set_log] = useState<string>('');
    const object_logs = useMemo(() => logs_to_object(log), [log]);

    useEffect(() => {
        if (file) {
            file
                .file(`${job_name}/${step_number}_${step_name}.txt`)
                ?.async('string')
                .then((content) => {
                    set_log(content);
                });
        }
    }, [file]);

    return (
        <div>
            {log !== '' ? (
                Object.keys(object_logs).map((key, index) => {
                    const line = key.replace(
                        show_timestamps
                            ? ''
                            : /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/,
                        '',
                    );
                    const hidden_lines = logs_to_object(log)[key];

                    if (hidden_lines.length > 0) {
                        return (
                            <LogGroup
                                key={index}
                                line={line}
                                hidden_lines={hidden_lines.map((line: string) =>
                                    line.replace(
                                        show_timestamps
                                            ? ''
                                            : /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/,
                                        '',
                                    ),
                                )}
                            />
                        );
                    } else {
                        return (
                            <p className="whitespace-pre-wrap" key={index}>
                                {line}
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
