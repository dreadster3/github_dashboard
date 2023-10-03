import { EConclusion, EStatus } from './Status';

export interface IStep {
    number: number;
    name: string;
    status: EStatus;
    conclusion: EConclusion | undefined;
    started_at: Date;
    completed_at: Date;
}

class Step implements IStep {
    number: number;
    name: string;
    status: EStatus;
    conclusion: EConclusion | undefined;
    started_at: Date;
    completed_at: Date;

    constructor(step: IStep) {
        this.number = step.number;
        this.name = step.name;
        this.status = step.status;
        this.conclusion = step.conclusion;
        this.started_at = new Date(step.started_at);
        this.completed_at = new Date(step.completed_at);
    }
}

export default Step;
