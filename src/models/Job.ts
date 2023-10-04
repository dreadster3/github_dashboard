import { EConclusion, EStatus } from './Status';
import Step, { IStep } from './Step';

export interface IJob {
    id: number;
    run_id: number;
    name: string;
    status: EStatus;
    conclusion: EConclusion | undefined;
    steps: IStep[];
}

class Job implements IJob {
    id: number;
    run_id: number;
    name: string;
    status: EStatus;
    conclusion: EConclusion | undefined;
    steps: IStep[];

    constructor(job: IJob) {
        this.id = job.id;
        this.run_id = job.run_id;
        this.name = job.name;
        this.status = job.status;
        this.conclusion = job.conclusion;
        this.steps = job.steps.map((step) => new Step(step));
    }
}

export default Job;
