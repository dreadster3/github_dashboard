import clsx from 'clsx';
import React from 'react';

interface ITableCellProps {
    children?: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}

const TableCell = React.forwardRef(
    (
        { children, className, align, ...props }: ITableCellProps,
        ref: React.Ref<HTMLTableCellElement>,
    ) => {
        return (
            <td
                ref={ref}
                className={clsx(`text-${align ?? 'left'}`, 'p-3', className)}
                {...props}
            >
                {children}
            </td>
        );
    },
);

TableCell.displayName = 'CoreTableCell';

export default TableCell;
