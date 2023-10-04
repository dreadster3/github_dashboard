'use client';

import { HomeIcon } from '@heroicons/react/24/solid';
import { Breadcrumbs } from '@material-tailwind/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

function BreadCrumbNavigation() {
    const path_name = usePathname();

    const levels = useMemo(
        () => (path_name === '/' ? [''] : path_name.split('/')),
        [path_name],
    );

    if (levels.length < 2) {
        return null;
    }

    return (
        <Breadcrumbs className="bg-ctp-surface1" separator="-">
            {levels.map((level, index) => {
                const path = levels.slice(0, index + 1).join('/');

                if (level === '') {
                    return (
                        <Link
                            key={index}
                            className="text-ctp-text hover:text-ctp-blue"
                            href="/"
                        >
                            <HomeIcon className="w-4 h-4" />
                        </Link>
                    );
                }

                if (level === 'organizations') {
                    return null;
                }

                return (
                    <Link
                        key={index}
                        href={path}
                        onClick={(e) => {
                            if (path === path_name) {
                                e.preventDefault();
                            }
                        }}
                        className={clsx(
                            'text-ctp-text',
                            path !== path_name && 'hover:text-ctp-blue',
                            path === path_name &&
                                'font-bold cursor-default hover:cursor-default',
                        )}
                    >
                        {level}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}

export default BreadCrumbNavigation;
