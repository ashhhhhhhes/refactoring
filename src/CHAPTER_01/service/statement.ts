import {MovieType} from "../models/enums/movie.type";
import Invoice from "../models/invoice";
import Plays from "../models/plays";
import Play from "../models/play";
import Performances from "../models/performance";

function amountFor(play: Play, perf: Performances) {
    let thisAmount: number = 0;

    switch (play.type) {
        case MovieType.TRAGEDY:
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case MovieType.COMEDY:
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return thisAmount;
}

export function statement(invoice: Invoice, plays: Plays) {

    let totalAmount = 0;
    let volumeCredits = 0;

    let result = `🧾 청구 내역 (고객명: ${invoice.customer})`;

    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
        const play = plays.find(perf.playId);

        let thisAmount = amountFor(play, perf);

        // 포인트 적립.
        volumeCredits += Math.max(perf.audience - 30, 0);

        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if (MovieType.COMEDY === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // 청구 내역을 출력한다.
        result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립포인트: ${format(volumeCredits)}점`;

    return result;
}


