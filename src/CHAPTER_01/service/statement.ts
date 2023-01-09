import Invoice from "../models/invoice";
import Plays from "../models/plays";
import render from "./render";
import Performances from "../models/performance";
import {PerfRenderData} from "../models/perfRenderData";
import {MovieType} from "../models/enums/movie.type";
import StatementData from "../models/StatementData";


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

    private amountFor(aPerformance: Performances) {
        let result: number = 0;

        switch (this.playFor(aPerformance).type) {
            case MovieType.TRAGEDY:
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case MovieType.COMEDY:
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${this.playFor(aPerformance).type}`);
        }
        return result;
    }

    private volumeCreditsFor(perf: Performances) {
        let volumeCredits: number = 0;

        volumeCredits += Math.max(perf.audience - 30, 0);

        if (MovieType.COMEDY === this.playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        return volumeCredits;
    }

    private totalVolumeCredits(data: StatementData) {
        return data.performances.reduce((volumeCredits: number, p: any) => volumeCredits + p.volumeCredits, 0);
    }

    private totalAmount(data: StatementData) {
        return data.performances.reduce((total: number, p: any) => total + p.amount, 0);
    }

    private playFor(perf: Performances) {
        return this._plays.find(perf.playId);
    }

    private enrichPerformance(aPerformance: Performances): PerfRenderData {

        const result = PerfRenderData.copy(aPerformance);
        result.play = this.playFor(aPerformance);
        result.amount = this.amountFor(aPerformance);
        result.volumeCredits = this.volumeCreditsFor(aPerformance);

        return result;
    }

    public statement(): string {
        const statementData: StatementData = {
            customer: null,
            performances: null,
            totalAmount: null,
            totalVolumeCredits: null
        };
        statementData.customer = this.invoice.customer;
        statementData.performances = this.invoice.performances.map((perf) => this.enrichPerformance(perf));
        statementData.totalAmount = this.totalAmount(statementData);
        statementData.totalVolumeCredits = this.totalVolumeCredits(statementData);

        return render(statementData).renderPlainText();
    }


}


