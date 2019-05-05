<template>
  <div class="wrapper">
    <div class="header">
      <div class="leftBack" @click="BackHome">
        <img src="~assets/Images/sub_icon_back.png" alt>
        <span class="backTitle">返回</span>
      </div>
      <h1>客服</h1>
    </div>
    <div class="mainPage">
      <ScrollH :scrollToEndFlag="true" :data="dataArray">
        <div class="messageDiv" v-for="item in dataArray" :key="item.id">
          <div v-if="item.calltype === '呼出'" class="leftMessage-div">
            <p class="l-headImg">
              <img :src="`${ENV.ImageURL}systemImg/kefu.png`" alt>
            </p>
            <p class="l-img">
              <img src="~assets/Images/ServerChat/icon_infor_gray_left@3x.png" alt>
            </p>
            <div class="l-message copy">
              <p
                v-clipboard:copy="item.message"
                v-clipboard:success="onSuccess"
                v-clipboard:error="onError"
              >
                {{item.message}}
                <br>
                <span class="bottomTime">{{GetMessageTime(item.createtime)}}</span>
              </p>
            </div>
          </div>

          <div
            v-else
            class="rightMessage-div"
            v-clipboard:copy="item.message"
            v-clipboard:success="onSuccess"
            v-clipboard:error="onError"
          >
            <div class="r-message copy">
              <span>
                {{item.message}}
                <br>
                <span class="bottomTime">{{GetMessageTime(item.createtime)}}</span>
              </span>
            </div>
            <p class="r-img">
              <img src="~assets/Images/ServerChat/icon_infor_gold_right@3x.png" alt>
            </p>
            <p class="r-headImg">
              <img :src="userInfo.head" alt>
            </p>
          </div>
        </div>
      </ScrollH>
    </div>
    <div class="InputDiv">
      <input
        placeholder="请输入您的问题"
        v-model="inputValue"
        @keydown.enter="SendMessage"
        @input="changeText(inputValue)"
        @focus="changeText(inputValue)"
      >
      <!-- <i class="iconfont">&#xe681;</i> -->
      <span @click="SendMessage">发送</span>
    </div>
  </div>
</template>

