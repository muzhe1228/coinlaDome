<template>
  <div id="app">
    <router-view name="mainheader"></router-view>
    <router-view :num="num" :showLoading="showLoading" class="mainWrap"></router-view>
    <router-view name="mainfooter"></router-view>
    <!--夺宝 欢迎光临-开具下注-下注成功-停止下注 -->
    <audio src="./va/allClick.mp3" preload="auto" id="clickAudio"></audio>

    <!--夺宝 欢迎光临-开具下注-下注成功-停止下注 -->
    <audio src="./va/Hxjc/hxjc_welcome.mp3" preload="auto" id="db_welcomeBGM"></audio>
    <audio src="./va/Hxjc/hxjc_startGame.mp3" preload="auto" id="db_startBGM"></audio>
    <audio src="./va/Hxjc/hxjc_xiazhuSuccess.mp3" preload="auto" id="db_XiaZhuSuccessBGM"></audio>
    <audio src="./va/Hxjc/hxjc_stopXiaZhu.mp3" preload="auto" id="db_StopXiaZhuBGM"></audio>

    <!-- 欢迎光临-开具下注-下注成功-停止下注-封盘音效 -->
    <audio
      src="./va/Hxjc/hxjc_welcome.mp3"
      preload="auto"
      id="hxjc_welcomeBGM"
      ref="hxjc_welcomeBGM"
    ></audio>
    <audio src="./va/Hxjc/hxjc_startGame.mp3" preload="auto" id="hxjc_startBGM" ref="hxjc_startBGM"></audio>
    <audio
      src="./va/Hxjc/hxjc_stopXiaZhu.mp3"
      preload="auto"
      id="hxjc_StopXiaZhuBGM"
      ref="hxjc_StopXiaZhuBGM"
    ></audio>
    <audio
      src="./va/Hxjc/hxjc_xiazhuSuccess.mp3"
      preload="auto"
      id="hxjc_XiaZhuSuccessBGM"
      ref="hxjc_XiaZhuSuccessBGM"
    ></audio>

    <!-- 倒计时人声 -->
    <audio
      src="./va/Hxjc/hxjc_countdown_1.mp3"
      preload="auto"
      id="hxjc_countdown_1"
      ref="hxjc_countdown_1"
    ></audio>
    <audio
      src="./va/Hxjc/hxjc_countdown_2.mp3"
      preload="auto"
      id="hxjc_countdown_2"
      ref="hxjc_countdown_2"
    ></audio>
    <audio
      src="./va/Hxjc/hxjc_countdown_3.mp3"
      preload="auto"
      id="hxjc_countdown_3"
      ref="hxjc_countdown_3"
    ></audio>
    <audio
      src="./va/Hxjc/hxjc_countdown_4.mp3"
      preload="auto"
      id="hxjc_countdown_4"
      ref="hxjc_countdown_4"
    ></audio>
    <audio
      src="./va/Hxjc/hxjc_countdown_5.mp3"
      preload="auto"
      id="hxjc_countdown_5"
      ref="hxjc_countdown_5"
    ></audio>

    <!-- 哈希竞猜背景音乐 -->
    <audio src="./va/Hxjc/hxjc_bgm_1.mp3" preload="auto" loop id="hxjc_bgm_1"></audio>
    <audio src="./va/Hxjc/hxjc_bgm_2.mp3" preload="auto" loop id="hxjc_bgm_2"></audio>
    <audio src="./va/Hxjc/hxjc_bgm_3.mp3" preload="auto" loop id="hxjc_bgm_3"></audio>
    <audio src="./va/Hxjc/hxjc_bgm_4.mp3" preload="auto" loop id="hxjc_bgm_4"></audio>
    <audio src="./va/Hxjc/hxjc_bgm_5.mp3" preload="auto" loop id="hxjc_bgm_5"></audio>
    <audio src="./va/Hxjc/chipDown.mp3" preload="auto" id="chipDown" ref="chipDown"></audio>
    <audio src="./va/Hxjc/slideBgm.mp3" preload="auto" id="slideBgm" ref="slideBgm"></audio>

    <!-- 哈希竞猜开奖号码人声 -->
    <audio src="./va/Hxjc/1.mp3" preload="auto" id="hxjc_num_1" ref="hxjc_num_1"></audio>
    <audio src="./va/Hxjc/2.mp3" preload="auto" id="hxjc_num_2" ref="hxjc_num_2"></audio>
    <audio src="./va/Hxjc/3.mp3" preload="auto" id="hxjc_num_3" ref="hxjc_num_3"></audio>
    <audio src="./va/Hxjc/4.mp3" preload="auto" id="hxjc_num_4" ref="hxjc_num_4"></audio>
    <audio src="./va/Hxjc/5.mp3" preload="auto" id="hxjc_num_5" ref="hxjc_num_5"></audio>
    <audio src="./va/Hxjc/6.mp3" preload="auto" id="hxjc_num_6" ref="hxjc_num_6"></audio>
    <audio src="./va/Hxjc/7.mp3" preload="auto" id="hxjc_num_7" ref="hxjc_num_7"></audio>
    <audio src="./va/Hxjc/8.mp3" preload="auto" id="hxjc_num_8" ref="hxjc_num_8"></audio>
    <audio src="./va/Hxjc/9.mp3" preload="auto" id="hxjc_num_9" ref="hxjc_num_9"></audio>
    <audio src="./va/Hxjc/0.mp3" preload="auto" id="hxjc_num_0" ref="hxjc_num_0"></audio>
  </div>
