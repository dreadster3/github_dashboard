import Branch, { IBranch } from '@/models/Branch';
import Deployment, {
    IDeployment,
    IReviewDeployment,
} from '@/models/Deployment';
import Jobs, { IJobs } from '@/models/Jobs';
import {
    IGithubOrganization,
    IOrganization,
    Organization,
} from '@/models/Organization';
import { IRepository, Repository } from '@/models/Repository';
import Runs, { IRuns } from '@/models/Runs';
import { EConclusion, EStatus } from '@/models/Status';
import { IWorkflows, Workflows } from '@/models/Workflows';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IPageQueryParameters {
    per_page?: number;
    page?: number;
}

export interface IWorkflowRunQueryParameters extends IPageQueryParameters {
    actor?: string;
    branch?: string;
    event?: string;
    status?: EStatus | EConclusion;
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
    ): Promise<IRuns> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/workflows/${workflow_id}/runs`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return new Runs(response.data);
    }

    async get_all_workflow_runs_async(
        owner: string,
        repository_name: string,
        options?: IWorkflowRunQueryParameters,
    ): Promise<IRuns> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/runs`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return new Runs(response.data);
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

    async get_workflow_run_jobs_async(
        owner: string,
        repository_name: string,
        run_id: number,
        options?: IPageQueryParameters,
    ): Promise<IJobs> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/runs/${run_id}/jobs`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return new Jobs(response.data);
    }

    async get_organizations_async(
        options?: IPageQueryParameters,
    ): Promise<IOrganization[]> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/user/orgs`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.map(
            (organization: IGithubOrganization) =>
                new Organization(organization),
        );
    }

    async get_repository_async(
        owner: string,
        repository_name: string,
        options?: IPageQueryParameters,
    ): Promise<IRepository> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return new Repository(response.data);
    }

    async get_organization_repositories_async(
        organization: string,
        options?: IPageQueryParameters,
    ): Promise<IRepository[]> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/orgs/${organization}/repos`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.map(
            (repository: IRepository) => new Repository(repository),
        );
    }

    async get_user_repositories_async(
        user: string,
        options?: IPageQueryParameters,
    ): Promise<IRepository[]> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/users/${user}/repos`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.map(
            (repository: IRepository) => new Repository(repository),
        );
    }

    async get_authenticated_user_repositories_async(
        options?: IPageQueryParameters,
    ): Promise<IRepository[]> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/user/repos`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.map(
            (repository: IRepository) => new Repository(repository),
        );
    }

    async get_branches_async(
        owner: string,
        repository_name: string,
        options?: IPageQueryParameters,
    ): Promise<IBranch[]> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/branches`,
            params: options,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.map((branch: IBranch) => new Branch(branch));
    }

    async get_job_log_async(
        owner: string,
        repository_name: string,
        job_id: number,
    ): Promise<string> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/jobs/${job_id}/logs`,
            headers: {
                Accept: 'application/vnd.github+json',
            },
        };

        const response = await this.axiosInstance.request(config);

        return response.data;
    }

    async get_workflow_run_log_async(
        owner: string,
        repository_name: string,
        run_id: number,
    ): Promise<Blob> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/runs/${run_id}/logs`,
            headers: {
                Accept: 'application/vnd.github+json',
            },
            responseType: 'blob',
        };

        const response = await this.axiosInstance.request(config);

        return response.data;
    }

    async get_pending_deployments_workflow_run_async(
        owner: string,
        repository_name: string,
        run_id: number,
    ): Promise<IDeployment[]> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/repos/${owner}/${repository_name}/actions/runs/${run_id}/pending_deployments`,
        };

        const response = await this.axiosInstance.request(config);

        return response.data.map(
            (deployment: IDeployment) => new Deployment(deployment),
        );
    }

    async review_pending_deployments_workflow_run_async(
        owner: string,
        repository_name: string,
        run_id: number,
        deployment_review: IReviewDeployment,
    ): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `/repos/${owner}/${repository_name}/actions/runs/${run_id}/pending_deployments`,
            data: {
                environment_ids: [deployment_review.environment_id],
                state: deployment_review.state,
                comment: deployment_review.comment ?? 'Approved in gitdashing',
            },
        };

        await this.axiosInstance.request(config);
    }
}

export default GithubClient;
