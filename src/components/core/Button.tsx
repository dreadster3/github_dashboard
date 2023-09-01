import { CircularProgress, SxProps, Theme } from '@mui/material';
import MuiButton from '@mui/material/Button';
import clsx from 'clsx';
import React, { MouseEventHandler } from 'react';

export interface IButtonProps {
    children?: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    className?: string;
    variant?: 'text' | 'outlined' | 'contained';
    type?: 'button' | 'submit' | 'reset';
    color?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning';
    disabled?: boolean;
    isLoading?: boolean;
    size?: 'small' | 'medium' | 'large';
    sx?: SxProps<Theme>;
}

const Button = React.forwardRef(
    (
        { children, isLoading, ...props }: IButtonProps,
        ref: React.Ref<HTMLButtonElement>,
    ) => {
        return (
            <MuiButton
                ref={ref}
                className={clsx('text-sm gap-2', props.className)}
                sx={{
                    minWidth: '0px',
                    minHeight: '0px',
                }}
                variant={props.variant ?? 'contained'}
                {...props}
            >
                {isLoading && <CircularProgress color="inherit" size="20px" />}
                {children}
            </MuiButton>
        );
    },
);

export default Button;
