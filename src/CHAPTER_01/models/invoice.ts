import Performances from "./performance";

export default class Invoice {

    private _customer: string;

    private _performances: Performances[];

    get customer(): string {
        return this._customer;
    }

    set customer(value: string) {
        this._customer = value;
    }

    get performances(): Performances[] {
        return this._performances;
    }

    set performances(value: Performances[]) {
        this._performances = value;
    }
}
