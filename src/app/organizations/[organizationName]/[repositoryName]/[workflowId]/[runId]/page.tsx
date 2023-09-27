import Hydrate from '@/components/Hydrate';
import { server_prefetch_workflow_run_jobs_async } from '@/hooks/useGetJobs';
import { dehydrate } from '@tanstack/react-query';
import RunStepsView from './run_steps_view';

interface IPageParams {
    organizationName: string;
    repositoryName: string;
    workflowId: number;
    runId: number;
}

interface IPageProps {
    params: IPageParams;
}

async function Page({ params }: IPageProps) {
    const query_client = await server_prefetch_workflow_run_jobs_async(
        params.organizationName,
        params.repositoryName,
        params.runId,
    );
    const dehydrated_state = dehydrate(query_client);

    return (
        <Hydrate state={JSON.stringify(dehydrated_state)}>
            <RunStepsView params={params} />
        </Hydrate>
    );
}

export default Page;
