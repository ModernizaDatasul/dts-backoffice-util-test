export interface IContact {
    seq: number;
    name: string;
    phone: string;
}

export class Contact implements IContact {
    seq: number;
    name: string;
    phone: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: IContact): string {
        return item.seq.toString();
    }

    get $seq(): number { return this.seq; }
    set $seq(value: number) { this.seq = value; }

    get $name(): string { return this.name; }
    set $name(value: string) { this.name = value; }

    get $phone(): string { return this.phone; }
    set $phone(value: string) { this.phone = value; }
}
