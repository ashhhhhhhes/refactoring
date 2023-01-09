import {PerfRenderData} from "../models/perfRenderData";

export class Render {

    private _customer: string;
    private _performances: any[];
    private _totalAmount: number;
    private _totalVolumeCredits: number;

    constructor() {
    }

    get customer(): string {
        return this._customer;
    }

    set customer(value: string) {
        this._customer = value;
    }

    get performances(): PerfRenderData[] {
        return this._performances;
    }

    set performances(value: any[]) {
        this._performances = value;
    }

    get totalAmount(): number {
        return this._totalAmount;
    }

    set totalAmount(value: number) {
        this._totalAmount = value;
    }

    get totalVolumeCredits(): number {
        return this._totalVolumeCredits;
    }

    set totalVolumeCredits(value: number) {
        this._totalVolumeCredits = value;
    }

    public static builder(): RenderBuilder {
        return new RenderBuilder();
    }

    private usd(aNumber: number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber);
    }


    public renderPlainText(): string {
        let result = `🧾 청구 내역 (고객명: ${this.customer})`;

        for (let perf of this.performances) {

            // 청구 내역을 출력한다.
            result += `${perf.play.name}: ${this.usd(perf.amount / 100)} (${perf.audience}석)\n`;

        }

        result += `총액: ${this.usd(this.totalAmount / 100)}\n`;
        result += `적립포인트: ${this.totalVolumeCredits}점`;

        return result;
    }


}

export class RenderBuilder {

    private _customer: string;
    private _performances: any[];
    private _totalAmount: number;
    private _totalVolumeCredits: number;

    customer(value: string): RenderBuilder {
        this._customer = value;
        return this;
    }

    performances(value: any[]): RenderBuilder {
        this._performances = value;
        return this;
    }

    totalAmount(value: number): RenderBuilder {
        this._totalAmount = value;
        return this;
    }

    totalVolumeCredits(value: number): RenderBuilder {
        this._totalVolumeCredits = value;
        return this;
    }

    build() {
        const render = new Render();
        render.customer = this._customer;
        render.performances = this._performances;
        render.totalAmount = this._totalAmount;
        render.totalVolumeCredits = this._totalVolumeCredits;

        return render;
    }
}

export default (data: { customer: string, performances: any[], totalAmount: number, totalVolumeCredits: number }) =>
    Render.builder()
        .customer(data.customer)
        .performances(data.performances)
        .totalAmount(data.totalAmount)
        .totalVolumeCredits(data.totalVolumeCredits)
        .build();