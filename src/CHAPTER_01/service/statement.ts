import Invoice from "../models/invoice";
import Plays from "../models/plays";
import render from "./render";


export default class Statement {

    private _invoice: Invoice;

    private _plays: Plays;


    constructor(invoice: Invoice, plays: Plays) {
        this._invoice = invoice;
        this._plays = plays;

    }

    get invoice(): Invoice {
        return this._invoice;
    }

    set invoice(value: Invoice) {
        this._invoice = value;
    }

    get plays(): Plays {
        return this._plays;
    }

    set plays(value: Plays) {
        this._plays = value;
    }

    public statement(): string {
        return render(this.invoice, this.plays).renderPlainText();
    }


}


