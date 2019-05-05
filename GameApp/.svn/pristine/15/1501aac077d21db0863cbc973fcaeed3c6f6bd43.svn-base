<template>
  <div class="msg">
    <img :src="BGMSwitchImg" alt>
    <div class="msgInfo">
      <!-- <p v-if="data.type == 1" ref="tab1">
        用户
        <span>【{{data.nick}}】</span>在
        <span>【{{data.gameType}}】</span>赢得大奖获得
        <strong>{{data.winBets}}PK</strong>！
      </p> -->
      <p ref="tab1" v-html="data.message"></p>
    </div>
  </div>
</template>

<script>
import Socket from "components/Socket";
import ENV from "common/Api/ENV";
export default {
  data() {
    return {
      Timer: null,
      speed: 20,
      x: 0,
      ENV: ENV.getENV(),
      data: {},
      BGMSwitchImg: require("../../assets/Images/home_gb.png"),
      msgList: []
    };
  },
  mounted() {
    if (this.data) {
      this.$nextTick(() => {
        this.Timer = setInterval(this.Marquee, this.speed);
      });
    }
    this.$EventListener.on("publicMessageSocket", this.receiveSocketMessage);
  },
  destroyed() {
    clearInterval(this.Timer);
    this.$EventListener.off("publicMessageSocket", this.receiveSocketMessage);
  },
  components: { Socket },
  methods: {
    receiveSocketMessage(data) {
      // console.log("首页小喇叭信息*****************=", data);
      this.NoticeData(data);
    },
    NoticeData(data) {
      if (this.msgList.length == 0) {
        this.data = data;
      }
      if (this.msgList.length < 2) {
        this.msgList.push(data);
      }
    },
    Marquee() {
      let tab1 = this.$refs.tab1;
      tab1.style.transform = `translate3d(${this.x}%,0,0)`;
      this.x -= 0.25;
      if (this.x == -99) {
        if (this.msgList.length > 1) {
          this.msgList.shift();
        }
        this.data = this.msgList[0];
      }
      if (this.x < -100) {
        this.x = 100;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.msg {
  z-index: 7;
  display: flex;
  height: 0.434457rem;
  align-items: center;
  justify-content: space-between;
  background: url('../../assets/Images/home_gb_bg.png') 0 0 / 100% 100% no-repeat !important;
  img {
    width: 0.374532rem;
    height: 0.374532rem;
    margin-right: 0.149813rem;
    position: relative;
    z-index: 1;
    transform: translateX();
  }
  .msgInfo {
    margin-top: 0.014981rem;
    flex: 1;
    display: flex;
    height: 0.434457rem;
    align-items: center;
    overflow: hidden;
    color: #f8f9f9;
    font-size: 0.179775rem;
    white-space: nowrap;
    width: auto;
    // p {
    //   position: relative;
    //   font-size: 0.179775rem;
    //   white-space: nowrap;
    //   width: auto;
    //   span {
    //     &:first-child {
    //       color: #f8f9f9;
    //     }
    //     &:nth-child(2) {
    //       color: $colorMain;
    //     }
    //   }
    //   strong {
    //     color: #ff2f26;
    //   }
    // }
  }
}
</style>
