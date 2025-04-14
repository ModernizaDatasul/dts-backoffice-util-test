export interface IBranch {
    branchCode: string;
    branchName: string;
}

export class Branch implements IBranch {
    branchCode: string;
    branchName: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    public get $branchCode(): string { return this.branchCode; }
    public set $branchCode(value: string) { this.branchCode = value; }

    public get $branchName(): string { return this.branchName; }
    public set $branchName(value: string) { this.branchName = value; }

    static of(json: object = {}) {
        return new Branch(json);
    }

    static empty() {
        return new Branch();
    }

    static fromJson(json: object[] = []) {

        const items: IBranch[] = [];

        for (const values of json) {
            items.push(new Branch(values));
        }

        return items;
    }
}

