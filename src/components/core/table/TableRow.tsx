import MuiTableRow from '@mui/material/TableRow';
import React from 'react';

interface ITableRowProps {
    children?: React.ReactNode;
    className?: string;
}

const TableRow = React.forwardRef(
    (
        { children, className }: ITableRowProps,
        ref: React.Ref<HTMLTableRowElement>,
    ) => {
        return (
            <MuiTableRow ref={ref} className={className}>
                {children}
            </MuiTableRow>
        );
    },
);

export default TableRow;
