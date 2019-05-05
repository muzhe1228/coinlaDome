<template>
  <div class="warpper">
     <!-- 倒计时 -->
    <div class="countdown" v-if="socketTime.state == 0">
      <p>{{socketTime.time}}</p>
      <img class="countdownImg" :src="countdownImage" alt>
    </div>
    <div class="Control" v-else>
      <!-- socketTime.state -->
      <div v-if="socketTime.state == 1">
        <div class="shade" @click="test"></div>
        <div class="Deng">
          <img src="~assets/Images/Hxjc/@3x/openDeng.png" alt>
          <p class="tip">当前封盘时间</p>
        </div>
      </div>
      <!-- <img class="HxjcLogo" src="~assets/Images/Hxjc/@3x/HxjcLogo@3x.png" alt> -->
      <transition name="fade">
        <!-- 存在获奖金额 显示哈希值和获奖金额 -->
        <div
          class="openWrap"
          v-if="showResult&&socketTime.state == 2"
        >
          <div class="openBg">
            <!-- <p>当前</p> -->
            <p class="hashNum">
              区块:({{openData.blockId}})
              
              <span
                v-for="item in hashRes(openData.hash,10,openData.result)"
                :key="item"
                :class="item == openData.result&&'active'"
              >{{item}}</span>
            </p>
            <p class="openPKNum">
              <span
                :class="openData.winBets<=0?'loseColor':'winColor'"
                v-if="openData.winBets||openData.winBets==0"
              >{{openData.winBets>0?'+'+openData.winBets+'PK':openData.winBets+'PK'}}</span>
              <span
                class='grayColor'
                v-else
              >本局未下注</span>
            </p>
          </div>
        </div>
        <!-- 不存在获奖金额 显示哈希值 -->
        <!-- <div class="openWrap" v-else-if="showResult&&socketTime.state == 2">
          <div class="openBg">
            <p class="hashNum">当前哈希值：</p>
            <p class="hashNum">
              <span
                v-for="item in hashRes(openData.hash,18,openData.result)"
                :key="item"
                :class="item == openData.result&&'active'"
              >{{item}}</span>
            </p>
          </div>
        </div> -->
        <!-- 开奖中 不显示获奖金额和哈希值 -->
        <div class="inOpen" v-else-if="socketTime.state == 2"></div>
        <!-- 开始下注 不显示获奖金额和哈希值 -->
        <div class="startGame" v-else-if="socketTime.state == 0 && showStartGame"></div>
        <!-- 倒计时 -->
        <ul v-if="socketTime.state == 1" class="TimeWrap" :class="GetSecondClass(socketTime)">
          <li v-for="(num,index) in time" :key="index" :class="num === ':'&&'time'">
            <span class="time-Value">{{num}}</span>
            <span class="time-Title" v-if="socketTime.state == 1">{{timeTitleList[index]}}</span>
          </li>
          <li class="msTime" v-if="socketTime.state == 1">
            <span class="msTime-Value">{{msTime}}</span>
            <span class="msTime-Title">毫秒</span>
          </li>

          <!-- 变大动画 -->
          <!-- <transition name="time-to-big" v-if="socketTime.state == 0 && socketTime.time <= 6">
          <div class="timeToBig" v-if="showBigTime">
            <li v-for="(num,index) in time" :key="index" :class="num === ':'&&'time'">
              <span class="time-Value">{{num}}</span>
              <span class="time-Title" v-if="socketTime.state == 1">{{timeTitleList[index]}}</span>
            </li>
          </div>
          </transition>-->
        </ul>
      </transition>
      <!-- <Socket :url="ENV.socketStatus +'/1/1/'+userInfo.userId" :onMessage="onTimer"/> -->
    </div>
  </div>
</template>

