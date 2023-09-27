'use client';

import { useSideNavigation } from '@/providers/SideNavProvider';
import {
    ArrowRightOnRectangleIcon,
    CogIcon,
    HomeIcon,
} from '@heroicons/react/24/solid';
import {
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
} from '@material-tailwind/react';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Card from './core/card/Card';

export interface ISideNavButtonProps {
    to?: string | undefined;
    prefix_icon?: React.ReactNode;
    suffix_icon?: React.ReactNode;
    text: string;
    className?: string;
    onClick?: () => void;
}

export function SideNavButton({
    to,
    prefix_icon,
    suffix_icon,
    text,
    className,
    onClick,
}: ISideNavButtonProps) {
    const component = (
        <ListItem
            className={clsx(
                'flex h-12 transform flex-row items-center text-ctp-text transition-transform duration-200 ease-in',
                'hover:translate-x-2 hover:bg-ctp-subtext1 hover:text-ctp-base',
                className,
            )}
            onClick={onClick}
        >
            {prefix_icon && <ListItemPrefix>{prefix_icon}</ListItemPrefix>}
            {text}
            {suffix_icon && <ListItemSuffix>{suffix_icon}</ListItemSuffix>}
        </ListItem>
    );

    return to ? <Link href={to}>{component}</Link> : component;
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

    const { menu_items } = useSideNavigation();
    const [open, set_open] = React.useState(false);

    return (
        <Card className="h-full w-full max-w-[15rem] rounded-l-none bg-ctp-surface0 p-4 shadow-xl shadow-ctp-surface0">
            <Link href="/">
                <div className="flex h-20 items-center justify-center">
                    <h1 className="text-3xl uppercase text-blue-500">
                        GitDash
                    </h1>
                </div>
            </Link>
            <div className="flex h-full w-full flex-col">
                <div className="h-full">
                    {constant_buttons.map((button) => (
                        <SideNavButton key={button.text} {...button} />
                    ))}
                    <SideNavSeparator />
                    {menu_items}
                </div>
                <div className="sticky bottom-0 left-0 right-0">
                    <SideNavButton
                        to="/settings"
                        text="Settings"
                        suffix_icon={
                            <CogIcon className="w-6 h-6 text-ctp-text" />
                        }
                    />
                    <SideNavButton
                        to="/"
                        text="Log Out"
                        onClick={() => signOut()}
                        suffix_icon={
                            <ArrowRightOnRectangleIcon className="w-6 h-6 text-ctp-text" />
                        }
                    />
                </div>
            </div>
        </Card>
    );
}

export default SideNav;
