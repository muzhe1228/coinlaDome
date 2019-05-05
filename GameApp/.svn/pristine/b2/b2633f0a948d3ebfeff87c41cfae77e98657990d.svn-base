import SocketType from "../model/SocketType";

/**
 * websocket 代理
 */
export default interface IWebSocketDelegate {
    onSocketOpen?(socket: WebSocket, event: Event) : void;
    onSocketMessage?(socket: WebSocket, event: MessageEvent) : void;
    onSocketClose?(socket: WebSocket, event: CloseEvent) : void;
    onSocketError?(socket: WebSocket, event: Event) : void;

    /**
     * 返回游戏数据
     * @param socketType 游戏数据类型
     * @param data 游戏数据, 向下转化成需要的数据
     */
    onGameData?<T extends SocketType>(socketType: number, data: T) : void
}
