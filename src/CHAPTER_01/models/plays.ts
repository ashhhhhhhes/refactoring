import Play from "./play";

export default class Plays {

    private _plays: Play[] = [];

    find(playId: string): Play {
        return this._plays.find((play) => play.playId === playId);
    }

    put(play: Play) {
        this._plays.push(play);
    }

}