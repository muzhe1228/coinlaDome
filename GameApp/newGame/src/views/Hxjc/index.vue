<template>
  <div class="Hxjc">
    <div class="Hxjc-l">
      <GameL
        @showMsgInp="showMsgInp"
        :blockId="blockId"
        :openData="openData"
        :showResult="showResult"
      ></GameL>
      <chatMsg
        :isShow="isShow"
        roomId="1"
        roomType="1"
        Url="/hjs/hashJingcai/sendChat"
        @showMsgInp="showMsgInp"
      ></chatMsg>
    </div>
    <div class="Hxjc-c">
      <div class="Hxjc-c_top" @click="test">
        <MsgNotic class="Hxjc-c_top_Msg"></MsgNotic>
        <div class="otherUser" ref="otherUser">
          <ul class="avatarList">
            <transition-group name="headerImgList" tag="li">
              <li
                v-for="(item,index) in avatarList"
                :key="item.userId"
                :style="{left: index*45 + '%',zIndex:(avatarList.length-index)}"
                class="headerImgList-item"
              >
                <img :src="ImageURL+item.head || defalutHeadImg" alt>
              </li>
            </transition-group>
          </ul>
          <p class="Number" @click="testAdd">
            <strong>{{PeopleData.peopleNum}}</strong> 人
          </p>
          <ul>
            <li v-for="(data,index) in otherNum" :key="index">
              <p
                v-for="item in data"
                :key="item.checkId"
                class="otherAn"
                :ref="'other'+item.checkId"
              >
                <img :src="item.chip|chipNum" alt>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap">
        <div class="wrap-all">
          <div v-for="(item,index) in topList" :key="index">
            <div v-if="item === 'control'" class="control">
              <MidXZ
                class="midXZ"
                :xiaZhu="CheckClick"
                :midList="midList"
                :yuXia="yuXia"
                :clear="clear"
                :showResult="showResult"
                :openData="openData"
              />
              <GameControl
                :openData="openData"
                @inOpen="inOpen"
                :showResult="showResult"
                :userInfo="userInfo"
              />
            </div>
            <ul
              v-else
              @click="CheckClick($event,item)"
              class="single"
              :class="classCheck(item.positionType,open)"
              :ref="'num'+item.positionType"
            >
              <!-- 号码和赔率 -->
              <li class="numAndPL">
                <p class="num">{{item.positionType}}</p>
                <p class="pl">1:9</p>
              </li>
              <li class="progress">
                <Progress :heig="parseInt(item.positionAssets/item.pkMaxBets*100)"/>
              </li>
              <li class="single-info">
                <!-- {{item.positionType}} -->
                <img :src="GetDeskNum(item.positionType)" alt>
              </li>
              <li class="yuXia" v-if="yuXia[item.positionType]">
                <span>{{yuXia[item.positionType] | numRes}}</span>
                <i class="iconfont" @click.stop="clear(item.positionType)">&#xe619;</i>
              </li>
              <li class="right_bot" v-if="item.myBets&&!yuXia[item.positionType]">
                <p class="info">
                  <span>{{item.myBets | numRes}}</span>
                </p>
                <p class="before"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <p class="tishi">
        * 任意数字压中赔9倍（含本金）；
        单个数字最大下注额为{{topList[0].pkMaxBets}}PK。
      </p>-->
      <transition name="slide-fade">
        <!-- 底部部分 -->
        <!-- v-show="isShow" -->
        <div class="bot" v-show="!isShow">
          <!-- 用户信息 -->
          <div class="avatar">
            <img :src="userInfo.head" alt>
          </div>
          <div class="userGroup">
            <p class="nick">{{userInfo.nick}}</p>
            <div class="PkGroup">
              <p class="pkLogo" ref="pkLogo">
                <img class="pk" src="~assets/Images/Hxjc/@3x/icon_pk@3x.png" alt>
              </p>
              <p class="pkNum">
                <!-- PK数量 -->
                {{this.getPkNum(PkNum) + ""}}
                <!-- <countTo :endVal="Number(PkNum)" :duration="800" :decimals="0" suffix=" PK"></countTo> -->
              </p>
              <p class="addIcon" @click="showRecharge">
                <img src="../../assets/Images/Hxjc/@3x/icon_add@3x.jpg" alt>
              </p>
              <!-- <transition name="opt">
                <em
                  class="anmit"
                  :class="openNum ? (openNum<0&&'anmit_gray'):'anmit_gray'"
                  v-if="anmit"
                >{{openNum ? ZhengFu(openNum) : "-"+allNum}}</em>
              </transition>-->
            </div>
          </div>

          <div class="numOrMy">
            <!-- <div class="numAll" v-if="allNum">
              <img src="~assets/Images/Hxjc/@3x/coins.jpg" alt>
              <p class="size">
                {{allNum}}&nbsp;PK
              </p>
            </div>-->
            <p class="xiazhuPKNum">下注：{{xiazhuPKNum | numFormat}}PK</p>
            <p class="icoPKNum">冻结：{{lockPKNum | numFormat}}PK</p>
          </div>

          <button class="btnXz">
            <img @click="OkXiaZhu()" :src="XZImage" alt>
          </button>
          <!-- //@focus="" @blur="" -->
        </div>
      </transition>
    </div>
    <!-- 筹码列表 -->
    <div class="Hxjc-r">
      <YaZhu v-on:Chip="changeChip" :chipCheck="chipCheck" roomId="1"/>
    </div>
    <Recharge ref="Recharge"></Recharge>
    <!-- <Socket :url="`${ENV.socketLocation}/1/1`" :onMessage="locationSocket"/>
    <Socket :url="ENV.socketBlock" :onMessage="blockSocket"/>
    <Socket :url="`${ENV.socketPeople}/1/1`" :onMessage="PeopleSocket"/>
    <Socket :url="`${ENV.socketLuZi}/1/1/${userInfo.userId}`" :onMessage="LuZiSocket"/>-->
  </div>
