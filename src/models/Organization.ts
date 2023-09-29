export interface IOrganization {
    name: string;
    description: string;
    avatar_url: string;
}

export interface IGithubOrganization {
    login: string;
    description: string;
    avatar_url: string;
}

export class Organization implements IOrganization {
    name: string;
    description: string;
    avatar_url: string;

    constructor(organization: IGithubOrganization) {
        this.name = organization.login;
        this.description = organization.description;
        this.avatar_url = organization.avatar_url;
    }
}
