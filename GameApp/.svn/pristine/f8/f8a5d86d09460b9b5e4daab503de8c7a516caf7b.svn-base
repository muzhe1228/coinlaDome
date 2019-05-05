import { GameType } from "./GameType";
import DataOwner from "./DataOwner";

/**
 * 牛牛开奖结果
 */
//@Model("SocketType=3")
export class GameResult extends DataOwner {
    
    public getRoomId() : number {
        return parseInt(this._data.roomId);
    }

    public getGameType() : GameType {
        return parseInt(this._data.gameType);
    }

    // 本局收益（无该字段则表示未参与游戏）
    public getRoundProfit() : number {
        return this._data.winBets;
    }

    public getUserId() : number {
        return parseInt(this._data.userId);
    }

    // 每个位置的牌，示例：'ae42c'
    public getBankerCards() : string {
        return this._data.cardBanker;
    }

    public getXian1Cards() : string {
        return this._data.cardSky;
    }

    public getXian2Cards() : string {
        return this._data.cardLand;
    }

    public getXian3Cards() : string {
        return this._data.cardMysterious;
    }

    // 每个位置的牛几结果
    public getBankerNiu() : string {
        return this._data.niuBanker;
    }

    public getXian1Niu() : string {
        return this._data.niuSky;
    }

    public getXian2Niu() : string {
        return this._data.niuLand;
    }

    public getXian3Niu() : string {
        return this._data.niuMysterious;
    }

    // 如果自己有下注，这三个字段返回在每个闲家的收益，不下注没有字段
    public getXian1Profit() : number {
        return this._data.winSky;
    }

    public getXian2Profit() : number {
        return this._data.winLand;
    }

    public getXian3Profit() : number {
        return this._data.winMysterious;
    }

    // 三个闲家的赔率，正是闲输，负是闲赢，数字代表赢输几倍（平倍房间也是几倍）
    public getXian1Odd() : number {
        return this._data.oddSky;
    }

    public getXian2Odd() : number {
        return this._data.oddLand;
    }

    public getXian3Odd () {
        return this._data.oddMysterious;
    }

    public getRemainTime () {
        return (this._data.time - this._data.serviceTime) / 1000;
    }

    public bankerAllWin(): boolean {
        return this.getXian1Odd() > 0
            && this.getXian2Odd() > 0
            && this.getXian3Odd() > 0;
    }

    public xian1Win(): boolean {
        return this.getXian1Odd() < 0
    }

    public xian2Win(): boolean {
        return this.getXian2Odd() < 0
    }

    public xian3Win(): boolean {
        return this.getXian3Odd() < 0
    }

}
