import {MovieType} from "./enums/movie.type";

export default class Play {

    private _playId: string;
    private _name: string;

    private _type: MovieType;

    constructor(playId: string, name: string, type: MovieType) {
        this._playId = playId;
        this._name = name;
        this._type = type;
    }

    get playId(): string {
        return this._playId;
    }

    set playId(value: string) {
        this._playId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): MovieType {
        return this._type;
    }

    set type(value: MovieType) {
        this._type = value;
    }
}