import {MovieType} from "../models/enums/movie.type";
import Invoice from "../models/invoice";
import Plays from "../models/plays";
import Performances from "../models/performance";


export default class statement {

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

    public amountFor(aPerformance: Performances) {
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


    public playFor(perf: Performances) {
        return this._plays.find(perf.playId);
    }

    public forStatement() {
        let totalAmount = 0;
        let volumeCredits = 0;

        let result = `🧾 청구 내역 (고객명: ${this.invoice.customer})`;

        const format = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format;

        for (let perf of this.invoice.performances) {

            let thisAmount = this.amountFor(perf);

            // 포인트 적립.
            volumeCredits += Math.max(perf.audience - 30, 0);

            // 희극 관객 5명마다 추가 포인트를 제공한다.
            if (MovieType.COMEDY === this.playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

            // 청구 내역을 출력한다.
            result += `${this.playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
            totalAmount += thisAmount;
        }

        result += `총액: ${format(totalAmount / 100)}\n`;
        result += `적립포인트: ${format(volumeCredits)}점`;

        return result;
    }
}


