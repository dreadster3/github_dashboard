import Hydrate from '@/components/Hydrate';
import { server_prefetch_organizations_async } from '@/hooks/useGetOrganizations';
import { dehydrate } from '@tanstack/react-query';
import OrganizationsView from './organizations_view';

export default async function Home() {
    const client = await server_prefetch_organizations_async();
    const dehydrated_state = dehydrate(client);

    return (
        <Hydrate state={JSON.stringify(dehydrated_state)}>
            <OrganizationsView />
        </Hydrate>
    );
}
