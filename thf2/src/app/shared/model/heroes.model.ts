export interface IHeroes {
    value: number;
    label: string;
    nickname: string;
    email: string;
    salary: number;
    image: string;
}

export class Heroes implements IHeroes {
    value: number;
    label: string;
    nickname: string;
    email: string;
    salary: number;
    image: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    public get $value(): number { return this.value; }
    public set $value(value: number) { this.value = value; }

    public get $label(): string { return this.label; }
    public set $label(value: string) { this.label = value; }

    public get $nickname(): string { return this.nickname; }
    public set $nickname(value: string) { this.nickname = value; }

    public get $email(): string { return this.email; }
    public set $email(value: string) { this.email = value; }

    public get $salary(): number { return this.salary; }
    public set $salary(value: number) { this.salary = value; }

    public get $image(): string { return this.image; }
    public set $image(value: string) { this.image = value; }

    static of(json: object = {}) {
        return new Heroes(json);
    }

    static empty() {
        return new Heroes();
    }

    static fromJson(json: object[] = []) {

        const items: IHeroes[] = [];

        for (const values of json) {
            items.push(new Heroes(values));
        }

        return items;
    }
}

