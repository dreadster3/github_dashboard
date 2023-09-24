import { Typography } from '@material-tailwind/react';
import clsx from 'clsx';

interface ITitleProps {
    children: string;
    className?: string;
}

function Title({ children, className }: ITitleProps) {
    return (
        <Typography
            className={clsx(className, 'pb-5 text-ctp-text')}
            variant="h2"
        >
            {children}
        </Typography>
    );
}

export default Title;
