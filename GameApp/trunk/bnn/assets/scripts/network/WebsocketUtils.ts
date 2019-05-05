import IWebSocketDelegate from "./IWebSocketDelegate";

// websocket 
export default class WebsocketUtils {
    private _websocket: WebSocket = null;
    private _url: string;
    public _delegate?: IWebSocketDelegate;

    constructor(url: string, delegate?: IWebSocketDelegate) {
        this._url = url;
        this._delegate = delegate;
    }

    // 启动websocket
    public open() : boolean {
        if (this._websocket != null) {
            return false;
        }

        this._websocket = new WebSocket(this._url);
        this.initWebSocket();
        return true;
    }

    // 关闭socket
    public close() {
        if (this._websocket != null) {
            if (this._websocket.readyState == WebSocket.OPEN) {
                // 只有已连接时才能关闭
                this._websocket.close();
            }
        }
    }

    /// 发送原始数据
    public sendRawData(data: string | ArrayBufferLike | Blob | ArrayBufferView): boolean {
        if (this._websocket == null || this._websocket.readyState != WebSocket.OPEN) {
            return false;
        }

        this._websocket.send(data);
        return true;
    }

    // 初始化websocket回调事件
    private initWebSocket() {
        this._websocket.onopen = (event) => {
            console.log("websocket open...");
            console.log(event);
            if (this._delegate && this._delegate.onSocketOpen) {
                this._delegate.onSocketOpen(this._websocket, event);
            }
        };

        this._websocket.onmessage = (event) => {
            if (this._delegate && this._delegate.onSocketMessage) {
                this._delegate.onSocketMessage(this._websocket, event);
            }
        };

        this._websocket.onerror = (event) => {
            console.log("websocket error...");
            console.log(event);

            if (this._delegate && this._delegate.onSocketError) {
                this._delegate.onSocketError(this._websocket, event);
            }
        };

        this._websocket.onclose = (event) => {
            console.log("websocket close...");
            console.log(event);

            if (this._delegate && this._delegate.onSocketClose) {
                this._delegate.onSocketClose(this._websocket, event);
            }
            // 清空websocket对象
            this._websocket = null;
            this._delegate = null;
            this._url = null;
        }
    }
}
