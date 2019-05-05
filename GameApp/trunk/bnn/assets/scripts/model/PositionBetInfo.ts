import SocketType from "./SocketType";

/**
 * 位置金额
 */
export default class PositionBetInfo extends SocketType {
    public positionType: number;
    public positionAssets: number;
    public pkMaxBets: number;
    public myBets: number;
    public bets: number;
    public userId: number;
    public type: number;
}
