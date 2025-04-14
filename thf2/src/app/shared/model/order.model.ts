import { PoTableColumnLabel } from '@po-ui/ng-components';
import { IOderLine } from './order-line.model';

export interface IOrder {
    customer: number;
    ordNumber: number;
    issueDate: Date;
    ordValue: number;
    status: number;
    orderLines: IOderLine[];
}

export class Order implements IOrder {
    customer: number;
    ordNumber: number;
    issueDate: Date;
    ordValue: number;
    status: number;
    orderLines: IOderLine[];

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: IOrder): string {
        return item.customer.toString() + ';' +
            item.ordNumber.toString();
    }

    static statusLabelList(literals: Record<string, string>): PoTableColumnLabel[] {
        return [
            { value: 1, color: 'warning', label: literals['statusOrdProc'] },
            { value: 2, color: 'success', label: literals['statusOrdPay'] },
            { value: 3, color: 'danger', label: literals['statusOrdBlocked'] }
        ];
    }

    get $customer(): number { return this.customer; }
    set $customer(value: number) { this.customer = value; }

    get $ordNumber(): number { return this.ordNumber; }
    set $ordNumber(value: number) { this.ordNumber = value; }

    get $issueDate(): Date { return this.issueDate; }
    set $issueDate(value: Date) { this.issueDate = value; }

    get $ordValue(): number { return this.ordValue; }
    set $ordValue(value: number) { this.ordValue = value; }

    get $status(): number { return this.status; }
    set $status(value: number) { this.status = value; }

    get $orderLines(): IOderLine[] { return this.orderLines; }
    set $orderLines(value: IOderLine[]) { this.orderLines = value; }
}
