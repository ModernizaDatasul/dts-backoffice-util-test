export interface IContact {
    seq: number;
    name: string;
    phone: string;
}

export class Contact implements IContact {
    seq: number;
    name: string;
    phone: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: IContact): string {
        return item.seq.toString();
    }

    get $seq(): number { return this.seq; }
    get $name(): string { return this.name; }
    get $phone(): string { return this.phone; }

    set $seq(value: number) { this.seq = value; }
    set $name(value: string) { this.name = value; }
    set $phone(value: string) { this.phone = value; }
}