</template>

<script>
import ENV from "common/Api/ENV";
import { mapGetters, mapActions, mapState } from "vuex";
import { randomNum } from "common/func";
import { timeout } from "q";
import WBT from "common/socket";
export default {
  data() {
    return {
      ENV: ENV.getENV(),
      gamemuiscs1: "",
      count: 0,
      num: 0,
      showLoading: true,
      url: this.$router.path,
      openData: null
    };
  },
  computed: {
    ...mapGetters({ userId: "getUserId" }),
    ...mapState(["localGameName", "MdToken"])
  },
  watch: {
    userId(newId) {
      this.sendSocket(newId);
      if (newId) {
        this.updatedPkNum();
      }
    },
    count(val) {
      if (val / 12 == 1) {
        this.num = (val / 12) * 100;
        this.showLoading = false;
        this.$lStore.set("startPage", "yes");
      }
    }
  },
  mounted() {
    setToken();
    if (this.$lStore.get('Token')) {
      this.updatedPkNum();
      this.sendSocket(this.userId);
    }
    this.preload();
    setTimeout(() => {
      this.showLoading = false;
    }, 2000);
    this.setSocket(this);
    this.$EventListener.on("openGameResult", this.receiveSocketMessage);
    //socket消息监听
    this.$EventListener.on("pkBalanceSocket", this.receiveSocketMessage);

    this.$EventListener.on("pkBalanceSocket", this.receiveSocketMessage);

    this.$EventListener.on("rightTopMessageAppear", this.receiveSocketMessage);
  },
  methods: {
    setSocket(that) {
      new WBT({ ip: this.ENV.gameSocketURL, _this: that });
    },
    sendSocket(userId) {
      this.$EventListener.fire("sendMsgSocket", {
        userId: userId ? userId : 0,
        gameType: -1,
        roomId: -1
      });
    },
    receiveSocketMessage(data) {
      let _this = this;
      //收到socket消息
      if (data.socketType == 3) {
        this.openData = data;
        if (data.gameType != this.localGameName && data.winBets > 0) {
          if (data.gameType != this.localGameName) {
            setTimeout(() => {
              _this.myNotify({
                content: data
              });
            }, 1000);
          }
        }
      }
      if (data.socketType == 2) {
        this.updatedPkNum(data);
      }
      if (data.socketType == 14) {
        //右上角出现消息
        setTimeout(() => {
          _this.myNotify({
            content: { message: data.message, messageType: 1 }
          });
        }, 1000);
      }
    },
    onMessage(data) {
      if (!data) return;
      //滚动金币余额
      // console.log("余额变动数据", data);
      if (data.type == 1) {
        setTimeout(() => {
          // console.log("执行延时滚动余额");
          this.updatedPkNum(data);
        }, 12000);
      } else {
        this.updatedPkNum(data);
      }
    },
    preload() {
      let inAudio = new Audio();
      let audios = [
        //        "./va/loading.mp3",
        //        "./va/main.mp3",
        "./va/allClick.mp3",
        "./va/clickGame.mp3",
        "./va/chip.mp3",
        "./va/err.mp3",
        //        "./va/Hxjc.mp3",
        //        "./va/Yydb.mp3",
        "./va/win.mp3",
        "./va/lose.mp3",
        "./va/sendMsg.mp3",
        "./va/time.mp3"
      ];
      for (let audio of audios) {
        inAudio.src = audio;
        inAudio.addEventListener("canplaythrough", () => {
          this.count++;
          // alert(1)
        });
      }
    },
    ...mapActions(["updatedPkNum"])
  }
};
</script>

<style lang="stylus" scoped>
#app {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('./assets/Images/bg@3.jpg') 0 0 / 100% 100% no-repeat;
  .mainWrap {
    flex: 1;
    // overflow-y: scroll;
  }
}
</style>
