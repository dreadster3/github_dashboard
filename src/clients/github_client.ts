import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Workflow, { IWorkflow } from '../models/Workflow';

class GithubClient {
    private readonly axiosInstance: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance ?? axios.create();
    }

    async get_workflows_async(owner: string, repository_name: string) {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/workflows`,
        };

        const response = await this.axiosInstance.request(options);

        return response.data.workflows.map(
            (workflow: IWorkflow) => new Workflow(workflow),
        );
    }
}

export default GithubClient;
