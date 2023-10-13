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

function OrganizationsView() {
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
                        className="p-4 w-1/3 aspect-[0.8]"
                    >
                        <Link
                            as={`/organizations/${organization.name}`}
                            href={`/organizations/[organizationName]`}
                        >
                            <Card className="overflow-hidden">
                                <CardHeader className="flex items-center w-full">
                                    <Image
                                        src={organization.avatar_url}
                                        className="w-full"
                                        width={460}
                                        height={460}
                                        priority
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

export default OrganizationsView;
