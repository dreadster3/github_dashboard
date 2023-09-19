import { AccordionBody as MAccordionBody } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

interface IAccordionBodyProps {
    children?: React.ReactNode;
    className?: string;
}

const AccordionBody = React.forwardRef(
    (
        { children, className, ...props }: IAccordionBodyProps,
        ref: React.Ref<HTMLDivElement>,
    ) => {
        return (
            <MAccordionBody ref={ref} className={clsx(className)} {...props}>
                {children}
            </MAccordionBody>
        );
    },
);

AccordionBody.displayName = 'CoreAccordionBody';

export default AccordionBody;
