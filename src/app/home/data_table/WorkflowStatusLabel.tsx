import { useMemo } from 'react';
import useGetWorkflowRuns from '../../../hooks/useGetWorkflowRuns';
import {
    EWorkflowRunConclusion,
    EWorkflowRunStatus,
    IWorkflowRun,
} from '../../../models/WorkflowRun';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../constants/icons';
import clsx from 'clsx';

interface IWorkflowStatusLabelProps {
    workflow_id: number;
}

function WorkflowStatusLabel({ workflow_id }: IWorkflowStatusLabelProps) {
    const { data, isLoading } = useGetWorkflowRuns(workflow_id, {
        page: 1,
        per_page: 1,
    });

    const workflow_run = useMemo(() => data?.[0], [data]);

    const text_color_from_status = (wr: IWorkflowRun | undefined): string => {
        if (wr === undefined) {
            return 'text-gray-400';
        }

        switch (wr.conclusion) {
            case EWorkflowRunConclusion.SUCCESS:
                return 'text-green-400';
            case EWorkflowRunConclusion.FAILURE:
                return 'text-red-400';
            case EWorkflowRunConclusion.CANCELLED:
                return 'text-gray-400';
        }

        switch (wr.status) {
            case EWorkflowRunStatus.QUEUED:
                return 'text-gray-400';
            case EWorkflowRunStatus.IN_PROGRESS:
                return 'text-yellow-400';
            case EWorkflowRunStatus.COMPLETED:
                return 'text-green-400';
            default:
                return 'text-gray-400';
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FontAwesomeIcon
                className={clsx('px-3', text_color_from_status(workflow_run))}
                icon={icons.s_circle}
            />
        </>
    );
}

export default WorkflowStatusLabel;
