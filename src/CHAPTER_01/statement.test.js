import Statement from "./service/statement";
import {invoice, plays} from './datas/data';


const result = `🧾 청구 내역 (고객명: Ash)Hamlet: $650.00 (55석)
As You Like It: $580.00 (35석)
Othello: $500.00 (40석)
총액: $1,730.00
적립포인트: $47.00점`;

test('statement ', () => {
    expect(new Statement(invoice, plays).statement()).toBe(result);
});