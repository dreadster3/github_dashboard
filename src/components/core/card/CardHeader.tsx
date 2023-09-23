import { CardHeader as MCardHeader } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

interface ICardHeaderProps {
    className?: string;
    children?: React.ReactNode;
}

const CardHeader = React.forwardRef(
    (
        { className, children }: ICardHeaderProps,
        ref: React.Ref<HTMLDivElement>,
    ) => (
        <MCardHeader
            ref={ref}
            floated={false}
            shadow={false}
            className={clsx(
                'bg-ctp-surface1 h-full w-full m-0 rounded-none',
                className,
            )}
        >
            {children}
        </MCardHeader>
    ),
);

CardHeader.displayName = 'CoreCardHeader';

export default CardHeader;
