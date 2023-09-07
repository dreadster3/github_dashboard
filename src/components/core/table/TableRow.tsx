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
            <tr ref={ref} className={className}>
                {children}
            </tr>
        );
    },
);

export default TableRow;
