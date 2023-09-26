export interface ISettings {
    theme: string;
    language: string;
    organization: string;
    repository: string;
}

export class Settings implements ISettings {
    theme: string;
    language: string;
    organization: string;
    repository: string;

    constructor(settings?: ISettings) {
        this.theme = settings?.theme ?? 'default';
        this.language = settings?.language ?? 'en';
        this.organization = settings?.organization ?? '';
        this.repository = settings?.repository ?? '';
    }
}
