import clsx from 'clsx';
import React from 'react';

interface ITableContainerProps {
    children?: React.ReactNode;
    className?: string;
}

const Table = React.forwardRef(
    (
        { children, className }: ITableContainerProps,
        ref: React.Ref<HTMLTableElement>,
    ) => {
        return (
            <table ref={ref} className={clsx('w-full min-w-max', className)}>
                {children}
            </table>
        );
    },
);

export default Table;
