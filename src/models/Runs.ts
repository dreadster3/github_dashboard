import WorkflowRun, { IGithubWorkflowRun, IRun } from './Run';

export interface IRuns {
    total_count: number;
    workflow_runs: IRun[];
}

export interface IGithubWorkflowRuns {
    total_count: number;
    workflow_runs: IGithubWorkflowRun[];
}

class Runs implements IRuns {
    total_count: number;
    workflow_runs: IRun[];

    constructor(workflow_runs: IGithubWorkflowRuns) {
        this.total_count = workflow_runs.total_count;
        this.workflow_runs = workflow_runs.workflow_runs.map(
            (workflow_run) => new WorkflowRun(workflow_run),
        );
    }
}

export default Runs;
