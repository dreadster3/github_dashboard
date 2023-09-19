import clsx from 'clsx';
import React, { Ref } from 'react';

interface ITableAddonProps {
    children?: React.ReactNode;
    className?: string;
}

const TableAddon = React.forwardRef(
    ({ children, className }: ITableAddonProps, ref: Ref<HTMLDivElement>) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    'flex flex-row justify-between pb-2 w-full h-12 items-center',
                    className,
                )}
            >
                {children}
            </div>
        );
    },
);

TableAddon.displayName = 'CoreTableAddon';

export default TableAddon;
