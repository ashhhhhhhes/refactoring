import statement from "./service/statement";
import {invoice, plays} from './datas/data';

// * print Invoice.
console.log(new statement(invoice, plays).forStatement());

