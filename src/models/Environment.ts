export interface IEnvironment {
    id: number;
    name: string;
}

class Environment implements IEnvironment {
    public id: number;
    public name: string;

    constructor(environment: IEnvironment) {
        this.id = environment.id;
        this.name = environment.name;
    }
}

export default Environment;
