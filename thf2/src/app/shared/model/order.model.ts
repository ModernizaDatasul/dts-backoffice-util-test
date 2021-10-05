import { IOderLine } from './order-line.model';

export interface IOrder {
    customer: number;
    ordNumber: number;
    issueDate: Date;
    ordValue: number;
    status: number;
    orderLines: Array<IOderLine>;
}

export class Order implements IOrder {
    customer: number;
    ordNumber: number;
    issueDate: Date;
    ordValue: number;
    status: number;
    orderLines: Array<IOderLine>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: IOrder): string {
        return item.customer.toString() + ';' +
            item.ordNumber.toString();
    }

    static statusLabelList(literals: {}): Array<any> {
        return [
            { value: 1, color: 'warning', label: literals['statusOrdProc'] },
            { value: 2, color: 'success', label: literals['statusOrdPay'] },
            { value: 3, color: 'danger', label: literals['statusOrdBlocked'] }
        ];
    }

    get $customer(): number { return this.customer; }
    get $ordNumber(): number { return this.ordNumber; }
    get $issueDate(): Date { return this.issueDate; }
    get $ordValue(): number { return this.ordValue; }
    get $status(): number { return this.status; }
    get $orderLines(): Array<IOderLine> { return this.orderLines; }

    set $customer(value: number) { this.customer = value; }
    set $ordNumber(value: number) { this.ordNumber = value; }
    set $issueDate(value: Date) { this.issueDate = value; }
    set $ordValue(value: number) { this.ordValue = value; }
    set $status(value: number) { this.status = value; }
    set $orderLines(value: Array<IOderLine>) { this.orderLines = value; }
}
