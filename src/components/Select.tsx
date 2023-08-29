import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import React from 'react';
import icons from '../constants/icons';

interface ISelectMenuProps {
    defaultValue?: string;
    className?: string;
    onValueChange?: (value: string) => void;
    children?:
        | React.ReactElement<typeof SelectItem>[]
        | React.ReactElement<typeof SelectGroup>[];
    view?: 'popper' | 'item-aligned';
    disabled?: boolean;
}

function SelectMenu({
    defaultValue,
    view,
    className,
    children,
    disabled,
    onValueChange,
}: ISelectMenuProps) {
    const [value, set_value] = React.useState(defaultValue);

    const handle_value_change = (value: string) => {
        onValueChange?.(value);
        set_value(value);
    };

    return (
        <Select.Root defaultValue={value} onValueChange={handle_value_change}>
            <Select.Trigger
                disabled={disabled}
                className={clsx(
                    'inline-flex justify-center items-center leading-none rounded outline-none px-[10px] text-[13px] h-[35px] gap-[5px] shadow-[0_2px_10px] shadow-black/10',
                    className,
                )}
            >
                <Select.Value />
                <Select.Icon className="text-xs text-blue-400">
                    <FontAwesomeIcon icon={icons.s_chevron_down} />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    position={view}
                    className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                >
                    <Select.ScrollUpButton className="flex justify-center items-center bg-white cursor-default h-[25px]"></Select.ScrollUpButton>
                    <Select.Viewport className="p-[5px]">
                        {children}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex justify-center items-center bg-white cursor-default h-[25px]"></Select.ScrollDownButton>
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
                'text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            <Select.ItemText>{children ?? props.value}</Select.ItemText>
            <Select.ItemIndicator className="inline-flex absolute left-0 justify-center items-center text-blue-400 w-[25px]">
                <FontAwesomeIcon icon={icons.s_check} />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export const SelectGroup = React.forwardRef<
    Select.SelectGroupProps & HTMLDivElement,
    Select.SelectGroupProps
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Group
            className={clsx(
                'text-xs px-[25px] leading-[25px] text-mauve11',
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Select.Group>
    );
});

export default SelectMenu;
