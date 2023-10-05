import Environment, { IEnvironment } from './Environment';

export interface IDeployment {
    environment: IEnvironment;
    current_user_can_approve: boolean;
}

export interface IReviewDeployment {
    environment_id: number;
    state: 'approved' | 'rejected';
    comment?: string | undefined;
}

class Deployment implements IDeployment {
    public environment: IEnvironment;
    public current_user_can_approve: boolean;

    constructor(deployment: IDeployment) {
        this.environment = new Environment(deployment.environment);
        this.current_user_can_approve = deployment.current_user_can_approve;
    }
}

export default Deployment;
