interface IPageParams {
    workflowId: number;
    runId: number;
}

interface IPageProps {
    params: IPageParams;
}

function page({ params }: IPageProps) {
    return (
        <div>
            {params.workflowId} {params.runId}
        </div>
    );
}

export default page;
