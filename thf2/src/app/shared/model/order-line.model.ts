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

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: IOderLine): string {
        return item.seq.toString();
    }

    get $seq(): number { return this.seq; }
    get $item(): string { return this.item; }
    get $qtd(): number { return this.qtd; }
    get $itemValue(): number { return this.itemValue; }

    set $seq(value: number) { this.seq = value; }
    set $item(value: string) { this.item = value; }
    set $qtd(value: number) { this.qtd = value; }
    set $itemValue(value: number) { this.itemValue = value; }
}
