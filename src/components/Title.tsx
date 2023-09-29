import { Typography } from '@material-tailwind/react';
import clsx from 'clsx';

interface ITitleProps {
    children: string;
    className?: string;
    subtitle?: string;
}

function Title({ children, className, subtitle }: ITitleProps) {
    return (
        <div className={clsx('pb-5 text-ctp-text', className)}>
            <Typography variant="h2">{children}</Typography>
            {subtitle && <Typography variant="h6">{subtitle}</Typography>}
        </div>
    );
}

export default Title;
