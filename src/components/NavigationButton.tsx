import clsx from 'clsx';

interface INavigationButtonProps extends React.HTMLProps<HTMLButtonElement> {}

function NavigationButton(props: INavigationButtonProps) {
    return (
        <button
            type="button"
            disabled={props.disabled}
            hidden={props.hidden}
            className={clsx(
                'w-6 h-6 rounded-md flex items-center justify-center py-1.5',
                props.className,
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default NavigationButton;
