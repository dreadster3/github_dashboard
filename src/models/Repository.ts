export interface IRepository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    private: boolean;
    language?: string | null;
    default_branch: string;
}

export class Repository implements IRepository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    private: boolean;
    language?: string | null;
    default_branch: string;

    constructor(data: IRepository) {
        this.id = data.id;
        this.name = data.name;
        this.full_name = data.full_name;
        this.description = data.description;
        this.private = data.private;
        this.language = data.language;
        this.default_branch = data.default_branch;
    }
}