<script>
// import Velocity from "velocity-animate";
import Socket from "components/Socket";
import ENV from "common/Api/ENV";
import { formatSeconds, dateFormat } from "common/func";
import timebg_1 from "Images/Hxjc/@3x/midXZ/hxjc_timebg_1.png";
import timebg_2 from "Images/Hxjc/@3x/midXZ/hxjc_timebg_2.png";
import timebg_3 from "Images/Hxjc/@3x/midXZ/hxjc_timebg_3.png";
import timebg_4 from "Images/Hxjc/@3x/midXZ/hxjc_timebg_4.png";
import timeredbg_1 from "Images/Hxjc/@3x/midXZ/hxjc_redtimebg_1.png";
import timeredbg_2 from "Images/Hxjc/@3x/midXZ/hxjc_redtimebg_2.png";

export default {
  props: {
    openData: {
      type: Object,
      default: {}
    },
    userInfo: {
      type: Object,
      default: {}
    },
    showResult: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: [],
      timer: null,
      msTime: "",
      ENV: ENV.getENV(),
      socketTime: {},
      DengTime: 0,
      hashList: [],
      timeTitleList: ["时", "", "", "分", "", "", "秒"],
      showBigTime: false,
      playFPAudio: true, //是否能播放封盘时间音效
      playStartGameAudio: true, //是否能播放“开局请下注”音效 (是否是第一次切换到开始下注状态)
      LocalGameEndTime: 0, //本局封盘时间戳
      CountTimerTimer: null,
      bigTimer: null,
      difTime: 0, //服务器时间和客户端时间的差值
      showStartGame: false, //是否显示开始下注图片
      countdownImage: timebg_1,
      clockBgRunLoop: 1 //倒计时背景循环图片下标
    };
  },
  mounted() {
    this.$EventListener.on("hxjcGameSocket", this.receiveSocketMessage);
  },
  destroyed() {
    clearTimeout(this.CountTimerTimer);
    clearTimeout(this.bigTimer);
    this.$EventListener.off("hxjcGameSocket", this.receiveSocketMessage);
  },
  components: { Socket },
  methods: {
    receiveSocketMessage(data) {
      //游戏状态切换
      if (data.socketType === 9) {
        console.log("游戏状态切换");
        // console.log("哈希竞猜游戏状态切换*****************=", data);
        this.onTimer(data);
      }
    },
    test() {
      //   console.log(1);
    },

    hashRes(hash, len, result) {
      let hash2 = "..." + hash.substring(hash.length - len),
        arr = hash2.split(result),
        newArr = [],
        lastStr = parseInt(hash2.charAt(hash2.length - 1));
      newArr[0] = arr.slice(0, arr.length - 1).join(result);
      newArr[1] = result;
      if (isNaN(lastStr)) {
        newArr[2] = arr.slice(arr.length - 1, arr.length).join();
      }
      return newArr;
    },
    //倒计时
    onTimer(data) {
      // console.log(data)
      this.socketTime = data;
      if (data.state == 1) {
        clearTimeout(this.CountTimerTimer);
        clearTimeout(this.bigTimer);
        this.time = dateFormat(data.time, "hh:mm:ss").split("");
        this.msTime = new Date(data.time).getMilliseconds();
      }
      this.parentHandle(data.state);
      if (data.state == 2) {
        clearTimeout(this.CountTimerTimer);
        clearTimeout(this.bigTimer);
        this.time = "";
      }
      if (data.state == 0) {
        //开始倒计时
        var time = new Date().getTime();
        this.difTime = data.serviceTime - time;
        clearTimeout(this.CountTimerTimer);
        this.CountTime(data.time);

        //下注过程
        var leftTime = data.time - data.serviceTime;

        if (leftTime / 1000 >= 10) {
          setTimeout(() => {
            this.$hxjcStartGame(1);
          }, 2000);
          this.showStartGame = true;
          setTimeout(() => {
            this.showStartGame = false;
          }, 1000);
        }
      }
    },
    parentHandle(state) {
      this.$emit("inOpen", state);
    },
    GetSecondClass(socketTime) {
      if (socketTime.state == 1) {
        return "active";
      } else if (socketTime.state == 0) {
        if (socketTime.time <= 5) {
          return "last5Second";
        }
      }
    },

    //手动倒计时
    CountTime(endTime) {
      // console.log("执行*********");
      //计算服务器时间和客户端时间的差值 并使用客户端时间
      var time = new Date().getTime();
      var startTime = time + this.difTime;
      //时间差
      var leftTime = parseInt((endTime - startTime) / 1000);
      //   console.log(leftTime, "秒后开奖");
      if (leftTime > 0) {
        //显示在屏幕中央的倒计时
        this.time = formatSeconds(leftTime).split("");
        // console.log("将要显示的时间是：", this.time);
        // this.showBigTime = false;
        this.showBigTime = true;
        this.bigTimer = setTimeout(() => {
          this.showBigTime = false;
        }, 500);

        //每秒替换图片

        if (leftTime <= 5) {
          switch (this.clockBgRunLoop) {
            case 1:
              this.countdownImage = timeredbg_1;
              break;
            case 2:
              this.countdownImage = timeredbg_2;
              break;
            case 3:
              this.countdownImage = timeredbg_1;
              break;
            case 4:
              this.countdownImage = timeredbg_2;
              break;
            default:
              break;
          }
        } else {
          switch (this.clockBgRunLoop) {
            case 1:
              this.countdownImage = timebg_1;
              break;
            case 2:
              this.countdownImage = timebg_2;
              break;
            case 3:
              this.countdownImage = timebg_3;
              break;
            case 4:
              this.countdownImage = timebg_4;
              break;
            default:
              break;
          }
        }
        //背景替换下标自增
        this.clockBgRunLoop++;
        if (this.clockBgRunLoop > 4) {
          this.clockBgRunLoop = 1;
        }

        if (leftTime <= 5) {
          //播放最后五秒的语音
          this.$hxjcCountDown(leftTime);
        }

        //每一秒都给socketTime重新赋值
        this.socketTime = { state: 0, time: leftTime };
        // console.log('socketTime',this.socketTime);
        //递归每秒调用countTime方法，显示动态时间效果
        this.CountTimerTimer = setTimeout(() => {
          this.CountTime(endTime);
        }, 1000);
      } else {
        //手动结束
        console.log("手动封盘");
        this.$EventListener.fire("hxjcGameFengPan"); //发送封盘通知
        this.$hxjcStopXiaZhu(1);
        this.socketTime = { state: 1, time: endTime };
        this.time = dateFormat(endTime, "hh:mm:ss").split("");
        this.msTime = new Date(endTime).getMilliseconds();
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.warpper {
  width: 100%;
  height: 100%;
  .Control {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .shade {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      left: 0;
      top: 0;
      z-index: 6;
    }
    .Deng {
      position: absolute;
      left: 0;
      top: 82%;
      width: 100%;
      text-align: center;
      z-index: 7;
      img {
        width: 2.486891rem;
      }
      .tip {
        position: absolute;
        top: -1.40824rem;
        width: 100%;
        left: 0;
        text-align: center;
        color: #d9c98f;
        font-size: 0.179775rem;
      }
    }
    .fade-leave-active {
      // 动画离开过程：0.5s
      transition: all 1s ease;
    }
    .fade-enter-active {
      // 动画离开过程：0.5s
      transition: all 1s ease;
    }
    .fade-enter, .fade-leave-active {
      // 动画之前的位置
      transform: scale(0.4);
      opacity: 0;
    }
    .HxjcLogo {
      width: 2.996255rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .TimeWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      &.active {
        z-index: 7;
        font-size: 0.449438rem;
        width: 0.524345rem;
        height: 0.524345rem;
      }
      li {
        margin-right: 0.044944rem;
        width: 0.404494rem;
        height: 0.599251rem;
        // background-color: #0b222b;
        border-radius: 0.029963rem;
        display: flex;
        align-items: center;
        justify-content: center;
        // padding-top: 4.999975px;
        font-family: 'hxjc' !important;
        font-size: 0.644195rem;
        color: #d9c98f;
        position: relative;
        &.time {
          img {
            width: 0.104869rem;
          }
        }
        .time-Title {
          position: absolute;
          top: -0.284644rem;
          font-size: 0.179775rem;
          color: #b1a165;
          left: 80%;
          height: 0.194757rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-top: 0.014981rem;
        }
      }
      .msTime {
        margin-left: 0.089888rem;
        font-size: 0.299625rem;
        position: relative;
        font-family: 'hxjc' !important;
        .msTime-Value {
          margin-top: 0.149813rem;
        }
        .msTime-Title {
          position: absolute;
          top: -0.284644rem;
          font-size: 0.179775rem;
          color: #b1a165;
          text-align: right;
          right: 0;
          width: 0.464419rem;
          height: 0.194757rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-top: 0.014981rem;
        }
      }
      .timeToBig {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: center;
        li {
          background: transparent;
        }
      }
      .time-to-big-enter-active {
        animation: time-to-big-in 0.8s ease;
      }
      .time-to-big-leave-active {
        transform: scale(3);
        opacity: 0;
      }
      @keyframes time-to-big-in {
        0% {
          transform: scale(0);
          opacity: 0.6;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    }
    .last5Second {
      li {
        // background: linear-gradient(#FF5454, #DA1313);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        .time-Value {
          color: #ac2020;
        }
      }
    }
    .openWrap {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      .openBg {
        width: 3.595506rem;
        height: 0.973783rem;
        background: url('../../assets/Images/Hxjc/@3x/openBg.png') 0 0 / 100% 100% no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          text-align: center;
          margin-top: 0.029963rem;
          // color: #e2c36f;
          &.hashNum {
            font-size: 0.179775rem;
            background: linear-gradient(#f5e6c1, #f2ce78);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            span {
              &.active {
                font-size: 0.269663rem;
                font-weight: bolder;
                padding: 0 0.029963rem;
                color: #eb2a2a;
                // background: linear-gradient(#eb2a2a, #eb2a2a);
                // -webkit-background-clip: text;
                // -webkit-text-fill-color: transparent;
              }
            }
          }
          &.openPKNum {
            margin-top: 0.074906rem;
            font-size: 0.359551rem;
            font-weight: bolder;
            .winColor {
            //   background: linear-gradient(#56ff8e, #56ff8e);
            //   -webkit-background-clip: text;
            //   -webkit-text-fill-color: transparent;
              color:#56ff8e
            }
            .loseColor {
            //   background: linear-gradient(#ff4848, #ff4848);
            //   -webkit-background-clip: text;
            //   -webkit-text-fill-color: transparent;
              color:#ff4848
            }
            .grayColor {
              background: linear-gradient(#ecf7fc, #bad4fb);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }
    }
    .inOpen {
      background: url('../../assets/Images/Hxjc/@3x/inOpen.png') 0 0 / 100% 100% no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 3.595506rem;
      height: 1.003745rem;
      z-index: 2;
    }
    .startGame {
      background: url('../../assets/Images/Hxjc/@3x/startGame.png') 0 0 / 100% 100% no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 3.595506rem;
      height: 1.003745rem;
      z-index: 2;
    }
  }
  .countdown {
    z-index: 9;
    position: fixed;
    width: 0.973783rem;
    height: 0.973783rem;
    border-radius: 50%;
    bottom: 0.11985rem;
    left: calc(50% - 0.614232rem);
    .countdownImg {
      z-index: 10;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    p {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 11;
      font-family: 'hxjc' !important;
      font-size: 0.449438rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: #333333 -0.007491rem 0.007491rem;
    }
  }
}
</style>
