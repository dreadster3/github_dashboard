import Hydrate from '@/components/Hydrate';
import { server_prefetch_workflow_runs_async } from '@/hooks/useGetWorkflowRuns';
import { dehydrate } from '@tanstack/react-query';
import WorkflowRunsView from './workflow_runs_view';

interface IPageParams {
    workflowId: number;
}

interface IPageProps {
    params: IPageParams;
}

export default async function Page({ params }: IPageProps) {
    const per_page = 10;
    const query_client = await server_prefetch_workflow_runs_async(
        params.workflowId,
        {
            page: 1,
            per_page,
        },
    );
    const dehydrated_state = dehydrate(query_client);

    return (
        <Hydrate state={JSON.stringify(dehydrated_state)}>
            <WorkflowRunsView params={params} default_per_page={per_page} />
        </Hydrate>
    );
}
