export enum EWorkflowState {
    ACTIVE = 'active',
    DELETED = 'deleted',
    DISABLED_MANUAL = 'disabled_manually',
    DISABLED_INACTIVE = 'disabled_inactivity',
    DISABLED_FORK = 'disabled_fork',
}

export interface IWorkflow {
    id: number;
    name: string;
    path: string;
    state: EWorkflowState;
}

class Workflow implements IWorkflow {
    id: number;
    name: string;
    path: string;
    state: EWorkflowState;

    constructor(workflow: IWorkflow) {
        this.id = workflow.id;
        this.name = workflow.name;
        this.path = workflow.path;
        this.state = workflow.state;
    }
}

export default Workflow;
