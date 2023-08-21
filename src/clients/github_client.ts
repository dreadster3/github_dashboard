import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Workflow, { EWorkflowState, IWorkflow } from '../models/Workflow';
import WorkflowRun, {
    EWorkflowRunStatus,
    IWorkflowRun,
} from '../models/WorkflowRun';

export interface IPageQueryParameters {
    per_page?: number;
    page?: number;
}

export interface IWorkflowRunQueryParameters extends IPageQueryParameters {
    actor?: string;
    branch?: string;
    event?: string;
    status?: EWorkflowState | EWorkflowRunStatus;
}

class GithubClient {
    private readonly axiosInstance: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance ?? axios.create();
    }

    async get_workflows_async(
        owner: string,
        repository_name: string,
        options?: IPageQueryParameters,
    ) {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/workflows`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.workflows.map(
            (workflow: IWorkflow) => new Workflow(workflow),
        );
    }

    async get_workflow_runs_async(
        owner: string,
        repository_name: string,
        workflow_id: number,
        options?: IWorkflowRunQueryParameters,
    ) {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/workflows/${workflow_id}/runs`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.workflow_runs.map(
            (workflow_run: IWorkflowRun) => new WorkflowRun(workflow_run),
        );
    }
}

export default GithubClient;
