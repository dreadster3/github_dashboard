'use client';

import Title from '@/components/Title';
import Card from '@/components/core/card/Card';
import CardBody from '@/components/core/card/CardBody';
import CardHeader from '@/components/core/card/CardHeader';
import useGetOrganizations from '@/hooks/useGetOrganizations';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
    const { set_menu_items } = useSideNavigation();
    const { data } = useGetOrganizations();

    useEffect(() => {
        set_menu_items(<></>);
    }, [set_menu_items]);

    return (
        <div className="w-full">
            <Title>Organizations</Title>
            <div className="flex flex-row flex-wrap">
                {data?.map((organization) => (
                    <div
                        key={organization.name}
                        className="w-1/3 aspect-[0.8] p-4"
                    >
                        <Link href={`/organizations/${organization.name}`}>
                            <Card className="overflow-hidden">
                                <CardHeader className="flex w-full items-center">
                                    <Image
                                        src={organization.avatar_url}
                                        width={460}
                                        height={460}
                                        alt={organization.name}
                                    />
                                </CardHeader>
                                <CardBody className="flex flex-col gap-4">
                                    <Typography
                                        variant="h5"
                                        className="text-ctp-text"
                                    >
                                        {organization.name}
                                    </Typography>
                                    <Typography className="text-ctp-text">
                                        {organization.description}
                                    </Typography>
                                </CardBody>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
