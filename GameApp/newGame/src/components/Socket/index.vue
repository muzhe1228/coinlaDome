<template>
  <div v-show="false">WebSocket React Component by KyuuSeiryuu.</div>
</template>

<script>
import { tryToParseJson } from "common/func";
import { send } from "q";
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    protocol: {
      type: String
    },
    onMessage: {
      type: Function,
      required: true
    },
    onJson: {
      type: Function,
      default: data => {
        console.log(data);
      }
    },
    onCreate: {
      type: Function,
      default: data => {
        console.log(data);
      }
    },
    onClose: {
      type: Function,
      default: data => {
        console.log(data);
      }
    },
    onError: {
      type: Function,
      default: data => {
        console.log(data);
      }
    },
    onRetry: {
      type: Function,
      default: data => {
        console.log(data);
      }
    },
    actionMap: {
      type: Object,
      default: () => {}
    },
    actionKey: {
      type: String,
      default: "SYS_ACTION"
    },
    autoReconnect: {
      type: Boolean,
      default: true
    },
    maxRetryTimes: {
      type: Number,
      default: 3000
    },
    retryDelay: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      shouldClose: false,
      retryTimes: 1,
      ws: null
    };
  },

  mounted() {
    this.initWebSocket();
  },
  destroyed() {
    if (this.ws) {
      this.shouldClose = true;
      this.ws.close();
      console.log("onClocss");
    }
  },

  components: {},
  methods: {
    initWebSocket() {
      console.log("11111111111111111111111111111111111111111111111111");
      if ("WebSocket" in window) {
        this.closeOldSocket();
        const ws = new WebSocket(this.url, this.protocol);
        setTimeout(() => {
          ws.close();
          console.log(
            "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
          );
        }, 10000);
        ws.onclose = err => {
          console.log("00000000000000000000000000000000000000000000");
          if (
            !this.autoReconnect || // needn't reconnect
            this.shouldClose || // really want to close
            this.retryTimes++ > this.maxRetryTimes
          ) {
            console.log("22222222222222222222222222222222222222222222222");
            this.onClose(err);
            return;
          }
          this.props.onRetry();
          setTimeout(() => {
            this.initWebSocket();
          }, this.retryDelay);
        };
        ws.onerror = e => {
          this.onError(e);
          console.log("socket连接错误", e);
          ws.close();
        };
        ws.onmessage = this.handleMessage;
        const decorator = {
          send(data) {
            console.log(data);
            const sendData =
              data.constructor === String ? data : JSON.stringify(data);
            ws.send(sendData);
          }
        };
        this.$EventListener.on("sendMsgSocket", data => {
          const sendData =
            data.constructor === String ? data : JSON.stringify(data);
          ws.send(sendData);
        });

        ws.onopen = () => {
          this.retryTimes = 1;
          this.ws = ws;
          this.onCreate(decorator, ws);
        };
      } else {
        // 浏览器不支持 WebSocket
        this.$toast("您的浏览器不支持 WebSocket!");
      }
    },
    closeOldSocket() {
      if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
        this.shouldClose = true;
        this.ws.close();
      }
    },
    handleMessage({ data }) {
      const json = tryToParseJson(data);
      let _this = this;
      if (json) {
        // console.log('收到socket消息',json)
        _this.onMessage(json);
        if (json.gameType == 1) {
          this.$EventListener.fire("hxjcGameSocket", json);
        } else if (json.gameType == 3) {
          this.$EventListener.fire("yydbGameSocket", json);
        }

        if (json.socketType == 1) {
          this.$EventListener.fire("publicMessageSocket", json);
        } else if (json.socketType == 0) {
          this.$EventListener.fire("blockIDSocket", json);
        } else if (json.socketType == 2) {
          this.$EventListener.fire("pkBalanceSocket", json);
        } else if (json.socketType == 3) {
          this.$EventListener.fire("openGameResult", json);
        } else if (json.socketType == 4) {
          this.$EventListener.fire("hxjcChatMsgSocket", json);
        }
      } else {
        if (data === "连接成功") {
          console.log(data);
        } else {
          _this.onMessage(data);
        }
      }
    },
    send(data) {
      console.log(data);
    }
  }
};
</script>
