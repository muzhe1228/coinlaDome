import DataOwner from "./DataOwner";

// 聊天信息

export default class ChatInfo extends DataOwner {

    public getUserId() : number {
        return this._data.userId;
    }

    public getUserName(): string {
        return this._data.userName;
    }

    public getChatContent(): string {
        return this._data.content;
    }
}