export interface ISettings {
    theme: string;
    language: string;
}

export class Settings implements ISettings {
    theme: string;
    language: string;

    constructor(settings?: ISettings) {
        this.theme = settings?.theme ?? 'default';
        this.language = settings?.language ?? 'en';
    }
}
