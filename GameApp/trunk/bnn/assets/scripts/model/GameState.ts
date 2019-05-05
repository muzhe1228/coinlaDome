import DataOwner from "./DataOwner";

export enum EnumGameState {
    StartBet = 0,
    StopBet = 1,
    Result = 2, 
    BidBanker = 3,
    BecomeBanker = 4,
    CreatePosition = 5
}

export default class GameState extends DataOwner {

    public getStatus() : EnumGameState {
        return this._data.state;
    }

    public getFinishTime() : number {
        return this._data.time;
    }

    public getServerTime() : number {
        return this._data.serviceTime;
    }
}
