import {PerfRenderData} from "./perfRenderData";

export default interface StatementData {
    customer: string;
    performances: PerfRenderData[];
    totalAmount: number;
    totalVolumeCredits: number;
}
