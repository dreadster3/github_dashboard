import { CardBody as MCardBody } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

interface ICardBodyProps {
    className?: string;
    children?: React.ReactNode;
}

const CardBody = React.forwardRef(
    (
        { className, children }: ICardBodyProps,
        ref: React.Ref<HTMLDivElement>,
    ) => (
        <MCardBody ref={ref} className={clsx(className, 'text-ctp-text')}>
            {children}
        </MCardBody>
    ),
);

CardBody.displayName = 'CoreCardBody';

export default CardBody;
