import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Workflow, { EWorkflowState, IWorkflow } from '../models/Workflow';
import WorkflowRun, {
    EWorkflowRunStatus,
    IGithubWorkflowRun,
    IWorkflowRun,
} from '../models/WorkflowRun';
import { IWorkflowRuns, WorkflowRuns } from '../models/WorkflowRuns';
import { IWorkflows, Workflows } from '../models/Workflows';

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
    ): Promise<IWorkflows> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/workflows`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return new Workflows(response.data);
    }

    async get_workflow_runs_async(
        owner: string,
        repository_name: string,
        workflow_id: number,
        options?: IWorkflowRunQueryParameters,
    ): Promise<IWorkflowRuns> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/workflows/${workflow_id}/runs`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return new WorkflowRuns(response.data);
    }

    async dispatch_workflow_async(
        owner: string,
        respository_name: string,
        workflow_id: number,
        branch: string,
        inputs?: { [key: string]: string },
    ): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `/repos/${owner}/${respository_name}/actions/workflows/${workflow_id}/dispatches`,
            data: {
                ref: branch,
                inputs: inputs,
            },
        };

        await this.axiosInstance.request(config);
    }
}

export default GithubClient;
