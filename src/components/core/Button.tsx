import { Button as MButton, Spinner } from '@material-tailwind/react';
import { SxProps, Theme } from '@mui/material';
import clsx from 'clsx';
import React, { MouseEventHandler, Ref } from 'react';

export interface IButtonProps {
    children?: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    className?: string;
    variant?: 'filled' | 'gradient' | 'text' | 'outlined';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isLoading?: boolean;
    isInvisible?: boolean;
    color?: 'blue';
    size?: 'sm' | 'md' | 'lg';
    sx?: SxProps<Theme>;
}

const Button = React.forwardRef(
    (
        { children, isLoading, isInvisible, ...props }: IButtonProps,
        ref: Ref<HTMLButtonElement>,
    ) => {
        return (
            <MButton
                ref={ref}
                className={clsx(
                    'flex items-center gap-2 text-sm',
                    isInvisible && 'invisible',
                    props.className,
                )}
                variant={props.variant ?? 'filled'}
                {...props}
            >
                {isLoading && (
                    <Spinner color="gray" className="text-ctp-text" />
                )}
                {children}
            </MButton>
        );
    },
);

export default Button;
