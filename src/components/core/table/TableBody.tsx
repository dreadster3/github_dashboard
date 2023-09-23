import React from 'react';

interface ITableBodyProps {
    children?: React.ReactNode;
    className?: string;
}

const TableBody = React.forwardRef(
    (
        { children, ...props }: ITableBodyProps,
        ref: React.ForwardedRef<HTMLTableSectionElement>,
    ) => {
        return (
            <tbody ref={ref} {...props}>
                {children}
            </tbody>
        );
    },
);

TableBody.displayName = 'CoreTableBody';

export default TableBody;
