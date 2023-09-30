'use client';

import Title from '@/components/Title';
import Card from '@/components/core/card/Card';
import CardBody from '@/components/core/card/CardBody';
import CardFooter from '@/components/core/card/CardFooter';
import CardHeader from '@/components/core/card/CardHeader';
import SearchBar from '@/components/table_addons/SearchBar';
import language_icon_map from '@/constants/language_icons_map';
import useGetOrganizationRepositories from '@/hooks/useGetRepositories';
import GithubRepo from '@/icons/GithubRepo';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { escapeRegExp } from '@/utils/string_utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface IPageParams {
    organizationName: string;
}

interface IPageProps {
    params: IPageParams;
}

function Page({ params }: IPageProps) {
    const { organizationName } = params;
    const { data } = useGetOrganizationRepositories(organizationName);
    const [search, set_search] = useState('');
    const { set_menu_items } = useSideNavigation();

    useEffect(() => {
        set_menu_items(<></>);
    }, [set_menu_items]);

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between items-center">
                <Title subtitle={`Organization: ${organizationName}`}>
                    Repositories
                </Title>

                <SearchBar value={search} onChange={set_search} />
            </div>
            <div className="flex flex-row flex-wrap">
                {data
                    ?.filter(
                        (r) =>
                            r.name
                                .toLowerCase()
                                .match(escapeRegExp(search.toLowerCase())) ||
                            r.language
                                ?.toLowerCase()
                                .match(escapeRegExp(search.toLowerCase())),
                    )
                    .map((repo) => (
                        <div
                            key={repo.id}
                            className="xl:w-1/5 lg:w-1/3 p-2 aspect-square"
                        >
                            <Link href={`${organizationName}/${repo.name}`}>
                                <Card className="overflow-hidden w-full h-full">
                                    <CardHeader className="flex flex-row p-1 w-full h-1/6">
                                        <div className="flex flex-row gap-2 w-4/5 items-center">
                                            <GithubRepo className="shrink-0" />
                                            <span className="truncate">
                                                {repo.name}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="h-5/6 overflow-hidden">
                                        <span className="line-clamp-5">
                                            {repo.description}
                                        </span>
                                    </CardBody>
                                    <CardFooter className="flex h-10 py-0 items-center bg-ctp-base border-t border-ctp-surface1">
                                        <div className="text-ctp-text flex flex-row items-center gap-2">
                                            <div className="flex items-center justify-center rounded overflow-hidden">
                                                {repo.language &&
                                                    language_icon_map.has(
                                                        repo.language.toLowerCase(),
                                                    ) &&
                                                    React.cloneElement(
                                                        language_icon_map.get(
                                                            repo.language.toLowerCase(),
                                                        )!,
                                                        {
                                                            className:
                                                                'w-6 h-6',
                                                        },
                                                    )}
                                            </div>
                                            <span className="text-lg">
                                                {repo.language ?? 'None'}
                                            </span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Page;
