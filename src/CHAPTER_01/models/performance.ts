export default class Performances {
    private _playId: string;
    private _audience: number;

    constructor(playId: string, audience: number) {
        this._playId = playId;
        this._audience = audience;
    }

    get playId(): string {
        return this._playId;
    }

    set playId(value: string) {
        this._playId = value;
    }

    get audience(): number {
        return this._audience;
    }

    set audience(value: number) {
        this._audience = value;
    }
}