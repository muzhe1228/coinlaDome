import ENV from "../APi";
export default class Socket {
  constructor(cb, opts) {
    opts = opts || {};
    this.ws = null;
    this.msgData = null;
    this.onFunc = function(){}; // 订阅的回调
    this._createSocket();
  }

  _init() {
    let _this = this;
    // console.log('初始化开始')
    this.ws.onopen = evt => {
      console.log("打开连接", evt);
    };

    this.ws.onclose = evt => {
      console.log("关闭连接", evt);
    };

    this.ws.onmessage = evt => {
      _this.onMessage(evt.data);
      // this.msgData = evt.data;
    };

    this.ws.onerror = evt => {
      console.log("错误信息", evt);
      // self.reconnect();
    };
  }

  _createSocket() {
    try {
      if ("WebSocket" in window) {
        this.ws = new WebSocket(ENV.getENV().socketApi);
        this._init();
      } else {
        console.log("您的浏览器不支持websocket");
      }
    } catch (e) {
      // this.reconnect(); // 断开重连
    }
  }
  onMessage(msg) {
    this.onFunc(msg);
  }
  on(name, cb) {
    if (name === "test") {
      this.onFunc = cb;
    }
  }
}
