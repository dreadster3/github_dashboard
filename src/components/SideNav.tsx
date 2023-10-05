'use client';

import useGetOrganizations from '@/hooks/useGetOrganizations';
import { useSideNavigation } from '@/providers/SideNavProvider';
import {
    ArrowRightOnRectangleIcon,
    CogIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
} from '@heroicons/react/24/solid';
import {
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
} from '@material-tailwind/react';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';
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
            prefix_icon: <HomeIcon className="w-6 h-6 text-ctp-text" />,
            text: 'Home',
            to: '/',
        },
    ];

    const { menu_items } = useSideNavigation();
    const { data: session } = useSession();
    const { data } = useGetOrganizations();
    const [open, set_open] = React.useState(false);

    return (
        <Card className="p-4 w-full h-full rounded-l-none shadow-xl max-w-[15rem] bg-ctp-surface0 shadow-ctp-surface0">
            <Link href="/">
                <div className="flex justify-center items-center h-20">
                    <h1 className="text-3xl text-blue-500 uppercase">
                        GitDashing
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col w-full h-full">
                <div className="h-full">
                    {constant_buttons.map((button) => (
                        <SideNavButton key={button.text} {...button} />
                    ))}
                    <SideNavSeparator />
                    {data?.map((org) => (
                        <SideNavButton
                            key={org.name}
                            text={org.name}
                            to={`/organizations/${org.name}`}
                            prefix_icon={
                                session?.user.username === org.name ? (
                                    <UserIcon className="w-6 h-6 text-ctp-text" />
                                ) : (
                                    <UsersIcon className="w-6 h-6 text-ctp-text" />
                                )
                            }
                        />
                    ))}
                    <SideNavSeparator />
                    {menu_items}
                </div>
                <div className="sticky right-0 bottom-0 left-0">
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
