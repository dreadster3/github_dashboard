import Hydrate from '@/components/Hydrate';
import { server_prefetch_organization_repositories_async } from '@/hooks/useGetRepositories';
import { dehydrate } from '@tanstack/react-query';
import RepositoriesView from './repositories_view';

interface IPageParams {
    organizationName: string;
}

interface IPageProps {
    params: IPageParams;
}

async function Page({ params }: IPageProps) {
    const query_client = await server_prefetch_organization_repositories_async(
        params.organizationName,
    );

    const dehydrated_state = dehydrate(query_client);

    return (
        <Hydrate state={JSON.stringify(dehydrated_state)}>
            <RepositoriesView organizationName={params.organizationName} />
        </Hydrate>
    );
}

export default Page;
