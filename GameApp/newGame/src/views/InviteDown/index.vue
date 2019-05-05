<template>
  <div class="Wrapp">
    <div v-if="showShareDialog" class="share_dilog" @click.stop="changeShareDialog(false)">
      <div class="share_content">
        <img class="share_title" src="~assets/Images/invitedown/title@3x.png">
        <p class="show_share_url">
          {{shareUrl}}
          <img class="copy_ok" src="~assets/Images/invitedown/icon_copy_ok@3x.png">
        </p>
        <p class="share_explain">下载链接复制成功后，成功邀请朋友参与游戏后，最高可获得1.5%流水金额返佣。</p>
        <div class="share_platfoms">
          <a :href="downloadUrl" download="img">
            <img
              class="save_img"
              src="~assets/Images/invitedown/save@3x.png"
              @click.stop="saveImage()"
            >
          </a>
          <img
            class="weixin"
            src="~assets/Images/invitedown/wechat@3x.png"
            @click.stop="openApp(0)"
          >
          <img
            class="friend"
            src="~assets/Images/invitedown/moments@3x.png"
            @click.stop="openApp(0)"
          >
          <img class="qq" src="~assets/Images/invitedown/QQ@3x.png" @click.stop="openApp(1)">
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="header">
        <div class="back" @click="back()">
          <img class="back_img" src="~assets/Images/invitedown/icon_back@3x.png" alt>
          <p>返回</p>
        </div>
        <p class="title">{{title}}</p>
      </div>

      <div class="content">
        <div class="content_l">
          <!-- 左侧列表 -->
          <ul class="subWrap_l">
            <li class="li" v-for="item in subList" :key="item.id" @click.stop="selectIcon(item)">
              <div class="hight_light_back" v-if="checkIcon === item.id">
                <p>{{item.value}}</p>
              </div>
              <div v-else class="default_back">
                <p>{{item.value}}</p>
              </div>
              <img class="line" src="~assets/Images/invitedown/icon_line.png">
            </li>
          </ul>
        </div>
        <div class="content_r">
          <!-- 邀请福利 -->
          <div v-if="checkIcon === 0" class="fuli">
            <div class="player_code">
              <div class="player_info">
                <div class="player_level">
                  <img :src="getIconMy(masterLevel.code)">
                </div>
                <div class="player_info_r">
                  <div class="player_info_top">
                    <p class="key">当前等级</p>
                    <p class="value">{{masterLevel.msg}}</p>
                  </div>
                  <div class="player_info_bottom">
                    <p class="key">付费徒弟/总徒弟数：</p>
                    <p class="value">{{inviteData.payPersonNumber}}/{{inviteData.personNumber}}</p>
                    <p class="key_fan">返佣比例：</p>
                    <p class="value_fan">{{inviteData.rebate * 100}}%</p>
                  </div>
                </div>
              </div>

              <div class="code_info">
                <p class="exp">邀请码</p>
                <p
                  class="code_num"
                  @click="ClickCopy('code' ,inviteData.invitationCode)"
                >{{inviteData.invitationCode}}</p>
                <img
                  class="code_invite"
                  src="~assets/Images/invitedown/icon_invite@3x.png"
                  @click="toShare()"
                >
              </div>
            </div>

            <div class="liushui_money">
              <div class="week_money">
                <div class="week_bets">
                  <img src="~assets/Images/invitedown/coins_3@3x.png">
                  <p class="explain">本周流水金额</p>
                  <p class="week_bets_num">{{inviteData.theWeekRunningWaterNumber | numFormat}} PK</p>
                </div>
                <div class="week_fuli">
                  <img src="~assets/Images/invitedown/icon_box@3x.png">
                  <p class="explain">本周已获福利</p>
                  <p class="week_fuli_num">{{inviteData.theWeekRebateNumber | numFormat}} PK</p>
                </div>
              </div>
              <div class="total_money">
                <div class="total_bets">
                  <img src="~assets/Images/invitedown/coins_3@3x.png">
                  <p class="explain">累计流水</p>
                  <p
                    class="total_bets_num"
                  >{{inviteData.referralsRunningWaterNumber | numFormat}} PK</p>
                </div>
                <div class="total_fuli">
                  <img src="~assets/Images/invitedown/icon_box@3x.png">
                  <p class="explain">累计返佣</p>
                  <p class="total_fuli_num">{{inviteData.totalRebateNnumber | numFormat}} PK</p>
                </div>
              </div>
            </div>

            <div class="shifu_info">
              <div class="progress_detail">
                <div class="progress_img" ref="progressAmit">
                  <div
                    class="progressGroup"
                    v-bind:style="{transform:progressClass(inviteData.theWeekRunningWaterNumber / masterDetail.requerNumber)}"
                  >
                    <p class="main_progress"></p>
                  </div>
                </div>
                <p class="progress_finish" v-if="isFinish()">已达标</p>
                <p class="progress_explain" v-else>
                  付费徒弟
                  <span>{{getChaNum(5 - inviteData.payPersonNumber)}}</span>
                  周流水
                  <span>{{getTargetNum(masterDetail.requerNumber - inviteData.theWeekRunningWaterNumber)}}</span>
                  &nbsp;
                  <span>{{getLevelType()}}</span>
                  <!-- 并获得
                  <span>{{masterDetail.reBatePer}}%</span>返佣福利-->
                </p>
              </div>
              <div class="shifu_details">
                <p class="empty_p"
                 v-if="!showLeftImg">
                 </p>
                <img
                  v-if="showLeftImg && showActiveImg"
                  class="change_img_active"
                  src="~assets/Images/signnew/arrow_left.gif"
                  @click="lookPreLevel()"
                >
                <img
                  v-else-if="showLeftImg && !showActiveImg"
                  class="change_img"
                  src="~assets/Images/invitedown/btn_left@3x.png"
                  @click="lookPreLevel()"
                >
                <div class="shifu_level_detai">
                  <div class="shifu_l">
                    <div class="shifu_l_icon">
                      <img class="shifu_level_icon" :src="masterDetail.masterIcon">
                      <div class="name_level">
                        <p class="name">{{masterDetail.masterNick}}</p>
                        <p class="level">{{masterDetail.level}}</p>
                      </div>
                    </div>
                    <p class="requst">
                      累计
                      <span>{{masterDetail.requirNum}}个</span>付费徒弟且周流水
                      <span>{{masterDetail.requerNumber | unitConvert}}</span>PK
                    </p>
                  </div>
                  <div class="shifu_r">
                    <div class="shifu_r_top">
                      <div class="back_icon">
                        <img class="img_icon" src="~assets/Images/invitedown/coins_3@3x.png">
                      </div>
                      <p>
                        徒弟可获得
                        <span>{{masterDetail.rebatePkNum}}</span>PK
                      </p>
                    </div>
                    <div class="shifu_r_bottom">
                      <div class="back_icon">
                        <img class="img_icon" src="~assets/Images/invitedown/icon_position@3x.png">
                      </div>
                      <p>
                        师傅可获得徒弟流水金额的
                        <span>{{masterDetail.reBatePer}}%</span>返佣
                      </p>
                    </div>
                  </div>
                </div>
                <p class="empty_p"
                 v-if="!showRightImg">
                 </p>
                <img
                  v-if="showRightImg && showActiveImg"
                  class="change_img_active"
                  src="~assets/Images/signnew/arrow_right.gif"
                  @click="lookNextLevel()"
                >
                <img
                  v-else-if="showRightImg && !showActiveImg"
                  class="change_img"
                  src="~assets/Images/invitedown/btn_right@3x.png"
                  @click="lookNextLevel()"
                >
              </div>
            </div>
          </div>
          <!-- 徒弟列表 -->
          <div v-else-if="checkIcon === 1" class="list_content">
            <ul class="master_header">
              <li
                class="title_li"
                v-for="item in titleList"
                :key="item.id"
                @click.stop="selectTitleIcon(item)"
              >
                <p class="title_sel" v-if="checkTitleIcon === item.id">{{item.value}}</p>
                <p v-else class="title_def">{{item.value}}</p>
                <!-- <div class="title_sel" v-if="checkTitleIcon === item.id">
                <p>{{item.value}}</p>
              </div>
              <div v-else class="title_def">
                <p>{{item.value}}</p>
                </div>-->
              </li>
            </ul>
            <ul class="master_info">
              <li class="info_li" v-for="(item, index) in masterInfoList" :key="index">
                <p>{{item}}</p>
              </li>
            </ul>

            <div class="master_list">
              <ScrollH
                :data="shituList"
                pullup
                @scrollToEnd="getShiTuList(false)"
                :scrollToEndFlag="false"
              >
                <ul v-if="shituList.length">
                  <li v-for="(item, index) in shituList" :key="item.userId">
                    <div class="item-shitu">
                      <p class="sort">{{index + 1}}</p>
                      <p class="user_name">{{item.nick}}</p>
                      <p class="number">{{HiddenPhoneNum(item.mobile)}}</p>
                      <p class="fuli_num">{{item.rebateNumber}}PK</p>
                    </div>
                    <div class="item_line"></div>
                  </li>
                </ul>
                <p v-else class="notData">暂无数据</p>
              </ScrollH>
            </div>
          </div>
          <!-- 收徒说明 -->
          <div v-else class="explain_content">
            <ScrollH>
              <p class="explain_title">1.如何收徒？</p>
              <p class="explain_p">
                将自己的邀请链接或邀请码发送给好友，好友通过您的邀请链接进行注册或
                注册时填写您的邀请码，新用户注册成功即为收徒成功。本活动仅限未注册过“币猜”的账号，且一个
                账号注册时只能拜师一次。
              </p>
              <p class="explain_title">2.如何获得返佣？</p>
              <p class="explain_p">
                收徒成功后，徒弟需参与游戏，您才可获得对应师傅等级返佣。师傅等级越高，
                返佣比例越高。返佣以PK币形式发放。徒弟参与游戏后，系统将实时发放返佣福利。
              </p>
              <p class="explain_title">3.师傅等级何时更新？</p>
              <p
                class="explain_p"
              >从普通玩家升级至青铜师傅，实时更新；青铜师傅以上等级，每周一0点统计上周数据情况，更新师傅等级。青铜师傅是最初级师傅，成为青铜师傅后不会降级，始终能获得返佣。</p>
              <p class="explain_title">4.如何才算付费徒弟？</p>
              <p class="explain_p">徒弟参与充值，达到最低额度，充值一笔成功后即可视为付费徒弟。</p>
            </ScrollH>
          </div>
        </div>
      </div>
    </div>
    <div class="fenxiang" ref="fenxiang">
      <img class="fenxiangBg" src="../../assets/Images/invitedown/fenx.jpg" alt>
      <div id="qrcode"></div>
    </div>
  </div>
