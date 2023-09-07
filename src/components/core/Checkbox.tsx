import { CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Checkbox as MCheckbox } from '@material-tailwind/react';
import React from 'react';

interface ICheckboxProps {
    checked?: boolean | undefined;
    indeterminate?: boolean | undefined;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean | undefined;
}

const checked_icon = <CheckIcon />;
const indeterminate_icon = <MinusIcon />;

const Checkbox = React.forwardRef(
    (
        { checked, indeterminate, ...props }: ICheckboxProps,
        ref: React.Ref<HTMLInputElement>,
    ) => {
        const icon = indeterminate ? indeterminate_icon : checked_icon;

        return (
            <MCheckbox
                icon={React.cloneElement(icon, {
                    className: 'h-5 w-5 text-ctp-base',
                })}
                ref={ref}
                color="blue"
                checked={checked || indeterminate}
                {...props}
            />
        );
    },
);

export default Checkbox;
