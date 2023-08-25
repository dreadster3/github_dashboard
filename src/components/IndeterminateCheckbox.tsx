import { HTMLProps, useEffect, useRef } from 'react';

interface IIndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
    indeterminate?: boolean;
}

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: IIndeterminateCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    );
}

export default IndeterminateCheckbox;
