import { tryToParseJson } from "common/func";

class WBT {
  constructor(obj) {
    this.protocol = window.location.protocol == "http:" ? "ws://" : "wss://";
    this.host = window.location.host;
    this.port = ":8087";
    this._that = obj._this;
    //接口地址url
    this.url = obj.ip || protocol + host + port;
    //socket对象
    this.socket;
    //心跳状态  为false时不能执行操作 等待重连
    this.isHeartflag = false;
    //重连状态  避免不间断的重连操作
    this.isReconnect = false;
    this.initWs();

    this._that.$EventListener.on(
      "sendMsgSocket",
      this.sendMsgSocket.bind(this)
    );
  }

  //自定义Ws连接函数：服务器连接成功
  onopen(e) {
    this.isHeartflag = true;
    const sendData = JSON.stringify({
      userId: this._that.userId ? this._that.userId : 0,
      gameType: -1,
      roomId: -1
    });
    this.socket.send(sendData);
    this._that.$EventListener.fire("reConnect");
  }
  //自定义Ws消息接收函数：服务器向前端推送消息时触发
  onmessage(message) {
    //处理各种推送消息
    this.handleEvent(message);
  }
  //自定义Ws异常事件：Ws报错后触发
  onerror(e) {
    console.log("error");
    this.isHeartflag = false;
    this.reConnect();
  }
  //自定义Ws关闭事件：Ws连接关闭后触发
  onclose(e) {
    this.reConnect();
    console.log("close");
  }
  //初始化websocket连接
  // this.initWs();
  //初始化websocket连接
  initWs() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
      // 检测浏览器支持
      console.error("错误: 浏览器不支持websocket");
      return;
    }
    var that = this;
    this.socket = new WebSocket(this.url); // 创建连接并注册响应函数
    this.socket.onopen = function(e) {
      that.onopen(e);
    };
    this.socket.onmessage = function(e) {
      that.onmessage(e);
    };
    this.socket.onclose = function(e) {
      that.onclose(e);
      that.socket = null; // 清理
    };
    this.socket.onerror = function(e) {
      that.onerror(e);
    };
    return this;
  }
  reConnect() {
    let that = this;
    if (this.isReconnect) return;
    this.isReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function() {
      that.initWs();
      that.isReconnect = false;
    }, 2000);
  }

  //处理消息
  handleEvent({ data }) {
    const json = tryToParseJson(data);
    if (json) {
      // console.log('收到socket消息',json)
      if (json.gameType == 0) {
        this._that.$EventListener.fire("hxnnList", json);
      } else if (json.gameType == 1) {
        this._that.$EventListener.fire("hxjcGameSocket", json);
      } else if (json.gameType == 3) {
        this._that.$EventListener.fire("yydbGameSocket", json);
      }
      if (json.socketType == 1) {
        this._that.$EventListener.fire("publicMessageSocket", json);
      } else if (json.socketType == 0) {
        this._that.$EventListener.fire("blockIDSocket", json);
      } else if (json.socketType == 2) {
        this._that.$EventListener.fire("pkBalanceSocket", json);
      } else if (json.socketType == 3) {
        this._that.$EventListener.fire("openGameResult", json);
      } else if (json.socketType == 4) {
        this._that.$EventListener.fire("hxjcChatMsgSocket", json);
      } else if (json.socketType == 14) {
        this._that.$EventListener.fire("rightTopMessageAppear", json);
      }
    } else {
      if (data === "连接成功") {
        console.log(data);
      }
    }
  }
  //哈希竞猜页面的send消息
  sendMsgSocket(data) {
    const sendData = data.constructor === String ? data : JSON.stringify(data);
    this.socket.send(sendData);
  }
}
export default WBT;
