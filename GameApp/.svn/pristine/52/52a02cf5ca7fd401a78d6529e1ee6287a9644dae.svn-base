import SocketType from "./SocketType";
import { Model } from "../utils/ModelDecorator";
import DataOwner from "./DataOwner";

// 人数头像
//@Model("SocketType=7")
export default class PlayerHeader extends DataOwner {

    private headerItemList : HeaderItem[] = [];

    public constructor(data: any) {
        super(data);

        this.headerItemList = [];
        if (this._data.headList != null) {
            for (var itemData of this._data.headList) {
                let item = new HeaderItem(itemData);
                this.headerItemList.push(item);
            }
        }
    }

    public getPlayerNum() : number {
        return this._data.peopleNum;
    }

    public GetType() : number {
        return this._data.type;
    }

    public getPlayerHeadList() : HeaderItem[] {
        return this.headerItemList;
    }

    public getHeadUrlPath() : string {
        return this._data.head;
    }
}

export class HeaderItem extends DataOwner {

    public getHeadUrlPath() : string {
        return this._data.head;
    }
}