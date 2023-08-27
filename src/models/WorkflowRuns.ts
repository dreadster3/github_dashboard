import WorkflowRun, { IGithubWorkflowRun, IWorkflowRun } from './WorkflowRun';

export interface IWorkflowRuns {
    total_count: number;
    workflow_runs: IWorkflowRun[];
}

export interface IGithubWorkflowRuns {
    total_count: number;
    workflow_runs: IGithubWorkflowRun[];
}

export class WorkflowRuns implements IWorkflowRuns {
    total_count: number;
    workflow_runs: IWorkflowRun[];

    constructor(workflow_runs: IGithubWorkflowRuns) {
        this.total_count = workflow_runs.total_count;
        this.workflow_runs = workflow_runs.workflow_runs.map(
            (workflow_run) => new WorkflowRun(workflow_run),
        );
    }
}
