export interface IOderLine {
    seq: number;
    item: string;
    qtd: number;
    itemValue: number;
}

export class OderLine implements IOderLine {
    seq: number;
    item: string;
    qtd: number;
    itemValue: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: IOderLine): string {
        return item.seq.toString();
    }

    get $seq(): number { return this.seq; }
    set $seq(value: number) { this.seq = value; }

    get $item(): string { return this.item; }
    set $item(value: string) { this.item = value; }

    get $qtd(): number { return this.qtd; }
    set $qtd(value: number) { this.qtd = value; }

    get $itemValue(): number { return this.itemValue; }
    set $itemValue(value: number) { this.itemValue = value; }
}
