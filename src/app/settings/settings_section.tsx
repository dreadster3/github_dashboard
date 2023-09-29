import clsx from 'clsx';
import SectionTitle from './section_title';

interface ISettingsSectionProps {
    children?: React.ReactNode;
    title?: string;
    className?: string;
}

function SettingsSection({
    children,
    title,
    className,
}: ISettingsSectionProps) {
    return (
        <div className="flex flex-col bg-ctp-mantle p-5 rounded-md gap-4">
            {title && <SectionTitle>{title}</SectionTitle>}
            <div className={clsx('flex flex-row', className)}>{children}</div>
        </div>
    );
}

export default SettingsSection;
