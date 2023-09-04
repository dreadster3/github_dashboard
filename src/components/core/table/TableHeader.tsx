import { TableHead } from '@mui/material';
import React from 'react';

interface ITableHeaderProps {
    children?: React.ReactNode;
    className?: string;
}

const TableHeader = React.forwardRef(
    (
        { children, ...props }: ITableHeaderProps,
        ref: React.Ref<HTMLTableSectionElement>,
    ) => {
        return (
            <TableHead className="bg-black" ref={ref} {...props}>
                {children}
            </TableHead>
        );
    },
);

export default TableHeader;
