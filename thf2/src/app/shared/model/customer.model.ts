import { IContact } from './contact.model';
import { DtsLabel } from 'dts-backoffice-kendo-grid';

export interface ICustomer {
    code: number;
    internalId: number;
    shortName: string;
    name: string;
    country: string;
    status: number;
    tax: boolean;
    taxValue: number;
    percent: number;
    admissDate: Date;
    resignationDate: Date;
    states: string;
    contacts: Array<IContact>;
    department: string;
}

export class Customer implements ICustomer {
    code: number;
    internalId: number;
    shortName: string;
    name: string;
    country: string;
    status: number;
    tax: boolean;
    taxValue: number;
    percent: number;
    admissDate: Date;
    resignationDate: Date;
    states: string;
    contacts: Array<IContact>;
    department: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: ICustomer): string {
        return item.code.toString();
    }

    static statusLabelList(literals: {}): Array<DtsLabel> {
        return [
            { value: 1, label: literals['active'], color: 'color-11' },
            { value: 2, label: literals['inactive'], color: 'color-07' },
            { value: 3, label: literals['blocked'], color: 'color-08' }
        ];
    }

    static statesSubtitleList(literals: {}): Array<DtsLabel> {
        return [
            { value: 'RS', label: literals['rsTag'], color: 'color-01', tooltip: literals['rsDesc'] },
            { value: 'SC', label: literals['scTag'], color: 'color-05', tooltip: literals['scDesc'] },
            { value: 'PR', label: literals['prTag'], color: 'color-09', tooltip: literals['prDesc'] },
            { value: 'SP', label: literals['spTag'], color: 'color-12', tooltip: literals['spDesc'] },
            { value: 'RJ', label: literals['rjTag'], color: 'color-08', tooltip: literals['rjDesc'] },
            { value: 'BH', label: literals['bhTag'], color: 'color-03', tooltip: literals['bhDesc'] }
        ];
    }

    get $code(): number { return this.code; }
    get $internalId(): number { return this.internalId; }
    get $shortName(): string { return this.shortName; }
    get $name(): string { return this.name; }
    get $country(): string { return this.country; }
    get $status(): number { return this.status; }
    get $tax(): boolean { return this.tax; }
    get $taxValue(): number { return this.taxValue; }
    get $percent(): number { return this.percent; }
    get $admissDate(): Date { return this.admissDate; }
    get $resignationDate(): Date { return this.resignationDate; }
    get $states(): string { return this.states; }
    get $contacts(): Array<IContact> { return this.contacts; }
    get $department(): string { return this.department; }

    set $code(value: number) { this.code = value; }
    set $internalId(value: number) { this.internalId = value; }
    set $shortName(value: string) { this.shortName = value; }
    set $name(value: string) { this.name = value; }
    set $country(value: string) { this.country = value; }
    set $status(value: number) { this.status = value; }
    set $tax(value: boolean) { this.tax = value; }
    set $taxValue(value: number) { this.taxValue = value; }
    set $percent(value: number) { this.percent = value; }
    set $admissDate(value: Date) { this.admissDate = value; }
    set $resignationDate(value: Date) { this.resignationDate = value; }
    set $states(value: string) { this.states = value; }
    set $contacts(value: Array<IContact>) { this.contacts = value; }
    set $department(value: string) { this.department = value; }
}
