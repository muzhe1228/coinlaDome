<!--suppress ALL -->
<template>
  <div class="yydb">
    <div class="yydb-l">
      <GameL @showMsgInp="showMsgInp" :blockId="blockId" :displayNoMethod="displayNo"></GameL>
    </div>

    <div class="yydb-c">
      <p class="yydb-shandow" v-if="isShowAll"></p>
      <!-- 上部 -->
      <div class="yydb-top">
        <MsgNotic class="yydb-msg"></MsgNotic>
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
            <p class="Number">
              <strong>{{PeopleData.peopleNum}}</strong> 人
            </p>
          </ul>

          <ul>
            <li
              v-for="(item,index) in otherNum"
              :key="index"
              class="otherAn"
              :ref="'other'+item.checkId"
            >
              <img src="../../assets/Images/Hxjc/@3x/icon_pk@3x.png" alt>
            </li>
          </ul>
        </div>
      </div>
      <!--  游戏详情区域-->
      <div class="yydb-info">
        <!-- 押注 -->
        <div class="YYdb-c-info-yazhu">
          <!-- 目标PK量 -->
          <div class="YYdb-c-info-yazhu-reward">
            <div class="YYdb-c-info-yazhu-reward-number">
              <ul v-if="numList.length" class="YYdb-c-info-yazhu-reward-number-no">
                <li v-for="(num,index) in numList" :key="index">
                  <!-- <img :src="num | DbNum" alt> -->
                  <p>{{num}}</p>
                </li>
              </ul>

              <p class="YYdb-c-info-yazhu-reward-number-pk">PK</p>
            </div>
          </div>
          <div class="YYdb-c-info-yazhu-explain">
            <p class="explain">{{detail.rewardIntro}}</p>
          </div>
          <!-- 下注进度 -->
          <div class="YYdb-c-info-yazhu-progress">
            <!-- ref="progressAmit" -->
            <div class="YYdb-c-info-yazhu-progress-img" ref="progressAmit">
              <p
                class="progressGroup"
                v-bind:style="{transform:progressClass(detail.purchasedNumber,detail.totalNumber)}"
              >
                <img src="../../assets/Images/yydbnew/now_bg@3x.png" alt class="main_progress">
                <img
                  class="line_height"
                  v-if="showHighLight()"
                  src="../../assets/Images/yydbnew/now_head.png"
                  alt
                >
                <span class="guang"></span>
              </p>

              <!-- 进度文字说明 -->
            </div>
            <div class="YYdb-c-info-yazhu-progress-text">
              <p class="YYdb-c-info-yazhu-progress-text-total">总 {{detail.totalNumber}} 注</p>
              <p
                class="YYdb-c-info-yazhu-progress-text-sheng"
              >剩余 {{detail.totalNumber - detail.purchasedNumber}} 注</p>
            </div>
          </div>
          <!-- 下注框 -->
          <div class="YYdb-c-info-yazhu-change">
            <div class="change-bg" @click="changePkNumber(-1)">
              <img class="img-reduce" src="../../assets/Images/yydbnew/icon_reduce.png" alt>
            </div>
            <div class="YYdb-c-info-yazhu-change-content">
              <input
                type="number"
                @input="NumberChange($event.target.value)"
                v-model="yazhuNumber"
                :max="detail.totalNumber - detail.purchasedNumber"
                class="YYdb-c-info-yazhu-change-content-number"
                @focus="focus($event)"
              >
              <p class="YYdb-c-info-yazhu-change-content-exp">({{detail.perBets * yazhuNumber}}PK)</p>
            </div>
            <div class="change-bg" @click="changePkNumber(1)">
              <img src="../../assets/Images/yydbnew/icon_add.png" alt>
            </div>
          </div>
          <!-- 投注按钮 -->
          <div :class="addBtnName(gameStatus.state)" @click="DbXiaZhu(detail)">
            <!-- <mu-ripple class="mu-ripple-demo" color="#515EA8" :opacity="0.7" :class="addBtnName(gameStatus.state)" @click="DbXiaZhu(detail)"> -->
            <p class="YYdb-c-info-yazhu-btn">{{getTouzhuText(gameStatus.state)}}</p>
            <p class="sure-time" v-show="gameStatus.state == 0">{{getTime(gameStatus)}}</p>
            <!-- </mu-ripple> -->
          </div>

          <!-- 我的投注信息 -->
          <div class="YYdb-c-info-yazhu-my" ref="myUser">
            <div class="YYdb-c-info-yazhu-my-avatar">
              <img :src="userInfo.head" alt>
            </div>
            <PkGroup :nick="userInfo.nick" :showFun="showHandle"></PkGroup>
            <ul>
              <li
                v-for="(item,index) in myNum"
                :key="index"
                class="myYazhuNum"
                :ref="'my'+item.checkId"
              >
                <img src="../../assets/Images/Hxjc/@3x/icon_pk@3x.png" alt>
              </li>
            </ul>
            <!-- <p class="YYdb-c-info-yazhu-my-use" @click="showDialog">我的投注</p> -->
            <div class="YYdb-c-info-yazhu-my-use">
              <p class="xiazhuPKNum">下注：{{totalBets | numFormat}}PK</p>
              <p class="icoPKNum">冻结：{{lockBets | numFormat}}PK</p>
            </div>
          </div>
        </div>

        <transition name="fadeList">
          <div v-if="isShowAll" class="open-detail">
            <div class="open-detail-control">
              <p>
                <img
                  class="open-detail-img"
                  src="../../assets/Images/yydbnew/btn_click_close.png"
                  @click="closeDetail"
                  alt
                >
              </p>
              <img src="../../assets/Images/yydbnew/line_between_card.png" alt>
            </div>

            <!-- 押注详情 展开-->
            <div class="YYdb-c-info-detail-open">
              <div class="YYdb-c-info-detail-title">
                <img src="../../assets/Images/yydbnew/chip@3x.png">
                <p>本期投注详情</p>
                <img src="../../assets/Images/yydbnew/chip@3x.png">
              </div>

              <div class="YYdb-c-info-detail-list">
                <!-- 列表头 -->
                <div class="YYdb-c-info-detail-list-title">
                  <p>用户名</p>
                  <p>下注号码</p>
                  <p>下注金额</p>
                </div>
                <p class="line"></p>
                <!-- 列表 -->
                <ScrollH
                  :data="yazhuList"
                  pullup
                  @scrollToEnd="getDbCanYu"
                  :scrollToEndFlag="false"
                >
                  <div class="YYdb-c-info-detail-list-ul-open" v-if="yazhuList.length !== 0">
                    <transition-group
                      name="list"
                      tag="ul"
                      enter-active-class="animated fadeInLeft"
                      leave-active-class="animated fadeOutRight"
                      :duration="200"
                    >
                      <li v-for="(item) in yazhuList" :key="item.startNo">
                        <p class="user-name">{{item.nick}}</p>
                        <p class="number">
                          {{
                          displayNo(item.startNo, item.endNo)
                          }}
                        </p>
                        <p class="pk-no">{{item.bets + "PK"}}</p>
                      </li>
                    </transition-group>
                  </div>
                  <p v-else class="notData">暂无数据</p>
                </ScrollH>
              </div>
            </div>
          </div>
        </transition>

        <div v-if="isShowAll" class="close-none"></div>

        <div v-if="!isShowAll" class="YYdb-c-info-control" ref="hideControlStyle">
          <p>
            <img
              class="control-img-close"
              src="../../assets/Images/yydbnew/btn_click_open.png"
              @click="openDetail"
              alt
            >
          </p>
          <img src="../../assets/Images/yydbnew/line_between_card.png" alt>
        </div>

        <transition
          name="fade"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          :duration="600"
        >
          <!-- 押注详情 关闭-->
          <div v-if="!isShowAll" class="YYdb-c-info-detail" ref="hideDetailStyle">
            <div class="YYdb-c-info-detail-title">
              <img src="../../assets/Images/yydbnew/chip@3x.png">
              <p>本期投注详情</p>
              <img src="../../assets/Images/yydbnew/chip@3x.png">
            </div>

            <div class="YYdb-c-info-detail-list">
              <!-- 列表头 -->
              <div class="YYdb-c-info-detail-list-title">
                <p>用户名</p>
                <p>下注号码</p>
                <!-- <p class="YYdb-c-info-detail-list-title-bets">下注金额</p> -->
              </div>
              <p class="line"></p>
              <!-- 列表 -->
              <ScrollH :data="yazhuList" pullup @scrollToEnd="getDbCanYu" :scrollToEndFlag="false">
                <div class="YYdb-c-info-detail-list-ul" v-if="yazhuList.length">
                  <transition-group
                    name="list"
                    tag="ul"
                    enter-active-class="animated fadeInLeft"
                    leave-active-class="animated fadeOutRight"
                    :duration="200"
                  >
                    <li v-for="(item) in yazhuList" :key="item.startNo">
                      <div class="item-yazhu" v-if="item">
                        <p class="user-name">{{item.nick}}</p>
                        <p class="number">
                          {{
                          displayNo(item.startNo, item.endNo)
                          }}
                        </p>
                      </div>
                    </li>
                  </transition-group>
                </div>
                <p v-else class="notData">暂无数据</p>
              </ScrollH>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <Recharge ref="Recharge"></Recharge>
    <TigerMachine
      v-if="showResult === 1 && isEnableShow"
      :time="gameStatus.time"
      :resultData="resultData"
      @close="CloseResultDialog"
    ></TigerMachine>
    <LiuPai v-if="showResult === 0 && isEnableShow" @close="CloseResultDialog"></LiuPai>
    <DbWaitOpen v-if="showWait" :time="gameStatus.time"></DbWaitOpen>
  </div>
