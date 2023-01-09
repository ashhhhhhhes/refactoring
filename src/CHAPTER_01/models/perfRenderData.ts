import Performances from "./performance";
import Play from "./play";

export class PerfRenderData extends Performances {

    play: Play;
    amount: number;
    volumeCredits: number;

    public static copy(performance: Performances): PerfRenderData {
        return new PerfRenderData(performance.playId, performance.audience);
    }

}



