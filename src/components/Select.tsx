'use client';

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import React, { useMemo } from 'react';

interface ISelectMenuProps {
    value?: string;
    className?: string;
    onValueChange?: (value: string) => void;
    children?:
        | React.ReactElement<typeof SelectItem>[]
        | React.ReactElement<typeof SelectGroup>[]
        | React.ReactElement<typeof SelectItem>;
    view?: 'popper' | 'item-aligned';
    disabled?: boolean;
}

function SelectMenu({
    value: initial_value,
    view,
    className,
    children,
    disabled,
    onValueChange,
}: ISelectMenuProps) {
    const current_value = useMemo(() => initial_value, [initial_value]);

    return (
        <Select.Root value={current_value} onValueChange={onValueChange}>
            <Select.Trigger
                disabled={disabled}
                className={clsx(
                    'inline-flex h-9 items-center justify-center gap-2 rounded bg-ctp-surface0 px-3 text-xs leading-none text-ctp-text shadow-[0_2px_10px] shadow-black/10 outline-none',
                    className,
                )}
            >
                <Select.Value />
                <Select.Icon className="text-xs text-blue-400">
                    <ChevronDownIcon className="w-3 h-3" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    position={view}
                    className="overflow-hidden rounded-md bg-ctp-overlay0 text-ctp-base shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                >
                    <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center"></Select.ScrollUpButton>
                    <Select.Viewport className="p-1.5">
                        {children}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center"></Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

export const SelectItem = React.forwardRef<
    Select.SelectItemProps & HTMLDivElement,
    Select.SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item
            className={clsx(
                'data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            <Select.ItemText>{children ?? props.value}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center text-blue-400">
                <CheckIcon className="w-4 h-4" />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

SelectItem.displayName = 'CooreSelectItem';

export const SelectGroup = React.forwardRef<
    Select.SelectGroupProps & HTMLDivElement,
    Select.SelectGroupProps
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Group
            className={clsx(
                'text-mauve11 px-[25px] text-xs leading-[25px]',
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Select.Group>
    );
});

SelectGroup.displayName = 'CooreSelectGroup';

export default SelectMenu;
