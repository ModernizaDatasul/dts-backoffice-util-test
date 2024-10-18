export interface IBranch {
    branchCode: string;
    branchName: string;
}

export class Branch implements IBranch {
    branchCode: string;
    branchName: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    /**
     * Getter $branchCode
     * @return {string}
     */
    public get $branchCode(): string {
        return this.branchCode;
    }

    /**
     * Getter $branchName
     * @return {string}
     */
    public get $branchName(): string {
        return this.branchName;
    }

    /**
     * Setter $branchCode
     * @param {string} value
     */
    public set $branchCode(value: string) {
        this.branchCode = value;
    }

    /**
     * Setter $branchName
     * @param {string} value
     */
    public set $branchName(value: string) {
        this.branchName = value;
    }

    static of(json: any = {}) {
        return new Branch(json);
    }

    static empty() {
        return new Branch();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IBranch> = [];

        for (const values of json) {
            items.push(new Branch(values));
        }

        return items;
    }
}

