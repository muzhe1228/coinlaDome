import DataOwner from "./DataOwner";

// 竞庄信息

export default class BidBankerInfo extends DataOwner {

    public getBidPrice() : number {
        return this._data.currencyNumber;
    }

    public getBidderNick(): string {
        return this._data.nick;
    }

    public getBidderHeadUrl(): string {
        return this._data.head;
    }
}
