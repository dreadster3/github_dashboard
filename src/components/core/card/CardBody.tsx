import { CardBody as MCardBody } from '@material-tailwind/react';
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
        <MCardBody ref={ref} className={className}>
            {children}
        </MCardBody>
    ),
);

CardBody.displayName = 'CoreCardBody';

export default CardBody;
