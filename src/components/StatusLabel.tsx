import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

enum EStatus {
    QUEUED = 'queued',
    IN_PROGRESS = 'in_progress',
    SUCCESS = 'success',
    FAILURE = 'failure',
    CANCELLED = 'cancelled',
}

interface IStatusLabelProps {
    status?: string | undefined;
    className?: string;
}

function StatusLabel({ status, className }: IStatusLabelProps) {
    const text_color_from_status = (): string => {
        switch (status) {
            case EStatus.SUCCESS:
                return 'text-ctp-green';
            case EStatus.FAILURE:
                return 'text-ctp-red';
            case EStatus.CANCELLED:
                return 'text-gray-400';
            case EStatus.QUEUED:
                return 'text-ctp-yellow';
            case EStatus.IN_PROGRESS:
                return 'text-ctp-yellow animate-spin';
            default:
                return 'text-gray-400';
        }
    };

    const icon_from_status = (): IconDefinition => {
        switch (status) {
            case EStatus.IN_PROGRESS:
                return icons.s_circle_notch;
            default:
                return icons.s_circle;
        }
    };
    return (
        <>
            <FontAwesomeIcon
                className={clsx(
                    text_color_from_status(),
                    'rounded-full',
                    className,
                )}
                icon={icon_from_status()}
            />
        </>
    );
}

export default StatusLabel;
