import Performances from "./performance";
import Play from "./play";

export class RenderData extends Performances {

    play: Play;
    amount: number;
    volumeCredits: number;

    public static build(performance: Performances): RenderData {
        return new RenderData(performance.playId, performance.audience);
    }

}