</template>

<script>
import ScrollH from "components/ScrollH";
import YaZhu from "components/YaZhu";
import MsgNotic from "components/MsgNotic";
import GameL from "components/GameL";
import chatMsg from "components/GameL/chatMsg";
import GameControl from "components/GameControl";
import Progress from "components/Progress";
import Socket from "components/Socket";
import ENV from "common/Api/ENV";
import SocketIo from "common/socket.io";
import { $ssajax } from "common/Api";
import { mapGetters, mapState, mapActions } from "vuex";
import countTo from "vue-count-to";
import AvatarImg from "Images/Hxjc/@3x/icon_pk@3x.png";
import Recharge from "components/Modal/Recharge";
import XzNormalImg from "Images/Hxjc/@3x/Xz@3x.png";
import XzUnselectImg from "Images/Hxjc/@3x/Xz_unselect@3x.png";
import XzSelectImg from "Images/Hxjc/@3x/Xz_select@3x.png";
import MidXZ from "./MidXZ";
import {
  getElementDL,
  HxjcNum,
  randomNum,
  ZhengFu,
  restOtherChip,
  numberFormat
} from "common/func";
import {
  beforOpen,
  interFun,
  OkXiaZhu,
  getHxjcData,
  CheckClick,
  otherChip,
  newInterFun,
  afterPMDOpenResult //跑马灯之后的开奖流程
} from "./methods";
export default {
  data() {
    return {
      topList: [0, 1, 2, 3, 9, "control", 4, 8, 7, 6, 5],
      midList: [10, 11, 12, 13],
      chipCheck: 10,
      myCheck: 0,
      otherNum: [],
      checkNum: [],
      otherTimer: null,
      styleds: { height: "60%" },
      isShow: false,
      ENV: ENV.getENV(),
      socketTime: {},
      blockId: "",
      anmit: false,
      timer: null,
      openData: {},
      openNum: 0,
      open: -1,
      speedTimer: null,
      avatarList: [],
      yuXia: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      allNum: 0, //当前选择总钱数
      otherId: 0, //其他人筹码的id 和动画执行的ref
      showResult: false, //是否显示开奖结果的哈希值
      PeopleData: {},
      AvatarImg: AvatarImg,
      defalutHeadImg:
        this.$lStore.get("ImageUrl") + "systemImg/default_headimage.png",
      randomBGMIndex: randomNum(1, 5),
      ImageURL: this.$lStore.get("ImageUrl"),
      state: 0,
      XZImage: XzUnselectImg,
      xiazhuPKNum: 0, //下注中的PK数量
      lockPKNum: 0, //冻结中的PK数量
      openResultTimer: null,
      endLocalGameTimer: null,
      endPMDTimer: null,
      selfchipTimer: null,
      otherchipTimer: null,
      runPMD: false, //是否可以执行跑马灯动画 当收到游戏状态为0或者1 的时候更改为true
      inPMD:false,//是否在跑马灯进行中
      firstReceiveStateSocket: true, //是否第一次接受到游戏状态切换的socket
      canRequestXZ: true, //是否允许请求下注操作 接口相应之前禁止重复点击
      gameState: 0 //游戏状态 0 下注  1 封盘 2开奖
    };
  },
  computed: {
    ...mapState(["PkNum", "userInfo", "localGameName"])
  },
  watch: {
    allNum(newData, oldData) {
      //   console.log("监听到了预下注数组的变化");
      if (this.allNum > 0) {
        this.XZImage = XzNormalImg;
      } else {
        this.XZImage = XzUnselectImg;
      }
    }
  },
  mounted() {
    let _this = this;
    this.getHxjcData();
    this.$welcomeHXJC(1);
    if (this.$lStore.get("BackGround_BGM_Switch")) {
      this.$hxjcBackgroundBGM();
    } else {
      this.$hxjcCloseBackgroundBGM();
    }
    this.setLocalGameName(1);
    this.$EventListener.on("hxjcGameSocket", this.receiveSocketMessage);
    this.$EventListener.on("blockIDSocket", this.receiveSocketMessage);
    _this.$EventListener.on("reConnect", _this.reConnect);
    this.$EventListener.on("hxjcGameFengPan", this.receiveFengPan);
    this.sendGameMessage();
    //发送进入哈希竞猜游戏的通知
    this.$EventListener.fire("intoHxjcGame");
    //添加离开进入界面监听
    document.addEventListener(
      "visibilitychange",
      this.sendGameMessage
    );
  },
  destroyed() {
    this.$hxjcCloseBackgroundBGM();
    this.setLocalGameName(-1);
    this.$EventListener.off("hxjcGameSocket", this.receiveSocketMessage);
    this.$EventListener.off("blockIDSocket", this.receiveSocketMessage);
    this.$EventListener.off("reConnect", this.reConnect);
    this.$EventListener.off("hxjcGameFengPan", this.receiveFengPan);
    this.$EventListener.fire("sendMsgSocket", {
      userId: this.userInfo.userId,
      gameType: -1,
      roomId: -1,
      type: 0
    });
    //移除离开进入界面监听
    document.removeEventListener(
      "visibilitychange",
      this.sendGameMessage
    );

    clearTimeout(this.otherTimer);
    clearTimeout(this.timer);
    clearTimeout(this.speedTimer);
    clearTimeout(this.openResultTimer);
    clearTimeout(this.endLocalGameTimer);
    clearTimeout(this.endPMDTimer);
    clearTimeout(this.selfchipTimer);
    clearTimeout(this.otherchipTimer);
  },
  components: {
    GameL,
    ScrollH,
    YaZhu,
    MsgNotic,
    GameControl,
    Progress,
    Socket,
    chatMsg,
    countTo,
    Recharge,
    MidXZ
  },
  methods: {
    //请求当前游戏状态
    sendGameMessage() {
      if (document.visibilityState == "visible") {
        console.log("重新请求游戏状态");
        let _this = this;
        setTimeout(() => {
          _this.$EventListener.fire("sendMsgSocket", {
            userId: this.userInfo.userId,
            gameType: 1,
            roomId: 1,
            type: 0
          });
        }, 1000);
      }
    },
    //接收到封盘消息
    receiveFengPan() {
      this.allNum = 0;
    },
    //重连之后发送游戏内参数开始游戏
    reConnect(data) {
      this.$EventListener.fire("sendMsgSocket", {
        userId: this.userInfo.userId,
        gameType: 1,
        roomId: 1,
        type: 0
      });
    },
    receiveSocketMessage(data) {
      // console.log('哈希竞猜游戏socket:',data)
      //游戏位置金额信息
      if (data.socketType === 8) {
        console.log("哈希竞猜游戏位置金额信息*****************=", data);
        if (data.userId == this.userInfo.userId) {
          this.xiazhuPKNum = data.totalBets;
          this.lockPKNum = data.lockBets;
        }
        this.locationSocket(data.list);
      }
      //房间内人数信息
      if (data.socketType === 7) {
        // console.log("哈希竞猜房间人数信息*****************=", data);
        this.PeopleSocket(data);
      }

      //全局socket接收
      if (data.socketType === 0) {
        this.blockSocket(data);
      }

      //开奖结果
      if (data.socketType === 3) {
        // console.log("哈希竞猜开奖结果socket:", data);
        console.log("开奖，开始跑马灯");
        this.LuZiSocket(data);
      }

      //状态切换
      if (data.socketType === 9) {
        this.gameState = data.state;
        console.log("游戏状态切换为", this.gameState);
        //当游戏有经历过下注或者封盘的流程时 代表着跑马灯可以正常运转
        if (data.state == 0 || data.state == 1) {
          this.runPMD = true;
        }

        //切换到下注状态 重新获取位置信息
        if (data.state == 0) {
          this.showResult = false;
        }

        // if (data.state == 0 && this.firstReceiveStateSocket) {
        // } else {
        //   if(data.state == 0){
        //     console.log('调用位置信息接口')
        //     this.getHxjcData();
        //   }
        // }

        if (this.firstReceiveStateSocket == false) {
          if (data.state == 0) {
            console.log("调用位置信息接口");
            this.getHxjcData();
          }
        }

        this.firstReceiveStateSocket = false;
      }
    },
    getPkNum(PkNum) {
      return numberFormat(PkNum);
    },
    showRecharge() {
      this.$refs.Recharge.show();
    },
    GetDeskNum(num) {
      if (num || num == 0) {
        return require("../../assets/Images/Hxjc/@3x/hxjc_location_" +
          num +
          ".png");
      }
    },
    //测试“房间人数变更效果”
    testAdd() {
      // console.log("测试增加人数");
      // var object = Object.create(this.avatarList[0]);
      // var timestamp = new Date().valueOf();
      // object.userId = timestamp;
      // object.head = this.userInfo.head;
      // this.avatarList = [object, ...this.avatarList];
      // this.avatarList.splice(this.avatarList.length - 1, 1);
      // console.log(this.avatarList);
    },
    playBgm() {
      let HxjcBgm = document.getElementById("HxjcBgm");
      HxjcBgm.play();
      document.removeEventListener("touchstart", this.play);
    },
    //测试跑马灯
    test() {
      // beforOpen(this, 5);
      // let time = 0;
    },
    //清空当前点击下注
    clear(num) {
      let newList = this.yuXia.concat(),
        checkNum = this.checkNum.concat();
      checkNum[num] = [];
      newList[num] = 0;
      this.yuXia = newList;
      this.checkNum = checkNum;
      this.allNum = this.yuXia.reduce((n, m) => n + m);
    },

    //本局人数socket
    PeopleSocket(data) {
      //      console.log("哈希竞猜在线人数数据：", data);
      this.PeopleData = data;
      if (data.type === 0) {
        //        console.log("哈希竞猜在线头像列表：", this.avatarList);
        this.avatarList = data.headList;
      } else if (data.type === 1) {
        var object = {};
        object.head = data.head;
        object.userId = data.userId;
        this.avatarList = [object, ...this.avatarList];
        this.avatarList.splice(this.avatarList.length - 1, 1);
      } else {
      }
    },
    //开奖中清空数据
    inOpen(state) {
      this.state = state;
      if (state != 0) {
        this.yuXia = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    },

    //路子开奖结果
    LuZiSocket(data) {
      //      console.log("本局哈希竞猜中奖号码：", data.result);
      this.myCheck = this.topList[data.result].myBets;
      this.openData = data;
      this.openNum = data.winBets;
      if (!this.runPMD) {
        //当进入游戏收到开奖信息且runPMD为false时 代表着没有游戏没有经历过下注以及封盘的流程而是初次进入即为开奖状态 则不能执行跑马灯流程 那么立即执行跑马灯后的开奖流程
        afterPMDOpenResult(this, data.result);
      } else {
        //执行跑马灯
        if(!this.inPMD){
          this.inPMD = true;
          beforOpen(this, data.result);
        }
      }
    },

    //区块socket
    blockSocket(data) {
      this.blockId = data.blockId;
    },

    //位置信息socket
    locationSocket(dataArray) {
      // console.log(data);
      for (let a = 0; a < dataArray.length; a++) {
        let data = dataArray[a];
        if (data.positionType < 10) {
          let newList = this.topList.concat();
          for (let i = 0; i < newList.length; i++) {
            if (newList[i].positionType == data.positionType) {
              if (this.userInfo.userId != data.userId) {
                data.myBets = newList[i].myBets;
              }
              newList[i] = data;
              this.topList = newList;

              //改变预下注金额
              // console.log(data.positionType,'号位置金额变动\n剩余可下金额为：',data.pkMaxBets-data.positionAssets,'\n本位置最大下注金额为：',data.pkMaxBets,'\n本位置用户预下注金额为:',this.yuXia[data.positionType])
              if (
                this.yuXia[data.positionType] >
                data.pkMaxBets - data.positionAssets
              ) {
                this.yuXia[data.positionType] =
                  data.pkMaxBets - data.positionAssets;
              }

              break;
            }
          }
          if (data.userId != this.userInfo.userId) {
            if (data.type == 0) {
              otherChip(this, data);
            }
          }
        } else {
          let newList = this.midList.concat();
          for (let i = 0; i < newList.length; i++) {
            if (newList[i].positionType == data.positionType) {
              if (this.userInfo.userId != data.userId) {
                data.myBets = newList[i].myBets;
              }
              newList[i] = data;
              this.midList = newList;

              //改变预下注金额
              // console.log(data.positionType,'号位置金额变动\n剩余可下金额为：',data.pkMaxBets-data.positionAssets,'\n本位置最大下注金额为：',data.pkMaxBets,'\n本位置用户预下注金额为:',this.yuXia[data.positionType])
              if (
                this.yuXia[data.positionType] >
                data.pkMaxBets - data.positionAssets
              ) {
                this.yuXia[data.positionType] =
                  data.pkMaxBets - data.positionAssets;
              }

              break;
            }
          }
        }
      }
    },

    //哈希竞猜下注
    OkXiaZhu() {
      OkXiaZhu(this);
    },

    //获取本页信息
    getHxjcData() {
      getHxjcData(this);
    },

    //选择数字
    CheckClick(e, item) {
      CheckClick(this, e, item);
    },

    //添加class
    classCheck(item, open) {
      if (this.showResult) {
        if (item == this.openData.result) {
          return "active";
        }
      } else {
        if (open > -1) {
          if (item == open) {
            return "active";
          }
        }
      }
      return "";
    },

    showMsgInp(bol) {
      this.isShow = bol;
    },
    playDown() {
      this.$hxjcChipDownBGM(1);
      // this.$refs.chipDown.play();
    },
    playSlideBgm() {
      this.$hxjcSlideBgm(1);
      // this.$refs.slideBgm.play();
    },
    //筹码监听选择
    changeChip(code) {
      this.$clickChip();
      // this.$chipDown();
      //监听子组件的改变
      this.chipCheck = code;
    },
    //倒计时
    onTimer(data) {
      this.socketTime = data;
    },

    ZhengFu(num) {
      return ZhengFu(num);
    },

    ...mapActions(["setLocalGameName"])
  }
};
</script>

<style scoped lang="stylus">
@import './style.styl';
</style>
