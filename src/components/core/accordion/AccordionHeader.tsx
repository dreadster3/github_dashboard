import { AccordionHeader as MAccordionHeader } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

interface IAccordionHeaderProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const AccordionHeader = React.forwardRef(
    (
        { children, className, ...props }: IAccordionHeaderProps,
        ref: React.Ref<HTMLButtonElement>,
    ) => {
        return (
            <MAccordionHeader ref={ref} className={clsx(className)} {...props}>
                {children}
            </MAccordionHeader>
        );
    },
);

AccordionHeader.displayName = 'CoreAccordionHeader';

export default AccordionHeader;
