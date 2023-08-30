import { EConclusion, EStatus } from './Status';

export interface IStep {
    number: number;
    name: string;
    status: EStatus;
    conclusion: EConclusion | undefined;
}