</template>

<script>
import ScrollH from "components/ScrollH";
import star0 from "Images/invitedown/icon_star0@3x.png";
import star1 from "Images/invitedown/icon_star1@3x.png";
import star2 from "Images/invitedown/icon_star2@3x.png";
import star3 from "Images/invitedown/icon_star3@3x.png";
import star4 from "Images/invitedown/icon_star4@3x.png";
import copy from "copy-to-clipboard";
import Inp from "components/LeftNav";
import { unitConvert, isIos, IsPC,isPhone,isEmail } from "common/func";
import { mapState } from "vuex";
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2"; // 引入qrcode
import ENV from "common/Api/ENV";
export default {
  data() {
    return {
      title: "收徒福利",
      subList: [
        { value: "收徒福利", id: 0 },
        { value: "徒弟列表", id: 1 },
        { value: "收徒说明", id: 2 }
      ],

      titleList: [{ value: "本周福利", id: 1 }, { value: "总福利", id: 0 }],
      checkTitleIcon: 1, //切换福利
      page: 1,
      size: 20,
      masterInfoList: ["排行", "用户名", "账户", "获得福利"],
      shituList: [],
      canLoadData: true, //是否能加载数据
      checkIcon: 0,
      suRigData: {},
      inviteData: {}, //邀请福利数据
      masterLevel: {}, //用户等级
      myLevel: 0, //我的等级
      selectLevel: 1, //当前选择的等级
      downloadUrl: null,
      masterDetail: {
        //师傅详情区域数据
        requerNumber: 50000, //升级需要的周流水
        reBatePer: 0.2, //升级后可返现
        masterNick: "", //称号
        level: "",
        requirNum: 5,
        rebatePkNum: 100,
        masterIcon: null
      },
      showShareDialog: false,
      shareUrl: "",
      showActiveImg: false,
      showLeftImg: false,
      showRightImg: true,
      timer: null
    };
  },
  components: {
    ScrollH,
    Inp
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.getShareUrl();
    this.getInviteData();
    this.initMasterDetail();
    this.$lStore.set("checkFuli");
    timer = setInterval(() => {
      this.showActiveImg = !this.showActiveImg;
    }, 2000);
    this.setImgShow();
  },
  destroyed(){
    clearInterval(timer);
  },
  methods: {
    qrcode(url) {
      let qrcode = new QRCode("qrcode", {
        width: 242,
        height: 242,
        text: url, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    back() {
      this.$clickAudio();
      this.$router.push("/index");
    },
    toShare() {
      html2canvas(this.$refs.fenxiang).then(canvas => {
        let dataURL = canvas.toDataURL("image/jpeg");
        this.downloadUrl = dataURL;
      });
      this.ClickCopy("url", this.shareUrl);
      this.changeShareDialog(true);
    },
    changeShareDialog(bool) {
      this.showShareDialog = bool;
    },
    ClickCopy(type, copyData) {
      copy(copyData);
      if (type === "url") {
        // this.$toast("地址复制成功");
      } else {
        this.$clickAudio();
        this.$toast("邀请码复制成功");
      }
    },
    saveImage() {
      let _this = this;
      this.$clickAudio();
      let urlAndroid =
        ENV.getENV().httpApi + "/uac/resource/qrcode?text=" + this.shareUrl;
      if (isIos()) {
        window.webkit.messageHandlers.NativeMethod.postMessage(
          `saveQRImage:${urlAndroid}`
        );
      } else {
        window.openApp.saveQRImage(urlAndroid);
      }
    },
    selectIcon(item) {
      this.$clickAudio();
      let type = item.id;
      this.title = item.value;
      this.checkIcon = type;
      console.log(this.checkIcon);
      this.suRigData = {};
      if (type === 0) {
        //邀请福利
        this.getInviteData();
      } else if (type === 1) {
        //徒弟列表
        this.getShiTuList(true);
      }
    },
    selectTitleIcon(item) {
      this.$clickAudio();
      if (this.checkTitleIcon === item.id) return;
      this.checkTitleIcon = item.id;
      this.getShiTuList(true);
      // if (checkTitleIcon === 0) {
      //   //总福利
      // } else if (checkTitleIcon === 1) {
      //   //本周福利
      // }
    },
    initMasterDetail() {
      switch (this.selectLevel) {
        case 1:
          this.masterDetail.reBatePer = 0.2;
          this.masterDetail.requerNumber = 50000;
          this.masterDetail.masterNick = "青铜师傅";
          this.masterDetail.level = "等级一";
          this.masterDetail.requirNum = 5;
          this.masterDetail.rebatePkNum = 100;
          this.masterDetail.masterIcon = star1;
          return this.masterDetail;
        case 2:
          this.masterDetail.reBatePer = 0.4;
          this.masterDetail.requerNumber = 600000;
          this.masterDetail.masterNick = "白银师傅";
          this.masterDetail.level = "等级二";
          this.masterDetail.requirNum = 5;
          this.masterDetail.rebatePkNum = 100;
          this.masterDetail.masterIcon = star2;
          return this.masterDetail;
        case 3:
          this.masterDetail.reBatePer = 0.8;
          this.masterDetail.requerNumber = 5000000;
          this.masterDetail.masterNick = "黄金师傅";
          this.masterDetail.level = "等级三";
          this.masterDetail.requirNum = 5;
          this.masterDetail.rebatePkNum = 100;
          this.masterDetail.masterIcon = star3;
          return this.masterDetail;
        case 4:
          this.masterDetail.reBatePer = 1.5;
          this.masterDetail.requerNumber = 30000000;
          this.masterDetail.masterNick = "铂金师傅";
          this.masterDetail.level = "等级四";
          this.masterDetail.requirNum = 5;
          this.masterDetail.rebatePkNum = 100;
          this.masterDetail.masterIcon = star4;
          return this.masterDetail;
      }
    },
    openApp(flag) {
      try {
        if (flag === 0) {
          this.$openWechatApp(flag);
        } else {
          this.$openQQApp(flag);
        }
      } catch (err) {
        this.$toast(`${err}`);
      }
    },
     setImgShow() {
      if (this.selectLevel <= 1) {
        this.showLeftImg = false;
      } else {
        this.showLeftImg = true;
      }
      if (this.selectLevel >= 4) {
        this.showRightImg = false;
      } else {
        this.showRightImg = true;
      }
    },
    lookPreLevel() {
      this.selectLevel = this.selectLevel - 1;
      if (this.selectLevel < 1) {
        this.selectLevel = 1;
      } else {
        this.$clickAudio();
      }
      this.setImgShow();
      this.initMasterDetail();
    },
    lookNextLevel() {
      this.selectLevel = this.selectLevel + 1;
      if (this.selectLevel > 4) {
        this.selectLevel = 4;
      } else {
        this.$clickAudio();
      }
      this.setImgShow();
      this.initMasterDetail();
    },
    getIconMy(level) {
      switch (level) {
        case 0:
          return star0;
        case 1:
          return star1;
        case 2:
          return star2;
        case 3:
          return star3;
        case 4:
          return star4;
      }
    },
    //分享地址
    getShareUrl() {
      //查询域名
      this.$ajax(
        {
          url: "/uac/user/selectURL",
          data: {
            params: {
              urlType: 1
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            let shareUrl = res.data + this.userInfo.invitationCode;
            //安卓IOS 用的 注册二维码  @IOS_AND
            let IOS_AND =
              ENV.getENV().httpApi + "/uac/resource/qrcode?text=" + shareUrl;
            console.log(shareUrl);
            this.qrcode(shareUrl);
            // this.saveImage();
            this.shareUrl = shareUrl;
          }
        })
        .catch(err => {
          console.log("查询域名错误结果：" + err);
        });
    },
    //邀请福利数据获取
    getInviteData() {
      this.$ajax(
        {
          url: "/uas/userAssets/selectUserWelfareInfo",
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
            this.inviteData = {};
            this.inviteData = res.data;
            this.masterLevel = res.data.masterLevel;
            this.myLevel = res.data.masterLevel.code;
            this.selectLevel = res.data.masterLevel.code + 1;
            if (this.selectLevel > 4) {
              this.selectLevel = 4;
            }
            this.initMasterDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //师徒列表数据获取
    getShiTuList(isRefresh) {
      if (!this.canLoadData) return;
      this.canLoadData = false;
      if (isRefresh) {
        this.page = 1;
      }
      this.$ajax(
        {
          url: "/uas/userAssets/selectReferralsList",
          data: {
            params: {
              type: this.checkTitleIcon,
              size: this.size,
              page: this.page,
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          this.canLoadData = true;
          if (res.code === 0) {
            if (isRefresh) {
              this.page = 1;
              this.shituList = [];
            }
            if (res.data.size === 0 && this.page === 1) {
              this.shituList = [];
            } else if (res.data.size > 0) {
              this.page = this.page + 1;
              this.shituList = this.shituList.concat(res.data.list);
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

    progressClass() {
      let X =
        (this.inviteData.theWeekRunningWaterNumber /
          this.masterDetail.requerNumber) *
        100;

      if (this.isFinish()) {
        X = 100;
      } else {
        if (this.myLevel < this.selectLevel) {
          if (this.inviteData.payPersonNumber < 5) {
            if (
              this.inviteData.theWeekRunningWaterNumber >=
              this.masterDetail.requerNumber
            ) {
              X = 90;
            }
          } else {
            if (
              this.inviteData.theWeekRunningWaterNumber >=
              this.masterDetail.requerNumber
            ) {
              X = 100;
            }
          }
        } else {
          if (this.selectLevel === 1) {
            X = 100;
          }
        }
      }

      if (X > 4) {
        return `translateX(${X - 100}%)`;
      } else {
        return `translateX(-96%)`;
      }
    },
    getChaNum(num) {
      if (this.myLevel === 1) {
        if (this.selectLevel === this.myLevel) {
          return "已达标";
        } else {
          return num <= 0 ? "已达标" : "还差" + num + "个";
        }
      } else {
        return num <= 0 ? "已达标" : "还差" + num + "个";
      }
    },
    getTargetNum(num) {
      if (this.myLevel === 1) {
        if (this.selectLevel === this.myLevel) {
          return "已达标";
        } else {
          return num <= 0 ? "已达标" : "还差" + unitConvert(num) + "PK";
        }
      } else {
        return num <= 0 ? "已达标" : "还差" + unitConvert(num) + "PK";
      }
    },
    getLevelType() {
      if (this.myLevel === 1) {
        if (this.selectLevel === this.myLevel) {
          return "";
        } else {
          if (this.myLevel < this.selectLevel) {
            return "即可升级";
          } else {
            return "即可保级";
          }
        }
      } else {
        if (this.myLevel < this.selectLevel) {
          return "即可升级";
        } else {
          return "即可保级";
        }
      }
    },
    isFinish() {
      if (this.myLevel === 1) {
        if (this.selectLevel === 1) {
          return true;
        } else {
          return false;
        }
      } else if (this.myLevel > 1) {
        if (this.myLevel > this.selectLevel) {
          return true;
        } else {
          return this.judgeTudiWeekWater();
        }
      } else {
        return this.judgeTudiWeekWater();
      }
    },
    //判断徒弟数量跟周流水是否达标
    judgeTudiWeekWater() {
      if (this.inviteData.payPersonNumber < 5) {
        //付费徒弟不足5个
        return false;
      } else {
        return (
          this.inviteData.theWeekRunningWaterNumber >=
          this.masterDetail.requerNumber
        );
      }
    },
    //隐藏手机号
    HiddenPhoneNum(accountNumber) {
      if (accountNumber) {
        var reg;
        if (isPhone(accountNumber)){
          var reg = /^(\d{3})\d{4}(\d{4})$/;   //手机号变星号
        } else {
          var reg = /(.{2}).+(.{2}@.+)/g; //邮箱变星号
        }
        var tel = accountNumber;
        tel = tel.replace(reg, "$1****$2");
        return tel;
      }
    },
  }
};
</script>

<style scoped lang="stylus">
.fenxiang {
  position: fixed;
  top: 100%;
  left: 0;
  width: 750px;
  height: 1334px;
  .fenxiangBg {
    width: 100%;
    height: 100%;
  }
  #qrcode {
    position: absolute;
    top: 650px;
    left: 62px;
    background-color: #fff;
    padding: 6px;
    width: 254px;
    height: 254px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.Wrapp {
  width: 100%;
  height: 100%;
  .share_dilog {
    background-color: rgba(17, 23, 62, 0.5);
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    justify-content: center;
    align-items: center;
    .share_content {
      background: url('../../assets/Images/invitedown/share_icon@3x.png') 0 0 / 100% 100% no-repeat;
      width: 6.561798rem;
      height: 3.985019rem;
      display: flex;
      // align-items: center;
      // justify-content: center;
      flex-direction: column;
      padding-bottom: 0.2397rem;
      padding-left: 0.269663rem;
      .share_title {
        height: 0.374532rem;
        width: 3.146067rem;
        margin-top: 0.82397rem;
      }
      .show_share_url {
        color: #cbcfff;
        font-size: 0.179775rem;
        height: 0.539326rem;
        width: 4.044943rem;
        padding-left: 0.074906rem;
        background-color: #0f0c34;
        border: 1px solid #0f0c34;
        border-radius: 0.044944rem;
        display: flex;
        align-items: center;
        margin-top: 0.074906rem;
        .copy_ok {
          position: relative;
          height: 0.479401rem;
          left: 0.13483rem;
        }
      }
      .share_explain {
        color: #cbcfff;
        font-size: 0.179775rem;
        letter-spacing: 0.014981rem;
        line-height: 0.269663rem;
        width: 4.194756rem;
        margin-top: 0.269663rem;
      }
      .share_platfoms {
        display: flex;
        align-items: center;
        height: 0.779026rem;
        padding-top: 0.299625rem;
        .save_img, .weixin, .friend, .qq {
          height: 0.629213rem;
          width: 0.629213rem;
        }
        .weixin {
          margin-left: 0.194757rem;
        }
        .friend {
          margin-left: 0.194757rem;
        }
        .qq {
          margin-left: 0.194757rem;
        }
      }
    }
  }
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      height: 0.674157rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      background: url('../../assets/Images/invitedown/bg_top@3x.png') 0 0 / 100% 100% no-repeat;
      .title {
        color: #fefeff;
        font-size: 0.2397rem;
      }
      .back {
        display: flex;
        background: url('../../assets/Images/invitedown/bg_back@3x.png') 0 0 / 100% 100% no-repeat;
        align-items: center;
        height: 0.674157rem;
        width: 1.797753rem;
        padding-left: 0.269663rem;
        color: #95b1d7;
        font-size: 0.179775rem;
        position: absolute;
        left: 0;
        top: 0;
        .back_img {
          width: 0.389513rem;
          height: 0.374532rem;
        }
        p {
          margin-left: 0.059925rem;
        }
      }
    }
    .content {
      display: flex;
      height: 100%;
      .content_l {
        width: 1.40824rem;
        height: 100%;
        background: url('../../assets/Images/invitedown/bg_left@3x.png') 0 0 / 100% 100% no-repeat;
        .subWrap_l {
          width: 1.40824rem;
          color: #acb3e2;
          font-size: 0.209738rem;
          padding-top: 0.044944rem;
          .li {
            width: 1.40824rem;
            height: 0.659176rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .hight_light_back {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 0.659176rem;
              width: 100%;
              background: url('../../assets/Images/invitedown/btn_bg_select@3x.png') 0 0 / 100% 100% no-repeat;
              p {
                color: #fff;
                text-shadow: 1px 1px 3px #ab4d15;
              }
            }
            .default_back {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 0.659176rem;
              width: 100%;
              p {
                // text-shadow: 1px 1px 1px #acb3e2;
              }
            }
            .line {
              width: 100%;
            }
          }
        }
      }
      .content_r {
        width: 100%;
        height: 100%;
        background-color: #282d57;
        display: flex;
        align-items: center;
        justify-content: center;
        .fuli {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0.149813rem 0;
          padding-right: 0.269663rem;
          justify-content: space-around;
          .player_code {
            display: flex;
            width: 100%;
            height: 1.108614rem;
            align-items: center;
            padding-right: 0.269663rem;
            justify-content: space-between;
            .player_info {
              display: flex;
              align-items: center;
              height: 0.853933rem;
              // background: url('../../assets/Images/invitedown/bg_player_info@3x.png') 0 0 / 100% 100% no-repeat;
              .player_level {
                background: url('../../assets/Images/invitedown/bg_level@3x.png') 0 0 / 100% 100% no-repeat;
                height: 1.108614rem;
                width: 1.108614rem;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                top: 0;
                left: 0.224719rem;
                z-index: 1;
                img {
                  height: 0.898877rem;
                  width: 0.898877rem;
                }
              }
              .player_info_r {
                display: flex;
                flex-direction: column;
                padding-left: 0.389513rem;
                padding-right: 0.149813rem;
                height: 0.853933rem;
                justify-content: space-around;
                color: #a0a7d4;
                font-size: 0.179775rem;
                text-shadow: 1px 1px 3px #02033b;
                // width :60%;
                background: url('../../assets/Images/invitedown/bg_player_info@3x.png') 0 0 / 100% 100% no-repeat;
                .player_info_top {
                  display: flex;
                  align-items: center;
                  .value {
                    color: #f4de79;
                    font-size: 0.2397rem;
                    margin-left: 0.029963rem;
                  }
                }
                .player_info_bottom {
                  display: flex;
                  align-items: center;
                  // justify-content: space-between;
                  .value {
                    color: #f4de79;
                    font-size: 0.209737rem;
                    // margin-left: 0.074906rem;
                  }
                  .key_fan {
                    margin-left: 0.074906rem;
                  }
                  .value_fan {
                    color: #fff;
                    font-size: 0.209737rem;
                    // margin-left: 0.074906rem;
                  }
                }
              }
            }
            .code_info {
              margin-left: 0.149813rem;
              width: 2.846443rem;
              height: 0.868914rem;
              display: flex;
              font-size: 0.164794rem;
              align-items: center;
              color: #906318;
              padding-left: 0.074907rem;
              background: url('../../assets/Images/invitedown/bg_invite@3x.png') 0 0 / 100% 100% no-repeat;
              // justify-content: space-between;
              .exp {
                width: 0.749065rem;
              }
              .code_num {
                color: #fff;
                font-size: 0.359551rem;
                text-shadow: 1px 1px 6px #b18a49;
                height: 0.868914rem;
                width: 1.498128rem;
                display: flex;
                align-items: center;
                padding-left: 0.044944rem;
                justify-content: center;
              }
              .code_invite {
                width: 0.70412rem;
                height: 0.70412rem;
                position: relative;
                right: -0.389512rem;
              }
            }
          }
          .liushui_money {
            display: flex;
            height: 1.228464rem;
            align-items: center;
            margin-right: 0.269663rem;
            margin-left: 0.299626rem;
            margin-top: 0.149812rem;
            margin-bottom: 0.149812rem;
            background: url('../../assets/Images/invitedown/bg_player_info@3x.png') 0 0 / 100% 100% no-repeat;
            color: #a0a7d4;
            font-size: 0.179775rem;
            padding-left: 0.149813rem;
            img {
              height: 0.314607rem;
              width: 0.314607rem;
            }
            .explain, .week_bets_num, .week_fuli_num, .total_bets_num, .total_fuli_num {
              margin-left: 0.134831rem;
            }
            .week_fuli_num, .total_bets_num, .total_fuli_num {
              color: #fff;
              font-size: 0.2397rem;
            }
            .week_bets_num {
              color: #f4de79;
              font-size: 0.2397rem;
            }
            .week_money {
              width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .week_bets {
                display: flex;
                margin-bottom: 0.089887rem;
                align-items: center;
              }
              .week_fuli {
                display: flex;
                margin-top: 0.089887rem;
                align-items: center;
              }
            }
            .total_money {
              display: flex;
              flex-direction: column;
              width: 50%;
              justify-content: center;
              .total_bets {
                display: flex;
                margin-bottom: 0.089887rem;
                align-items: center;
              }
              .total_fuli {
                display: flex;
                margin-top: 0.089887rem;
                align-items: center;
              }
            }
          }
          .shifu_info {
            display: flex;
            flex-direction: column;
            margin-right: 0.269663rem;
            margin-left: 0.299626rem;
            padding-left: 0.224719rem;
            height: 2.187266rem;
            justify-content: center;
            // background: url('../../assets/Images/invitedown/bg_player_info@3x.png') 0 0 / 100% 100% no-repeat;
            background-color :#373C7A;
            border :1px solid #373C7A;
            border-radius :0.074907rem;
            color: #a0a7d4;
            text-shadow: 1px 1px 3px #02093b;
            span {
              color: #f4de79;
            }
            .progress_detail {
              display: flex;
              align-items: center;
              height: 0.2397rem;
              padding-left: 0.374532rem;
              .progress_img {
                position: relative;
                height: 0.134831rem;
                width: 3.625469rem;
                background-color: #181c46;
                border-radius: 0.254682rem;
                border-color: #181c46;
                overflow: hidden;
                .progressGroup {
                  overflow: hidden;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  transform: translateX(-100%);
                  transition: all 2s ease;
                  .main_progress {
                    width: 100%;
                    height: 100%;
                    background-color: #fff38b;
                    border-radius: 0.254682rem;
                    border-color: #fff38b;
                  }
                }
                /* 鼠标滑过 */
                .image-light:hover:after {
                  -webkit-transition: left 1s ease-in-out;
                  /* 过渡 */
                  transition: left 1s ease-in-out;
                  left: 500px;
                  /* 结束位置 */
                }
              }
              .progress_explain {
                margin-left: 0.359551rem;
                line-height: 0.224719rem;
              }
              .progress_finish {
                color: #f4de79;
                margin-left: 0.359551rem;
                line-height: 0.224719rem;
              }
            }
            .shifu_details {
              display: flex;
              align-items: center;
              // justify-content: space-between;
              padding: 0.059925rem 0;
              padding-right: 0.224719rem;
              // width :100%;
              .empty_p{
                width: 0.224719rem;
                height: 0.359551rem;
                display: block;
              }
              .change_img {
                width: 0.224719rem;
                height: 0.359551rem;
                display: block;
              }
              .change_img_active {
                width: 0.224719rem;
                height: 0.359551rem;
                display: block;
              }
              .shifu_level_detai {
                display: flex;
                margin: 0 0.104869rem;
                // justify-content: space-between;
                width: 100%;
                .shifu_l {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  // padding :0.11985rem 0;
                  height: 1.468165rem;
                  width: 3.655431rem;
                  background-color: #2b2f57;
                  border: 1px solid #2b2f57;
                  border-radius: 0.044943rem;
                  padding: 0.11985rem 0;
                  .shifu_l_icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .shifu_level_icon {
                      height: 0.853933rem;
                      width: 0.853933rem;
                      margin-right: 0.11985rem;
                    }
                    .name_level {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      margin-left: 0.11985rem;
                      .name {
                        margin-bottom: 0.11985rem;
                        font-size: 0.209738rem;
                        color: #f4de79;
                        text-shadow: 1px 1px 3px #02093b;
                      }
                      .level {
                        margin-top: 0.11985rem;
                      }
                    }
                  }
                  .requst {
                    margin-top: 0.134832rem;
                  }
                }
                .shifu_r {
                  display: flex;
                  flex-direction: column;
                  margin-left: 0.359551rem;
                  padding-top: 0.074906rem;
                  justify-content: center;
                  .back_icon {
                    background: url('../../assets/Images/invitedown/bg_icon@3x.png') 0 0 / 100% 100% no-repeat;
                    height: 0.509363rem;
                    width: 0.509363rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .img_icon {
                      height: 0.374532rem;
                      width: 0.374532rem;
                    }
                  }
                  p {
                    margin-left: 0.149813rem;
                  }
                  .shifu_r_top {
                    display: flex;
                    align-items: center;
                  }
                  .shifu_r_bottom {
                    display: flex;
                    align-items: center;
                  }
                }
              }
            }
          }
        }
        .list_content {
          width: 100%;
          height: 90%;
          display: flex;
          flex-direction: column;
          margin: 0.314607rem 0.359551rem;
          font-size: 0.209738rem;
          color: #fff;
          .master_header {
            height: 0.539326rem;
            line-height: 0.539326rem;
            width: 100%;
            display: flex;
            align-items: center;
            // justify-content :space-around;
            .title_li {
              width: 100%;
              background-color: #363e76;
              display: flex;
              justify-content: center;
              height: 0.539326rem;
              .title_sel {
                background: url('../../assets/Images/invitedown/bg_tab_sel@3x.png') 0 0 / 100% 100% no-repeat;
                width: 100%;
                height: 0.539326rem;
                text-align: center;
                text-shadow: 1px 1px 3px #2a2f5b;
                height: 0.569289rem;
              }
              .title_def {
                color: #939bc6;
                text-shadow: 1px 1px 3px #02093b;
                height: 0.569289rem;
                text-align: center;
                width: 100%;
              }
            }
          }
          .master_info {
            display: flex;
            color: #959dc8;
            width: 100%;
            line-height: 0.599251rem;
            height: 0.599251rem;
            background-color: #282d57;
            .info_li {
              width: 100%;
              line-height: 0.599251rem;
              display: flex;
              p {
                width: 100%;
                height: 0.599251rem;
              }
              &:nth-child(1), &:nth-child(2) {
                width: 15%;
              }
              &:nth-child(3), &:nth-child(4) {
                width: 35%;
                height: 0.599251rem;
              }
              &:nth-child(1) {
                text-align: center;
              }
            }
          }
          .master_list {
            width: 100%;
            // height: 100%;
            flex: 1;
            display: flex;
            // align-items: center;
            flex-direction: column;
            color: #fff;
            background-color: #363e76;
            position: relative;
            .item-shitu {
              display: flex;
              line-height: 0.539326rem;
              text-overflow: ellipsis;
              .sort, .user_name {
                width: 15%;
              }
              .number, .fuli_num {
                width: 35%;
                color: #959dc8;
              }
              .fuli_num {
                color: #edd16c;
              }
              .sort {
                text-align: center;
              }
            }
            .item_line {
              background-color: #252a52;
              height: 1px;
              width: 100%;
            }
          }
          .notData {
            height: 0.419476rem;
            line-height: 0.419476rem;
            text-align: center;
            color: #edeaf7;
          }
        }
        .explain_content {
          // width: 8.404494rem;
          // height: 4.554306rem;
          width: 100%;
          height: 90%;
          display: flex;
          flex-direction: column;
          // margin: 0.224719rem 0.149813rem;
          background-color: #363e76;
          border: 1px solid #363e76;
          border-radius: 3px;
          font-size: 0.209738rem;
          color: #fff;
          overflow: hidden;
          margin: 0.149813rem 0.359551rem;
          .explain_title {
            font-weight: bold;
            color: #bdc4e7;
            margin-left: 0.269663rem;
            letter-spacing: 2.00003px;
            line-height: 0.419476rem;
          }
          .explain_p {
            text-indent: 0.269663rem;
            margin-left: 0.269663rem;
            margin-right: 0.269663rem;
            line-height: 0.359551rem;
          }
        }
      }
    }
  }
}
</style>
