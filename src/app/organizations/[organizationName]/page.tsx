'use client';

import Title from '@/components/Title';
import Card from '@/components/core/card/Card';
import CardBody from '@/components/core/card/CardBody';
import CardFooter from '@/components/core/card/CardFooter';
import CardHeader from '@/components/core/card/CardHeader';
import useGetOrganizationRepositories from '@/hooks/useGetRepositories';
import GithubRepo from '@/icons/GithubRepo';
import Link from 'next/link';

interface IPageParams {
    organizationName: string;
}

interface IPageProps {
    params: IPageParams;
}

function Page({ params }: IPageProps) {
    const { organizationName } = params;
    const { data } = useGetOrganizationRepositories(organizationName);

    return (
        <div className="w-full">
            <Title subtitle={`Organization: ${organizationName}`}>
                Repositories
            </Title>
            <div className="flex flex-row flex-wrap">
                {data?.map((repo) => (
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
                                    <span className="text-ctp-text">
                                        {repo.language ?? 'None'}
                                    </span>
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
