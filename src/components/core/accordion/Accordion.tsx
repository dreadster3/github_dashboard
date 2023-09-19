import { Accordion as MAccordion } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

interface IAccordionProps {
    children?: React.ReactNode;
    className?: string;
    open: boolean;
    icon?: React.ReactNode;
}

const Accordion = React.forwardRef(
    (
        { children, className, ...props }: IAccordionProps,
        ref: React.Ref<HTMLDivElement>,
    ) => {
        return (
            <MAccordion ref={ref} className={clsx(className)} {...props}>
                {children}
            </MAccordion>
        );
    },
);

Accordion.displayName = 'CoreAccordion';

export default Accordion;
