<template>
  <header>
    <div class="leftAvatar">
      <p class="avatar" @click="showLoginReg">
        <img :src="userInfo.head || defaultHead" alt>
      </p>
      <p class="nick">{{this.userInfo.nick}}</p>
      <PkGroup class="pkGroup" :showFun="showRecharge"/>
    </div>

    <div class="rightModal">
      <p @click="showPayDialog" v-if="needPay == 1">
        <img src="~assets/Images/icon_zhuanzhang@3x.png" alt>
        转账
      </p>
      <p @click="showRecharge">
        <img src="~assets/Images/home_cz.png" alt>
        充值
      </p>
      <p @click="showWithdrawal">
        <img src="~assets/Images/icon_tx.png" alt>
        提现
      </p>
      <p @click="fullScreenAction" v-if="app_type != '1'">
        <img :src="isFullSceen?outfullScreenImg:intofullScreenImg" alt>
        全屏
      </p>
    </div>
    <Recharge ref="Recharge"></Recharge>
    <LoginReg v-if="isShowLogin" @close="closeReg"></LoginReg>
    <WithDrawal ref="WithDrawal"></WithDrawal>
    <PayDialog v-if="showPay" @close="closePay"></PayDialog>
  </header>
</template>

<script>
import PkGroup from "./PkGroup";
import Recharge from "components/Modal/Recharge";
import LoginReg from "components/Modal/loginReg";
import WithDrawal from "components/Modal/WithDrawal";
import PayDialog from "components/Modal/PayDialog";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      app_type: this.$lStore.get("app_type"),
      isFullSceen: false,
      show: false,
      defaultHead: require("../../assets/Images/defaultHead.png"),
      intofullScreenImg: require("../../assets/Images/into_fullScreen.png"),
      outfullScreenImg: require("../../assets/Images/out_fullScreen.png"),
      showPay: false, //转账弹窗
      needPay: 0 //不显示转账按钮
    };
  },
  computed: {
    ...mapState(["userInfo", "isShowLogin", "showLeftNav", "token"])
  },
  watch: {
    token(newToken){
      if(newToken){
        this.checkPayBtn();
      }
    }
  },
  components: { PkGroup, Recharge, LoginReg, WithDrawal, PayDialog },
  mounted() {
    if(this.token){
      this.checkPayBtn();
    }
  },
  methods: {
    showRecharge() {
      this.CheckToken(1);
    },
    close() {
      this.$clickAudio();
      this.show = false;
    },
    closeReg() {
      this.$clickAudio();
      this.updatedIsShowLogin(false);
    },
    closePay() {
      this.$clickAudio();
      this.showPay = false;
    },
    showLoginReg() {
      this.$clickAudio();
      var token = this.$lStore.get("Token");
      if (!token) {
        this.updatedIsShowLogin(true);
      } else {
        this.$router.push("/user_info");
      }
    },
    showWithdrawal() {
      this.CheckToken(2);
    },
    showPayDialog() {
      //  this.$clickAudio()
      this.CheckToken(3);
    },
    //验证是否显示转账按钮
    checkPayBtn() {
      if (!this.$lStore.get("Token")) return;
      this.$ajax(
        {
          url: "/uac/user/showButtonStatu",
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
            console.log(res.data);
            this.needPay = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //验证TOKEN
    CheckToken(type) {
      var token = this.$lStore.get("Token");
      if (!token) {
        this.updatedIsShowLogin(true);
      } else {
        //type:1 点击充值  2：点击提现
        this.$ajax(
          {
            url: "/uac/user/checkToken",
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
              if (type === 1) {
                this.$refs.Recharge.show();
              } else if (type == 2) {
                this.$refs.WithDrawal.show();
              } else if (type == 3) {
                this.showPay = true;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //全屏按钮点击操作
    fullScreenAction() {
      if (this.isFullSceen) {
        this.outFullScreen();
      } else {
        this.intoFullScreen();
      }
      setTimeout(() => {
        this.isFullSceen = !this.isFullSceen;
      }, 200);
    },
    //进入全屏
    intoFullScreen() {
      //safari 不支持
      var docElm = document.documentElement; //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } //IE11
      else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }

      return;
    },
    //退出全屏
    outFullScreen() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitExitFullscreen
        ? document.webkitExitFullscreen()
        : "";
      return;
    },
    ...mapActions(["updatedUserInfo", "updatedIsShowLogin"])
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
header {
  height: 0.808989rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.359551rem;
  background: url('../../assets/Images/home_top_bg.png') 0 0 / 100% 100% no-repeat !important;
  .leftAvatar {
    display: flex;
    align-items: center;
    .avatar {
      border-radius: 50%;
      width: 0.599251rem;
      height: 0.599251rem;
      border: 2px rgba(255, 255, 255, 0.6) solid;
      vertical-align: middle;
      text-align: center;
      overflow: hidden;
      position: relative;
      img {
        position: absolute;
        top: -1.5%;
        left: -1.5%;
        width: 103%;
        height: 103%;
      }
    }
    .nick {
      margin-left: 0.11985rem;
      font-size: 0.209738rem;
      font-weight: 400;
      color: #fff;
    }
    .pkGroup {
      margin-top: -0.239701rem;
    }
  }
  .rightModal {
    display: flex;
    margin-top: -0.239701rem;
    p {
      display: flex;
      align-items: center;
      color: #95b1d7;
      font-size: 0.179775rem;
      text-shadow: #0b1239 0 0.022472rem;
      margin-right: 0.299625rem;
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 0.479401rem;
        height: 0.479401rem;
        margin-right: 0.059925rem;
        margin-top: -0.029963rem;
      }
    }
  }
}
</style>