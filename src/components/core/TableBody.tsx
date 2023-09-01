import MuiTableBody from '@mui/material/TableBody';
import React from 'react';

interface ITableBodyProps {
    children?: React.ReactNode;
}

const TableBody = React.forwardRef(
    (
        { children, ...props }: ITableBodyProps,
        ref: React.ForwardedRef<HTMLTableSectionElement>,
    ) => {
        return (
            <MuiTableBody ref={ref} {...props}>
                {children}
            </MuiTableBody>
        );
    },
);

export default TableBody;
