import DataOwner from "./DataOwner";

export default class BankerRecordInfo extends DataOwner {

    // 是否产生了收益，代表这一局已经结束
    public hasProfit(): boolean {
        return this._data.isStart == 0;
    }

    // 第几局
    public getRound(): number {
        return parseInt(this._data.number)
    }

    // 收益
    public getProfit(): number {
        return this._data.bets;
    }

}