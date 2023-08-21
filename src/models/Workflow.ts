export interface IWorkflow {
    id: number;
    name: string;
    path: string;
    state: string;
}

class Workflow implements IWorkflow {
    id: number;
    name: string;
    path: string;
    state: string;

    constructor(workflow: IWorkflow) {
        this.id = workflow.id;
        this.name = workflow.name;
        this.path = workflow.path;
        this.state = workflow.state;
    }
}

export default Workflow;
