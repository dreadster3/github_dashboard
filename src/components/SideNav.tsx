import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Separator from '@radix-ui/react-separator';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import icons from '../constants/icons';
import { useSideBarNavigation } from '../providers/SideBarNavigationProvider';

export interface ISideNavButtonProps {
    key: string;
    icon?: React.ReactNode;
    text: string;
    to: string;
    className?: string;
    onClick?: () => void;
}

export function SideNavButton({
    icon,
    text,
    to,
    className,
    onClick,
}: ISideNavButtonProps) {
    return (
        <Link
            to={to}
            className={clsx(
                'flex flex-row items-center h-12 text-gray-500 dark:text-gray-300 transition-transform duration-200 ease-in transform hover:text-gray-800 hover:translate-x-2',
                className,
            )}
            onClick={onClick}
        >
            <span className="inline-flex justify-center items-center w-12 h-12 text-lg text-gray-400">
                {icon}
            </span>
            <span className="text-sm font-medium">{text}</span>
        </Link>
    );
}

export function SideNavSeparator() {
    return (
        <Separator.Root
            className="bg-gray-400 data-[orientation=horizontal]:w-full h-px"
            orientation="horizontal"
        />
    );
}

function SideNav() {
    const constant_buttons: ISideNavButtonProps[] = [
        {
            key: 'home',
            icon: (
                <FontAwesomeIcon
                    className="dark:text-neutral-600"
                    icon={icons.s_home}
                />
            ),
            text: 'Home',
            to: '/',
        },
    ];

    const { menu_items } = useSideBarNavigation();

    return (
        <div className="flex overflow-hidden flex-col w-52 h-full min-h-screen bg-white rounded-r-xl shadow-lg dark:bg-neutral-950">
            <Link to="/">
                <div className="flex justify-center items-center h-20 shadow-md">
                    <h1 className="text-3xl text-blue-500 uppercase">
                        GitDash
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col w-full">
                {constant_buttons.map((button) => (
                    <SideNavButton {...button} />
                ))}
                <SideNavSeparator />
                {menu_items}
            </div>
        </div>
    );
}

export default SideNav;
