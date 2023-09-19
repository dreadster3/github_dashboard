import { CardFooter as MCardFooter } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

interface ICardFooterProps {
    className?: string;
    children?: React.ReactNode;
}

const CardFooter = React.forwardRef(
    (
        { className, children }: ICardFooterProps,
        ref: React.Ref<HTMLDivElement>,
    ) => (
        <MCardFooter ref={ref} className={clsx('bg-ctp-surface1', className)}>
            {children}
        </MCardFooter>
    ),
);

CardFooter.displayName = 'CoreCardFooter';

export default CardFooter;
