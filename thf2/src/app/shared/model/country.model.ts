export interface ICountry {
    countryCode: string;
    countryName: string;
}

export class Country implements ICountry {
    countryCode: string;
    countryName: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static getInternalId(item: ICountry): string {
        return item.countryCode;
    }

    get $countryCode(): string { return this.countryCode; }
    set $countryCode(value: string) { this.countryCode = value; }

    get $countryName(): string { return this.countryName; }
    set $countryName(value: string) { this.countryName = value; }
}
