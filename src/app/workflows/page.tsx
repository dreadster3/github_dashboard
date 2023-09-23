import Hydrate from '@/components/Hydrate';
import { server_prefetch_workflows_async } from '@/hooks/useGetWorkflows';
import { dehydrate } from '@tanstack/react-query';
import WorkflowsView from './workflows_view';

export default async function Page() {
    const per_page = 10;
    const query_client = await server_prefetch_workflows_async({
        page: 1,
        per_page,
    });
    const dehydrated_state = dehydrate(query_client);

    return (
        <Hydrate state={JSON.stringify(dehydrated_state)}>
            <WorkflowsView default_per_page={per_page} />
        </Hydrate>
    );
}
