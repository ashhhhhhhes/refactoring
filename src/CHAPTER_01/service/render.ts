import Plays from "../models/plays";
import Performances from "../models/performance";
import {MovieType} from "../models/enums/movie.type";

export class Render {

    private _customer: string;
    private _performances: any[];

    private _plays: Plays;

    constructor(customer: string, performances: any[], plays: Plays) {
        this._customer = customer;
        this._performances = performances;
        this._plays = plays;
    }

    get customer(): string {
        return this._customer;
    }

    set customer(value: string) {
        this._customer = value;
    }

    get performances(): any[] {
        return this._performances;
    }

    set performances(value: any[]) {
        this._performances = value;
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

    private playFor(perf: Performances) {
        return this._plays.find(perf.playId);
    }

    private volumeCreditsFor(perf: Performances) {
        let volumeCredits: number = 0;

        volumeCredits += Math.max(perf.audience - 30, 0);

        if (MovieType.COMEDY === this.playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        return volumeCredits;
    }

    private usd(aNumber: number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber);
    }

    private totalVolumeCredits() {
        let volumeCredits = 0;

        for (let perf of this.performances) {
            volumeCredits += this.volumeCreditsFor(perf);
        }

        return volumeCredits;
    }

    private totalAmount() {
        let totalAmount = 0;
        for (let perf of this.performances) {
            totalAmount += this.amountFor(perf);
        }
        return totalAmount;
    }

    public renderPlainText(): string {
        let result = `🧾 청구 내역 (고객명: ${this.customer})`;

        for (let perf of this.performances) {

            // 청구 내역을 출력한다.
            result += `${this.playFor(perf).name}: ${this.usd(this.amountFor(perf) / 100)} (${perf.audience}석)\n`;

        }

        result += `총액: ${this.usd(this.totalAmount() / 100)}\n`;
        result += `적립포인트: ${this.totalVolumeCredits()}점`;

        return result;
    }

}


export default (data: { customer: string, performances: any[] }, plays: Plays) => new Render(data.customer, data.performances, plays);