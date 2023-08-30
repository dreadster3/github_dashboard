import { EConclusion, EStatus } from './Status';

export interface IJob {
    id: number;
    run_id: number;
    name: string;
    status: EStatus;
    conclusion: EConclusion | undefined;
}

class Job implements IJob {
    id: number;
    run_id: number;
    name: string;
    status: EStatus;
    conclusion: EConclusion | undefined;

    constructor(job: IJob) {
        this.id = job.id;
        this.run_id = job.run_id;
        this.name = job.name;
        this.status = job.status;
        this.conclusion = job.conclusion;
    }
}

export default Job;
