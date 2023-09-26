import Hydrate from '@/components/Hydrate';
import { server_prefetch_workflows_async } from '@/hooks/useGetWorkflows';
import { dehydrate } from '@tanstack/react-query';
import WorkflowsView from './workflows_view';

interface IPageParams {
    organizationName: string;
    repositoryName: string;
}

interface IPageProps {
    params: IPageParams;
}

async function Page({ params }: IPageProps) {
    const { organizationName, repositoryName } = params;
    const per_page = 10;
    const query_client = await server_prefetch_workflows_async(
        organizationName,
        repositoryName,
        {
            page: 1,
            per_page,
        },
    );
    const dehydrated_state = dehydrate(query_client);

    return (
        <Hydrate state={JSON.stringify(dehydrated_state)}>
            <WorkflowsView
                owner={organizationName}
                repo={repositoryName}
                default_per_page={per_page}
            />
        </Hydrate>
    );
}

export default Page;