</template>

<script>
import ScrollH from "components/ScrollH";
import PkGroup from "./PkNumberGroup";
import openImg from "../../assets/Images/YYdb/@3x/btn_click_open@3x.png";
import closeImg from "../../assets/Images/YYdb/@3x/btn_click_close@3x.png";
import Socket from "components/Socket";
import ENV from "common/Api/ENV";
import DbWaitOpen from "./DbWaitOpen";
import LiuPai from "./LiuPai";
import TigerMachine from "./TigerMachine";
import { mapState, mapActions } from "vuex";
import countTo from "vue-count-to";
import MsgNotic from "components/MsgNotic";
import animate from "animate.css";
import GameL from "components/GameLDb";
import Recharge from "components/Modal/Recharge";
import {
  formatSecondsToHM,
  dateFormat,
  getElementDL,
  randomNum
} from "common/func";

export default {
  data() {
    return {
      yazhuNumber: 1,
      isShowAll: false, //本期投注详情关闭展开控制
      yazhuList: [],
      deId: null,
      detail: {},
      numList: [],
      ENV: ENV.getENV(),
      page: 1,
      size: 20,
      canLoadData: true, //是否能加载数据
      showWait: false, //是否显示等待开奖弹窗
      showResult: -1, //是否显示开奖弹窗
      isEnableShow: true, //结果弹窗关闭后不再显示
      resultData: null,
      gameStatus: {},
      showMsgInp: false,
      avatarList: [
        { userId: 0 },
        { userId: 1 },
        { userId: 2 },
        { userId: 3 },
        { userId: 4 },
        { userId: 5 },
        { userId: 6 },
        { userId: 7 }
      ],
      otherNum: [],
      myNum: [],
      allNum: 0, //当前选择总钱数
      otherId: 0, //其他人筹码的id 和动画执行的ref
      PeopleData: {},
      // AvatarImg: AvatarImg,
      isMyBets: false,
      defalutHeadImg: ENV.getENV().httpApi + "/systemImg/default_headimage.png",
      blockId: "",
      coinId: 0, //飞金币的ID标识
      playFPAudio: true, //是否能播放封盘时间音效
      playStartGameAudio: true, //是否能播放“开局请下注”音效 (是否是第一次切换到开始下注状态)
      randomBGMIndex: randomNum(1, 5),
      ImageURL: this.$lStore.get("ImageUrl"),
      isCanClickYazhu: true, //下注按钮点击
      timeDown: "",
      endText: "",
      timer: null,
      difTime: 0, //服务器时间和客户端时间的差值
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidShowInputContent: false, //显示或者隐藏footer
      lockBets: 0, //冻结金额
      totalBets: 0 //总金额
    };
  },
  computed: {
    ...mapState(["PkNum", "userInfo"])
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
    let _this = this;
    this.$dbWelcom(1);
    if (this.$lStore.get("BackGround_BGM_Switch")) {
      this.$hxjcBackgroundBGM();
    } else {
      this.$hxjcCloseBackgroundBGM();
    }
    this.getDbCanYu();
    this.getDetails();

    this.setLocalGameName(3);

    this.$EventListener.on("yydbGameSocket", this.receiveSocketMessage);
    this.$EventListener.on("blockIDSocket", this.receiveSocketMessage);
    _this.$EventListener.on("reConnect", _this.reConnect);
    this.reConnect();
  },
  destroyed() {
    clearInterval(this.timer);
    let _this = this;
    this.offSocket();
    this.$hxjcCloseBackgroundBGM();
    this.setLocalGameName(-1);
    _this.$EventListener.off("yydbGameSocket", this.receiveSocketMessage);
    this.$EventListener.off("blockIDSocket", this.receiveSocketMessage);
    this.$EventListener.off("reConnect", this.reConnect);
  },
  components: {
    ScrollH,
    Socket,
    PkGroup,
    DbWaitOpen,
    LiuPai,
    MsgNotic,
    TigerMachine,
    GameL,
    Recharge
  },
  methods: {
    initData() {
      this.getDbCanYu();
      this.getDetails();
      this.setLocalGameName(3);

      this.$EventListener.on("yydbGameSocket", this.receiveSocketMessage);
      this.$EventListener.on("blockIDSocket", this.receiveSocketMessage);
      _this.$EventListener.on("reConnect", _this.reConnect);
      this.reConnect();
    },
    offSocket() {
      this.$EventListener.fire("sendMsgSocket", {
        userId: this.userInfo.userId,
        gameType: -1,
        roomId: -1,
        type: 0
      });
    },
    reConnect(data) {
      this.$EventListener.fire("sendMsgSocket", {
        userId: this.userInfo.userId,
        gameType: 3,
        roomId: 1,
        type: 0
      });
    },
    receiveSocketMessage(data) {
      switch (data.socketType) {
        case 0: //区块高度
          return this.blockSocket(data);
        case 3: //开奖结果
          return this.openResult(data);
        case 5: //游戏当前
          return this.BenJMessage(data);
        // case 6: //路子,开奖结果
        //   return this.openResult(data);
        case 7: //游戏人数头像
          return this.PeopleSocket(data);
        case 9: //游戏状态切换
          return this.onStateChange(data);
        case 10: //夺币详情
          return this.detailMessage(data);
      }
    },
    showHighLight() {
      return (this.detail.purchasedNumber / this.detail.totalNumber) * 100 > 30;
    },
    displayNo(startNum, endNum) {
      if (startNum != 0 && !startNum) return "";

      endNum = endNum || startNum;
      let maxLength = this.detail.totalNumber.toString().length - 1;
      let startNo = startNum.toString();
      let endNo = endNum.toString();
      let startLength = startNo.length;
      let endLength = endNo.length;
      if (startLength < maxLength) {
        startNo = ("00000000" + startNo).slice(-maxLength);
      }
      if (endLength < maxLength) {
        endNo = ("00000000" + endNo).slice(-maxLength);
      }
      let noStr =
        startNum === endNum
          ? startNo
          : endNum - startNum > 1
          ? startNo + "~" + endNo
          : startNo + ", " + endNo;
      return noStr;
    },
    addBtnName(state) {
      if (state === 0) {
        return "touzhu-sure";
      } else {
        return "touzhu-disable";
      }
    },
    getTouzhuText(state) {
      if (state === 0) {
        return "确定投注";
      } else {
        return "停止投注";
      }
    },
    showHandle() {
      this.$clickAudio();
      this.$refs.Recharge.show();
    },
    backPage() {
      this.$router.push("/index");
    },

    getTime(status) {
      if (!status) {
        return "";
      }
      if (status.state === 0) {
        // return (
        //   "封盘时间 " +
        //   dateFormat(status.time, "hh:mm:ss") +
        //   dateFormat(status.time, "  S")
        // );
        return this.timeDown;
      }
    },

    countdowm(timeStamp, serveTime) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      let clientTime = new Date().getTime();
      let startTime = serveTime;
      this.difTime = serveTime - clientTime;
      this.timer = setInterval(() => {
        let time = new Date().getTime();
        startTime = time + this.difTime;
        let nowTime = new Date(startTime);
        let endTime = new Date(timeStamp);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (day > 0) {
            format = `${day}:${hour}:${min}:${sec}`;
          } else {
            format = `${hour}:${min}:${sec}`;
          }
          this.timeDown = "倒计时 " + format;
        } else {
          clearInterval(this.timer);
          if (this.gameStatus.state === 0) {
            this.gameStatus = { state: 1, time: timeStamp };
            this.isCanClickYazhu = false;
            this.playStartGameAudio = true;
            if (this.playFPAudio) {
              this.$dbStopXiaZhu(1);
              this.playFPAudio = false;
            }
            this.showWaitDialog();
          }
        }
      }, 1000);
    },

    _callback() {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this);
      }
    },

    changePkNumber(typeFlag) {
      typeFlag === -1 ? this.reducePkNumber() : this.addPkNumber();
    },

    reducePkNumber() {
      this.$clickAddReduce();
      this.yazhuNumber = this.yazhuNumber === 1 ? 1 : this.yazhuNumber - 1;
      if (this.yazhuNumber === 1) {
        this.$toast("不得少于1注");
      }
    },

    addPkNumber() {
      this.$clickAddReduce();
      if (
        this.yazhuNumber >=
        this.detail.totalNumber - this.detail.purchasedNumber
      ) {
        this.$toast("下注超额");
        return;
      }
      this.yazhuNumber++;
    },

    openDetail() {
      this.isShowAll = true;
      this.$clickOpenClose();
      let me = this;
      this.$nextTick(() => {
        // me.hideWidth =
        //   me.$refs.hideControlStyle.style.width +
        //   me.$refs.hideDetailStyle.style.width +
        //   "px";
        // console.log(me.hideWidth);
      });
    },
    closeDetail() {
      this.$clickOpenClose();
      this.isShowAll = false;
    },

    NumberChange(value) {
      // console.log(value);
      if (value) {
        if (value <= this.detail.totalNumber - this.detail.purchasedNumber) {
          this.yazhuNumber = value <= 1 ? 1 : value;
        } else {
          this.$toast("下注超额");
          this.$nextTick(() => {
            let newVal = this.detail.totalNumber - this.detail.purchasedNumber;
            this.yazhuNumber = newVal;
          });
        }
      } else {
        this.$nextTick(() => {
          let newVal = 1;
          this.yazhuNumber = newVal;
        });
      }
      this.$changeInput(this.yazhuNumber);
    },

    focus(value) {
      this.$changeInput(this.yazhuNumber);
      event.currentTarget.select();
    },

    progressClass() {
      let X = (this.detail.purchasedNumber / this.detail.totalNumber) * 100;
      if (X > 4) {
        return `translateX(${X - 100}%)`;
      } else {
        return `translateX(-95%)`;
      }
    },

    getDetails() {
      this.$ajax(
        {
          url: "/hds/hashDuobao/findDuobao",
          data: {
            params: {
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            // console.log(res.data);
            this.lockBets = res.data.lockBets;
            this.totalBets = res.data.totalBets;
            this.detail = res.data.entity;
            this.numList = (res.data.entity.rewardValue + "").split("");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getLastId(list) {
      if (!list) return;
      if (list.length !== 0) {
        this.deId = list[list.length - 1].detailId;
      } else {
        this.deId = 0;
      }
    },

    // 本期参与
    getDbCanYu() {
      // console.log(this.deId);
      if (!this.canLoadData || this.deId == 0) return;
      this.canLoadData = false;
      this.$ajax(
        {
          url: "/hds/hashDuobao/findCurrentDetailList",
          data: {
            params: {
              // page: this.page,
              detailId: this.deId,
              pageSize: this.size,
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          this.canLoadData = true;
          if (res.code === 0) {
            console.log(res.data.list);
            this.getLastId(res.data.list);
            if (res.data.size === 0 && this.page === 1) {
              this.yazhuList = [];
            } else if (res.data.size > 0) {
              this.page = this.page + 1;
              this.yazhuList = this.yazhuList.concat(res.data.list);
            } else {
              this.$toast("已加载全部数据");
            }
          }
        })
        .catch(err => {
          this.canLoadData = true;
          console.log(err);
        });
    },
    //夺宝下注
    DbXiaZhu(item) {
      if (!this.isCanClickYazhu) return;
      this.$yaZhu();
      if (this.yazhuNumber === 0) {
        this.$toast("不得少于1注");
        return;
      }
      this.$ajax(
        {
          url: "/hds/hashDuobao/saveDuobaoDetail",
          data: {
            params: {
              bets: item.perBets * this.yazhuNumber,
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            this.yazhuNumber = 1;
            this.$dbXiaZhuSuccess(1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //区块socket
    blockSocket(data) {
      this.blockId = data.blockId;
    },

    PeopleSocket(data) {
      this.PeopleData = data;
      if (data.type === 0) {
        // console.log("哈希竞猜在线头像列表：", this.avatarList);
        this.avatarList = data.headList;
      } else if (data.type === 1) {
        var object = {};
        object.head = data.head;
        object.userId = data.userId;
        this.avatarList = [object, ...this.avatarList];
        this.avatarList.splice(this.avatarList.length - 1, 1);
      }
    },

    detailMessage(data) {
      // console.log(data);
      if (data) {
        if (data.type === 1) {
          this.detail.totalNumber = data.totalNumber;
          this.detail.purchasedNumber = data.purchasedNumber;
          if (this.yazhuNumber > data.totalNumber - data.purchasedNumber) {
            this.yazhuNumber = data.totalNumber - data.purchasedNumber;
          }
        } else if (data.type === 2) {
          this.yazhuNumber = 1;
          this.page = 1;
          this.yazhuList = [];
          this.getDetails();
          this.getDbCanYu();
        }
      }
    },

    BenJMessage(data) {
      if (data) {
        // console.log(data);
        if (data.userId == this.userInfo.userId) {
          this.lockBets = data.lockBets;
          this.totalBets = data.totalBets;
        }
        this.yazhuList = [data, ...this.yazhuList];
        if (this.userInfo.userId == data.userId) {
          this.myCoin(parseInt(data.bets) / this.detail.perBets);
        } else {
          this.otherCoin(parseInt(data.bets) / parseInt(this.detail.perBets));
        }
      }
    },
    //开奖结果信息
    openResult(data) {
      console.log("openResult:");
      console.log(data);
      if (data) {
        this.resultData = data;
        if (this.resultData) {
          this.showResultDialog();
        }
      }
    },
    //开奖状态改变
    onStateChange(data) {
      this.gameStatus = data;
      if (this.gameStatus.state === 1) {
        this.isCanClickYazhu = false;
        this.playStartGameAudio = true;
        // if (this.playFPAudio) {
        //   this.$dbStopXiaZhu(1);
        //   this.playFPAudio = false;
        // }
        this.showWaitDialog();
      } else if (this.gameStatus.state === 2) {
        clearInterval(this.timer);
        this.countdowm(this.gameStatus.time, this.gameStatus.serviceTime);
        this.isCanClickYazhu = false;
        this.playStartGameAudio = true;
        this.playFPAudio = true;
        this.CloseWait();
        console.log("onStateChange:");
        console.log(this.resultData);
        // if (this.resultData) {
        //   this.showResultDialog();
        // }
      } else if (this.gameStatus.state === 0) {
        this.countdowm(this.gameStatus.time, this.gameStatus.serviceTime);
        this.isCanClickYazhu = true;
        this.playFPAudio = true;
        if (this.playStartGameAudio) {
          setTimeout(() => {
            this.$dbStartGame(1);
          }, 2000);
          this.playStartGameAudio = false;
        }
        this.CloseResultDialog();
        this.isEnableShow = true;
      }
    },

    //自己下注飞入动画
    myCoin(num) {
      num = 10;
      // myUser
      let _this = this,
        pres = this.$refs.progressAmit, //进度条
        coin = this.$refs.myUser, //金币
        w = coin.offsetWidth, //金币宽
        h = coin.offsetHeight, //金币高
        left =
          getElementDL(pres, "left") -
          getElementDL(coin, "left") +
          pres.offsetWidth *
            (this.detail.purchasedNumber / this.detail.totalNumber) -
          12,
        top = getElementDL(pres, "top") - getElementDL(coin, "top") - 10,
        newArr = [];

      for (let i = 0; i < num; i++) {
        this.coinId++;
        let obj = {
          left: left,
          top: top,
          transition: "all " + randomNum(4, 25) / 10 + "s ease",
          chip: 10,
          checkId: this.coinId
        };
        newArr.push(obj);
      }
      this.myNum = newArr;

      this.$nextTick(() => {
        _this.myNum.forEach(item => {
          if (item.checkId > -1) {
            let ref = _this.$refs["my" + item.checkId][0];
            ref.style.transition = item.transition;
            ref.style.left = item.left + "px";
            ref.style.top = item.top + "px";
            ref.style.opacity = "1";
            ref.style.transform = "scale(0.5)";
          }
        });
        setTimeout(() => {
          this.myNum = [];
        }, 2000);
      });
    },
    //其他人下注飞入动画
    otherCoin(num) {
      num = 10;
      // otherUser
      let _this = this,
        pres = this.$refs.progressAmit, //进度条
        coin = this.$refs.otherUser, //金币
        w = coin.offsetWidth, //金币宽
        h = coin.offsetHeight, //金币高
        // left = getElementDL(pres, "left") - getElementDL(coin, "left") + 150,
        // left =
        //   getElementDL(pres, "left") -
        //   getElementDL(coin, "left") +
        //   pres.offsetWidth *
        //     (this.detail.purchasedNumber / this.detail.totalNumber) -
        //   20,

        left =
          getElementDL(pres, "left") -
          getElementDL(coin, "left") +
          pres.offsetWidth *
            (this.detail.purchasedNumber / this.detail.totalNumber) -
          14,
        top = getElementDL(pres, "top") - getElementDL(coin, "top") - 10,
        newArr = [];

      for (let i = 0; i < num; i++) {
        this.coinId++;
        let obj = {
          left: left,
          top: top,
          transition: "all " + randomNum(4, 25) / 10 + "s ease",
          chip: 10,
          checkId: this.coinId
        };
        newArr.push(obj);
      }
      this.otherNum = newArr;

      this.$nextTick(() => {
        _this.otherNum.forEach(item => {
          if (item.checkId > -1) {
            let ref = _this.$refs["other" + item.checkId][0];
            ref.style.transition = item.transition;
            ref.style.left = item.left + "px";
            ref.style.top = item.top + "px";
            ref.style.opacity = "1";
            ref.style.transform = "scale(0.5)";
          }
        });
        setTimeout(() => {
          this.otherNum = [];
        }, 2000);
      });
    },
    judgIsResult(result) {
      if (!result) {
        this.showResult = -1;
      } else {
        if (result.result) {
          if (result.result === -2) {
            this.showResult = 0;
          } else {
            this.showResult = 1;
          }
        } else {
          this.showResult = -1;
        }
      }
    },
    showResultDialog() {
      this.judgIsResult(this.resultData);
      // this.showResult = true;
    },
    CloseResultDialog() {
      this.isEnableShow = false;
      this.showResult = -1;
    },
    showWaitDialog() {
      this.showWait = true;
    },
    CloseWait() {
      this.showWait = false;
    },
    pause() {
      // alert("pause");
    },
    resume() {
      // alert("resume");
    },

    ...mapActions(["setLocalGameName"])
  }
};
</script>

<style scoped lang="stylus">
@import './style.styl';
</style>
