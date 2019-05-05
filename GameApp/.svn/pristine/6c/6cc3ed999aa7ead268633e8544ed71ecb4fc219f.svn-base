import DataOwner from "./DataOwner";

// 充值接口数据

export default class RechargeInfo extends DataOwner {

    public getProportion(): number {
        return parseInt(this._data.convertPk);
    }

    public getAddress() : string {
        return this._data.rechargeAddress;
    }

    public getLimit(): number {
        return parseFloat(this._data.rechargeLimit);
    }
}