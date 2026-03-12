import { IContact } from './contact.model';
import { DtsLabel } from 'dts-backoffice-kendo-grid';

export interface ICustomer {
    code: number;
    codeIdenf: string;
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
    contacts: IContact[];
    department: string;
    federalID: string;
    observation: string;
}

export class Customer implements ICustomer {
    code = 0;
    codeIdenf = '';
    internalId = 0;
    shortName = '';
    name = '';
    country = '';
    status = 0;
    tax = false;
    taxValue = 0;
    percent = 0;
    admissDate = new Date();
    resignationDate = new Date();
    states = '';
    contacts: IContact[] = [];
    department = '';
    federalID = '';
    observation = '';

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: ICustomer): string {
        return item.code.toString();
    }

    static statusLabelList(literals: Record<string, string>): DtsLabel[] {
        return [
            { value: 1, label: literals['active'], color: 'color-11' },
            { value: 2, label: literals['inactive'], color: 'color-07' },
            { value: 3, label: literals['blocked'], color: 'color-08' }
        ];
    }

    static statesSubtitleList(literals: Record<string, string>): DtsLabel[] {
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
    set $code(value: number) { this.code = value; }

    get $codeIdenf(): string { return this.codeIdenf; }
    set $codeIdenf(value: string) { this.codeIdenf = value; }

    get $internalId(): number { return this.internalId; }
    set $internalId(value: number) { this.internalId = value; }

    get $shortName(): string { return this.shortName; }
    set $shortName(value: string) { this.shortName = value; }

    get $name(): string { return this.name; }
    set $name(value: string) { this.name = value; }

    get $country(): string { return this.country; }
    set $country(value: string) { this.country = value; }

    get $status(): number { return this.status; }
    set $status(value: number) { this.status = value; }

    get $tax(): boolean { return this.tax; }
    set $tax(value: boolean) { this.tax = value; }

    get $taxValue(): number { return this.taxValue; }
    set $taxValue(value: number) { this.taxValue = value; }

    get $percent(): number { return this.percent; }
    set $percent(value: number) { this.percent = value; }

    get $admissDate(): Date { return this.admissDate; }
    set $admissDate(value: Date) { this.admissDate = value; }

    get $resignationDate(): Date { return this.resignationDate; }
    set $resignationDate(value: Date) { this.resignationDate = value; }

    get $states(): string { return this.states; }
    set $states(value: string) { this.states = value; }

    get $contacts(): IContact[] { return this.contacts; }
    set $contacts(value: IContact[]) { this.contacts = value; }

    get $department(): string { return this.department; }
    set $department(value: string) { this.department = value; }

    get $federalID(): string { return this.federalID; }
    set $federalID(value: string) { this.federalID = value; }

    get $observation(): string { return this.observation; }
    set $observation(value: string) { this.observation = value; }
}
