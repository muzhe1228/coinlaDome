import DataOwner from "./DataOwner";

// 用户信息

export default class UserInfo extends DataOwner {

    public getNickname() : string {
        return this._data.nick;
    }

    public getHeadUrlPath(): string {
        return this._data.head;
    }
}