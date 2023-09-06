import clsx from 'clsx';
import React from 'react';

interface ITableHeaderProps {
    children?: React.ReactNode;
    className?: string;
}

const TableHeader = React.forwardRef(
    (
        { children, className, ...props }: ITableHeaderProps,
        ref: React.Ref<HTMLTableSectionElement>,
    ) => {
        return (
            <thead ref={ref} className={clsx(className)} {...props}>
                {children}
            </thead>
        );
    },
);

export default TableHeader;
