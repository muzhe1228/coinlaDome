import DataOwner from "./DataOwner";

export default class BankerProfitInfo extends DataOwner {

    // 用户ID，用于判断庄家是否是自己
    public getUserId(): number {
        return parseInt(this._data.userId);
    }

    // 是否坐满连庄数，false为中途被迫下庄
    public isFullRounds(): boolean {
        return this._data.type == 0;
    }

    // 单局最高赢的收益
    public getMaxWin(): number {
        return this._data.one || 0
    }

    // 坐庄期间的总收益
    public getProfitTotal(): string {
        return this._data.total;
    }

}