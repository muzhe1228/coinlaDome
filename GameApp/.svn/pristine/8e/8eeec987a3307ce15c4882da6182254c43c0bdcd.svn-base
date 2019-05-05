import DataOwner from "./DataOwner";

// user bet info

export default class UserBetInfo extends DataOwner {
    private betPositionItemList: UserBetPositionItem[] = [];
    
    public constructor(data: any) {
        super(data);
        
        this.betPositionItemList = [];
        for (var itemData of this._data.list) {
            let item = new UserBetPositionItem(itemData);
            this.betPositionItemList.push(item);
        }
    }

    // 获取用户信息
    public getUserId() : number {
        return parseInt(this._data.userId);
    }

    // 获取下注总资产
    public getTotalBetBalance() : number {
        return parseInt(this._data.totalBets,10)
    }

    // 获取冻结总资产
    public getFrozenBalance() : number {
        return parseInt(this._data.lockBets,10)
    }

    // 获取下注位置信息
    public getBetPositionList() : UserBetPositionItem[] {
        return this.betPositionItemList;
    }
}

// 下注位置信息
export class UserBetPositionItem extends DataOwner {

    // 当前位置总下注额
    public getTotalBets() : number {
        return this._data.positionAssets;
    }

    // 当前位置最新下注额
    public getBets() : number {
        return this._data.bets;
    }

    // 我的下注额
    public getMyBets() : number {
        return this._data.myBets;
    }

    // 位置信息: 1 2 3 三个位置
    public getPositionType() : number {
        return this._data.positionType;
    }
}