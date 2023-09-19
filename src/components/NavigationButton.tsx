import clsx from 'clsx';
import Button, { IButtonProps } from './core/Button';

interface INavigationButtonProps extends IButtonProps {}

function NavigationButton({
    children,
    className,
    ...props
}: INavigationButtonProps) {
    return (
        <Button
            type="button"
            className={clsx(
                'w-6 h-6 rounded-md flex items-center justify-center py-1.5',
                className,
            )}
            {...props}
        >
            {children}
        </Button>
    );
}

export default NavigationButton;
