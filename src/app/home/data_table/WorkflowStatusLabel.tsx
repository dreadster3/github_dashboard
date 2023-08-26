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
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IWorkflowStatusLabelProps {
    workflow_id: number;
}

function WorkflowStatusLabel({ workflow_id }: IWorkflowStatusLabelProps) {
    const { data, isLoading } = useGetWorkflowRuns(workflow_id, {
        page: 1,
        per_page: 1,
    });

    const workflow_run = useMemo(() => {
        console.log('Workflow id: %s', workflow_id);
        console.log(data);

        return data?.[0];
    }, [data]);

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
                return 'text-yellow-400';
            case EWorkflowRunStatus.IN_PROGRESS:
                return 'text-yellow-400 animate-spin';
            case EWorkflowRunStatus.COMPLETED:
                return 'text-green-400';
            default:
                return 'text-gray-400';
        }
    };

    const icon_from_status = (wr: IWorkflowRun | undefined): IconDefinition => {
        if (wr === undefined) {
            return icons.s_circle;
        }

        switch (wr.status) {
            case EWorkflowRunStatus.IN_PROGRESS:
                return icons.s_circle_notch;
        }

        return icons.s_circle;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const get_color = (wr: IWorkflowRun | undefined): string => {
        const result = text_color_from_status(wr);
        // console.log('Workflow id: %s | Color: %s', wr?.workflow_id, result);
        return result;
    };

    return (
        <>
            <FontAwesomeIcon
                className={clsx('px-3', get_color(workflow_run))}
                icon={icon_from_status(workflow_run)}
            />
        </>
    );
}

export default WorkflowStatusLabel;
