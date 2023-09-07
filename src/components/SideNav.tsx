import { HomeIcon } from '@heroicons/react/24/solid';
import {
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
} from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSideBarNavigation } from '../providers/SideBarNavigationProvider';
import ThemeButtonNavBar from './ThemeButtonNavBar';
import Card from './core/card/Card';

export interface ISideButtonProps {
    prefix_icon?: React.ReactNode;
    suffix_icon?: React.ReactNode;
    text: string;
    className?: string;
    onClick?: () => void;
}

export interface ISideNavButtonProps extends ISideButtonProps {
    to: string;
}

export function SideNavButton({
    className,
    to,
    ...props
}: ISideNavButtonProps) {
    return (
        <Link
            to={to}
            className={clsx(
                'flex h-12 transform flex-row items-center text-ctp-text transition-transform duration-200 ease-in hover:translate-x-2 hover:text-ctp-blue',
                className,
            )}
        >
            <SideButton {...props} />
        </Link>
    );
}

export function SideButton({
    prefix_icon,
    suffix_icon,
    text,
    className,
}: ISideButtonProps) {
    return (
        <ListItem
            className={clsx(
                'hover:bg-ctp-subtext1 hover:text-ctp-base',
                className,
            )}
        >
            {prefix_icon && <ListItemPrefix>{prefix_icon}</ListItemPrefix>}
            {text}
            {suffix_icon && <ListItemSuffix>{prefix_icon}</ListItemSuffix>}
        </ListItem>
    );
}

export function SideNavSeparator() {
    return <hr className="my-2 border-ctp-text" />;
}

function SideNav() {
    const constant_buttons: ISideNavButtonProps[] = [
        {
            prefix_icon: <HomeIcon className="h-6 w-6 text-ctp-text" />,
            text: 'Home',
            to: '/',
        },
    ];

    const { menu_items } = useSideBarNavigation();
    const [open, set_open] = React.useState(false);

    return (
        // <Card className="flex h-full min-h-screen w-52 flex-col overflow-hidden rounded-l-none rounded-r-xl bg-ctp-surface0 shadow-lg">
        <Card className="h-full w-full max-w-[15rem] rounded-l-none bg-ctp-surface0 p-4 shadow-xl shadow-ctp-surface0">
            <Link to="/">
                <div className="flex h-20 items-center justify-center">
                    <h1 className="text-3xl uppercase text-blue-500">
                        GitDash
                    </h1>
                </div>
            </Link>
            <div className="flex h-full w-full flex-col">
                {constant_buttons.map((button) => (
                    <SideNavButton key={button.text} {...button} />
                ))}
                <SideNavSeparator />
                {menu_items}
                <div className="mt-auto">
                    <ThemeButtonNavBar
                        open={open}
                        onClick={() => set_open(!open)}
                    />
                </div>
            </div>
        </Card>
    );
}

export default SideNav;
