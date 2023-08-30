import { IJob } from './Job';

export interface IJobs {
    total_count: number;
    jobs: IJob[];
}

class Jobs implements IJobs {
    total_count: number;
    jobs: IJob[];

    constructor(jobs: IJobs) {
        this.total_count = jobs.total_count;
        this.jobs = jobs.jobs;
    }
}

export default Jobs;
