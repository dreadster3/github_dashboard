import { Paper } from '@mui/material';
import MuiTable from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';

interface ITableContainerProps {
    children?: React.ReactNode;
    className?: string;
}

const Table = React.forwardRef(
    (
        { children, ...props }: ITableContainerProps,
        ref: React.Ref<HTMLTableElement>,
    ) => {
        return (
            <TableContainer component={Paper} {...props}>
                <MuiTable ref={ref}>{children}</MuiTable>
            </TableContainer>
        );
    },
);

export default Table;
