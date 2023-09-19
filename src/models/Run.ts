import { EConclusion, EStatus } from './Status';

export interface IRun {
    id: number;
    name: string;
    run_number: number;
    status: EStatus;
    conclusion: EConclusion | undefined;
    workflow_id: number;
    branch: string;
}

export interface IGithubWorkflowRun {
    id: number;
    name: string;
    run_number: number;
    status: EStatus;
    conclusion: EConclusion | undefined;
    workflow_id: number;
    head_branch: string;
}

class Run implements IRun {
    id: number;
    name: string;
    run_number: number;
    status: EStatus;
    conclusion: EConclusion | undefined;
    workflow_id: number;
    branch: string;

    constructor(workflow_run: IGithubWorkflowRun) {
        this.id = workflow_run.id;
        this.name = workflow_run.name;
        this.run_number = workflow_run.run_number;
        this.status = workflow_run.status;
        this.conclusion = workflow_run.conclusion;
        this.workflow_id = workflow_run.workflow_id;
        this.branch = workflow_run.head_branch;
    }
}

export default Run;
