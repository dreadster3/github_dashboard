import MuiTableCell from '@mui/material/TableCell';
import clsx from 'clsx';
import React from 'react';

interface ITableCellProps {
    children?: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}

const TableCell = React.forwardRef(
    (
        { children, className, ...props }: ITableCellProps,
        ref: React.Ref<HTMLTableCellElement>,
    ) => {
        return (
            <MuiTableCell
                ref={ref}
                className={clsx('text-center', className)}
                align={props.align ?? 'left'}
                {...props}
            >
                {children}
            </MuiTableCell>
        );
    },
);

export default TableCell;
