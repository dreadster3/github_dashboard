import { Card as MCard } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

interface ICardProps {
    children: React.ReactNode;
    className?: string;
}

const Card = React.forwardRef(
    ({ children, className }: ICardProps, ref: React.Ref<HTMLDivElement>) => {
        return (
            <MCard
                ref={ref}
                className={clsx(
                    'bg-ctp-base shadow-sm shadow-ctp-surface1',
                    className,
                )}
            >
                {children}
            </MCard>
        );
    },
);

Card.displayName = 'CoreCard';

export default Card;
