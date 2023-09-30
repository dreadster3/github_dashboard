export interface IBranch {
    name: string;
}

class Branch implements IBranch {
    name: string;

    constructor(branch: IBranch) {
        this.name = branch.name;
    }
}

export default Branch;
