import Accordion from '@/components/core/accordion/Accordion';
import AccordionBody from '@/components/core/accordion/AccordionBody';
import AccordionHeader from '@/components/core/accordion/AccordionHeader';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

interface ILogGroupProps {
    line: string;
    hidden_lines: string[];
}

function LogGroup({ line, hidden_lines }: ILogGroupProps) {
    const [open, set_open] = useState<boolean>(false);

    return (
        <Accordion
            icon={
                <ChevronDownIcon
                    className={clsx(
                        'w-4 h-4 text-ctp-blue transition-transform',
                        open && 'rotate-180',
                    )}
                />
            }
            open={open}
        >
            <AccordionHeader
                onClick={() => set_open(!open)}
                className="p-0 text-sm font-normal whitespace-pre-wrap border-0 text-ctp-text"
            >
                {line}
            </AccordionHeader>
            <AccordionBody className="p-0 whitespace-pre-wrap text-ctp-text">
                {hidden_lines.map((line, index) => {
                    return <p key={index}>{line}</p>;
                })}
            </AccordionBody>
        </Accordion>
    );
}

export default LogGroup;
