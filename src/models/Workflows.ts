import { IWorkflow } from './Workflow';

export interface IWorkflows {
    total_count: number;
    workflows: IWorkflow[];
}

export class Workflows implements IWorkflows {
    total_count: number;
    workflows: IWorkflow[];

    constructor(workflows: IWorkflows) {
        this.total_count = workflows.total_count;
        this.workflows = workflows.workflows;
    }
}
