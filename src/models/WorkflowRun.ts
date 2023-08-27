export enum EWorkflowRunStatus {
    QUEUED = 'queued',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export enum EWorkflowRunConclusion {
    SUCCESS = 'success',
    FAILURE = 'failure',
    CANCELLED = 'cancelled',
}

export interface IWorkflowRun {
    id: number;
    name: string;
    status: EWorkflowRunStatus;
    conclusion: EWorkflowRunConclusion | undefined;
    workflow_id: number;
    branch: string;
}

export interface IGithubWorkflowRun {
    id: number;
    name: string;
    status: EWorkflowRunStatus;
    conclusion: EWorkflowRunConclusion | undefined;
    workflow_id: number;
    head_branch: string;
}

class WorkflowRun implements IWorkflowRun {
    id: number;
    name: string;
    status: EWorkflowRunStatus;
    conclusion: EWorkflowRunConclusion | undefined;
    workflow_id: number;
    branch: string;

    constructor(workflow_run: IGithubWorkflowRun) {
        this.id = workflow_run.id;
        this.name = workflow_run.name;
        this.status = workflow_run.status;
        this.conclusion = workflow_run.conclusion;
        this.workflow_id = workflow_run.workflow_id;
        this.branch = workflow_run.head_branch;
    }
}

export default WorkflowRun;
