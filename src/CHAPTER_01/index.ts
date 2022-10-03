import Statement from "./service/statement";
import {invoice, plays} from './datas/data';

// * print Invoice.
console.log(new Statement(invoice, plays).statement());

