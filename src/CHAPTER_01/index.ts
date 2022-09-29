import {statement} from "./service/statement";
import Invoice from "./models/invoice";
import Plays from "./models/plays";
import Play from "./models/play";
import {MovieType} from "./models/enums/movie.type";
import Performances from "./models/performance";

const invoice: Invoice = new Invoice();
invoice.performances = [
    new Performances("hamlet", 55),
    new Performances("as-like", 35),
    new Performances("othello", 40),
];

invoice.customer = "Ash";

const plays: Plays = new Plays();
plays.put(new Play("hamlet", "Hamlet", MovieType.TRAGEDY));
plays.put(new Play("as-like", "As You Like It", MovieType.COMEDY));
plays.put(new Play("othello", "Othello", MovieType.TRAGEDY));


// * print Invoice.
console.log(statement(invoice, plays));