<script>
import SocketIo from "common/socket.io";
import ScrollH from "components/ScrollH";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import ENV from "common/Api/ENV";
import { dateFormat } from "common/func";
export default {
  data() {
    return {
      dataArray: [],
      inputValue: "",
      messageType: "",
      socket: null, //1c1xez
      appId: "1eftbf",
      socketData: null,
      ENV: ENV.getENV(),
      canReceiveMessage: true
    };
  },
  mounted() {
    this.GetHistory();
    this.GetSocketData();
  },
  destroyed() {
    this.canReceiveMessage = false;
    if (this.socket) {
      this.socket.onclose();
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  components: { ScrollH },
  methods: {
    onSuccess() {
      this.$clickAudio();
      this.$toast("复制成功");
    },
    onError() {
      this.$clickAudio();
      this.$toast("复制失败，请点击重试");
    },
    changeText(value) {
      this.$changeInput(value);
    },
    BackHome() {
      this.canReceiveMessage = false;
      if (this.socket) {
        this.socket.onclose();
      }
      this.$clickAudio();
      this.$router.push("/index");
    },
    GetSocketData() {
      let _this = this;
      axios
        .get(this.ENV.serveChatHttp + "/im/bbpk/" + this.appId + ".html", {
          params: null
        })
        .then(function(response) {
          _this.socketData = response.data;
          _this.CreateSocket();
        })
        .catch(function(error) {});
    },

    CreateSocket() {
      this.socket = SocketIo(
        this.ENV.serveChatWS +
          "/im/user?userid=" +
          this.userInfo.userId +
          "&orgi=cskefu&session=" +
          this.socketData.sessionid +
          "&appid=" +
          this.appId +
          "&osname=&browser=&nickname=" +
          this.userInfo.nick +
          "&title=" +
          this.socketData.title +
          "&url=" +
          "window.location.href" +
          "&traceid=" +
          this.socketData.traceid,
        { transports: ["websocket", "polling"] }
      );

      this.ReceiveMessage();
    },
    //获取历史消息
    GetHistory() {
      let _this = this;
      axios
        .get(
          this.ENV.serveChatHttp +
            "/im/bbpk/history.html?appid=" +
            this.appId +
            "&orgi=" +
            "cskefu" +
            "&userid=" +
            this.userInfo.userId,
          {
            params: null
          }
        )
        .then(function(response) {
          console.log("历史消息", response.data);

          _this.dataArray = response.data.reverse();
        })
        .catch(function(error) {});
    },
    //发送消息
    async SendMessage() {
      this.$sendMessage();
      if (this.inputValue.trim().length == 0) {
        this.$toast("不能发送空白消息");
        return;
      }
      console.log(this.inputValue);
      var object = {
        message: this.inputValue,
        calltype: "呼入"
      };

      await this.socket.emit("message", {
        appid: this.appId,
        message: this.inputValue,
        orgi: "cskefu",
        session: this.socketData.sessionid,
        type: "message",
        userid: this.userInfo.userId
      });

      // this.dataArray = this.dataArray.concat(object);
      this.inputValue = "";
    },

    //接收消息
    ReceiveMessage(msg) {
      let _this = this;
      this.socket.on("message", function(data) {
        console.log("接收到socket消息", data);
        _this.dataArray = _this.dataArray.concat(data);
      });

      this.socket.on("disconnect", function() {
        console.log("连接客服失败，在线咨询服务不可用");
        // _this.$toast("连接客服失败，在线咨询服务不可用", 3000);
      });

      this.socket.on("connect", function() {
        console.log("socket连接中");
      });

      this.socket.on("agentstatus", function(data) {
        console.log(data.message);
        if (_this.canReceiveMessage) {
          _this.$toast(data.message, 3000);
        }
      });

      this.socket.on("status", function(data) {
        console.log(data.message);
        if (_this.canReceiveMessage) {
          _this.$toast(data.message, 3000);
        }
      });
    },
    // 根据时间戳获取12小时进制的日期字符串
    GetMessageTime(date) {
      var reg = /\-+/g;
      date = date.replace(reg, "/");
      let time = new Date(date).getTime(new Date(date));
      var theHour = dateFormat(time, "hh");
      if (theHour >= 0 && theHour < 13) {
        //上午
        return dateFormat(time, "MM/dd hh:mm") + " AM";
      } else {
        //下午
        return (
          dateFormat(time, "MM/dd") +
          " " +
          (theHour - 12) +
          dateFormat(time, ":mm") +
          " PM"
        );
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper {
  width: 100%;
  height: 100%;
  .header {
    height: 0.599251rem;
    width: 100%;
    background: url('../../assets/Images/sub_bg_top.png') 0 0 / 100% 100% no-repeat !important;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    h1 {
      font-size: 0.2397rem;
      color: #fefeff;
      text-shadow: #0b1239 0 2.00003px;
    }
    p {
      position: absolute;
      color: white;
      right: 0.2rem;
      img {
        width: 0.374532rem;
        height: 0.299625rem;
      }
    }
    .leftBack {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      // justify-content :flex-start;
      background: url('../../assets/Images/back_bg.png') 0 0 / 100% 100% no-repeat !important;
      height: 105%;
      width: 1.498127rem;
      img {
        margin-left: 0.179775rem;
        width: 0.374532rem;
      }
      .backTitle {
        margin-left: 0.059925rem;
        font-size: 0.224719rem;
        // font-weight: 400;
        color: #95b1d7;
      }
    }
  }
  .mainPage {
    height: calc(100% - 1.378277rem);
    width: 100%;
    .messageDiv {
      margin-top: 0.299625rem;
      min-height: 0.659176rem;
      font-size: 0.209738rem;
      .leftMessage-div {
        display: flex;
        position: relative;
        padding-right: 0.749064rem;
        .l-headImg {
          width: 0.659176rem;
          height: 0.659176rem;
          border-radius: 0.329588rem;
          margin-left: 0.224719rem;
          img {
            width: 0.659176rem;
            height: 0.659176rem;
            border-radius: 50%;
          }
        }
        .l-img {
          margin-left: 0.11985rem;
          margin-top: 0.149813rem;
          img {
            width: 0.269663rem;
            height: 0.269663rem;
          }
        }
        .l-message {
          margin-left: -0.074906rem;
          // width: 48%;
          border-radius: 0.224719rem;
          background: #aaaaaa;
          padding: 0.149813rem 0.299625rem;
          display: flex;
          align-items: center;
          span {
            word-break: break-all;
            display: inline-block;
            color: #2e2e33;
            line-height: 0.269663rem;
          }
          .bottomTime {
            color: #454545;
            font-size: 0.179775rem;
            margin-top: 0.11985rem;
          }
        }
      }
      .rightMessage-div {
        display: flex;
        position: relative;
        justify-content: flex-end;
        padding-right: 0.973783rem;
        padding-left: 0.749064rem;
        .r-headImg {
          width: 0.659176rem;
          height: 0.659176rem;
          border-radius: 0.329588rem;
          background: white;
          position: absolute;
          right: 0.224719rem;
          img {
            width: 0.659176rem;
            height: 0.659176rem;
            border-radius: 50%;
          }
        }
        .r-img {
          margin-left: -0.074906rem;
          margin-top: 0.149813rem;
          img {
            width: 0.269663rem;
            height: 0.269663rem;
          }
        }
        .r-message {
          // width: 48%;
          border-radius: 0.224719rem;
          background: #e3c877;
          padding: 0.149813rem 0.299625rem;
          display: flex;
          align-items: center;
          min-height: 0.569288rem;
          min-width: 0.749064rem;
          span {
            display: inline-block;
            color: #2e2e33;
            line-height: 0.269663rem;
            word-break: break-all;
          }
          .bottomTime {
            color: #454545;
            font-size: 0.179775rem;
            margin-top: 0.11985rem;
          }
        }
      }
    }
  }
  .InputDiv {
    height: 0.660075rem;
    width: 100%;
    background: #303769;
    display: flex;
    align-items: center;
    /* justify-content:space-between; */
    font-size: 0.209738rem;
    input {
      background: #363e76;
      width: 85%;
      height: 0.479401rem;
      border-radius: 0.2397rem;
      padding-left: 0.224719rem;
      margin-left: 0.224719rem;
      color: white;
      ::placeholder {
        color: #999999;
      }
    }
    i {
      margin-left: 0.11985rem;
      font-size: 0.299625rem;
      color: #e3c877;
    }
    span {
      margin-left: 0.11985rem;
      width: 0.958801rem;
      height: 0.359551rem;
      border-radius: 0.179775rem;
      background: #e3c877;
      color: #1d2533;
      font-size: 0.194757rem;
      line-height: 0.359551rem;
      text-align: center;
    }
  }
}
</style>
