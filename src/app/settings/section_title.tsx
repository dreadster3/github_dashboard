import { Typography } from '@material-tailwind/react';

interface ISectionTitleProps {
    children: string;
}

function SectionTitle({ children }: ISectionTitleProps) {
    return (
        <Typography variant="h4" className="text-ctp-text">
            {children}
        </Typography>
    );
}

export default SectionTitle;
