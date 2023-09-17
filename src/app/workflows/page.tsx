import { prefetchWorkflows } from '@/hooks/useGetWorkflows';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import WorkflowList from './workflow_list';

export default async function Page() {
    const query_client = await prefetchWorkflows({ page: 1, per_page: 10 });
    const dehydrated_state = dehydrate(query_client);

    return (
        <Hydrate state={dehydrated_state}>
            <WorkflowList />
        </Hydrate>
    );
}
