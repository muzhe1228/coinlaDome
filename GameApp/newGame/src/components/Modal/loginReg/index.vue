<template>
  <transition name="dialog">
    <div class="dialog">
      <div class="modal" :style="styls">
        <img class="closeBtn" @click="close" src="~assets/Images/Login/icon_login_close.png" alt>
        <div class="modal-head">
          <p class="title">
            <img :src="titleType(step)" alt>
          </p>
        </div>
        <div class="content">
          <!-- 登录 -->
          <div class="login" v-if="step === 1">
            <div class="input_title">
              <p>账&nbsp;&nbsp;号</p>
              <input
                placeholder="请输入账号"
                v-model="mobile"
                @input="changeText(mobile)"
                @focus="changeText(mobile)"
              >
            </div>
            <div class="input_title">
              <p>密&nbsp;&nbsp;码</p>
              <input
                placeholder="请输入密码"
                type="password"
                class="login_psdInput"
                maxlength="20"
                v-model="loginPassword"
                @input="changeText(loginPassword)"
                @focus="changeText(loginPassword)"
                @keydown.enter="getClientToken(2)"
              >
              <span class="forgetPSD" @click="toStep(4)">忘记密码?</span>
            </div>
            <div class="btn" :class="canReqeust?'':'disable'" @click="getClientToken(2)">
              <p>登录</p>
            </div>
            <p class="bottom_small_btn" @click="toStep(2)">>>立即注册</p>
          </div>
          <!-- 注册第一步 -->
          <div class="login" v-else-if="step === 2">
            <div class="input_title">
              <p>账&nbsp;&nbsp;号</p>
              <input
                placeholder="请输入账号"
                v-model="mobile"
                @input="changeText(mobile)"
                @focus="changeText(mobile)"
              >
            </div>
            <div class="input_title">
              <p>验证码</p>
              <input
                placeholder="输入验证码"
                class="login_psdInput"
                maxlength="6"
                v-model="code"
                @input="changeText(code)"
                @focus="changeText(code)"
                @keydown.enter="checkCode(0)"
              >
              <span class="getCode" @click="sendCode(1)">{{btnText}}</span>
            </div>
            <div class="btn" @click="checkCode(0)">
              <p>下一步</p>
            </div>
            <p class="bottom_small_btn" @click="toStep(1)">>>返回登录</p>
          </div>
          <!-- 注册第二步 -->
          <div class="login" v-else-if="step === 3">
            <div class="input_title">
              <p>密&nbsp;&nbsp;码</p>
              <input
                placeholder="请输入密码"
                type="password"
                v-model="loginPassword"
                @input="changeText(loginPassword)"
                @focus="changeText(loginPassword)"
                @keydown.enter="getClientToken(1)"
              >
            </div>
            <div class="input_title">
              <p>邀请码</p>
              <input
                placeholder="输入邀请码"
                class="code_psdInput"
                maxlength="20"
                v-model="inviteCode"
                @input="changeText(inviteCode)"
                @focus="changeText(inviteCode)"
              >
            </div>
            <div class="btn" @click="getClientToken(1)">
              <p>注册</p>
            </div>
            <p class="bottom_small_btn" @click="toStep(2)">>>上一步</p>
          </div>
          <!-- 忘记密码 -->
          <div class="login" v-else-if="step === 4">
            <div class="resetPsd_account">
              <p class="resetPsd_account_title">账号</p>
              <p class="resetPsd_account_value">{{mobile}}</p>
            </div>
            <div class="input_title">
              <p>验证码</p>
              <input
                placeholder="输入验证码"
                class="login_psdInput"
                maxlength="6"
                v-model="code"
                @input="changeText(code)"
                @focus="changeText(code)"
                @keydown.enter="getClientToken(3)"
              >
              <span class="getCode" @click="sendCode(2)">{{btnText}}</span>
            </div>
            <div class="input_title">
              <p>密&nbsp;&nbsp;码</p>
              <input
                placeholder="请输入新的登录密码"
                class="login_psdInput"
                maxlength="20"
                type="password"
                v-model="loginPassword"
                @focus="changeText(loginPassword)"
                @input="changeText(loginPassword)"
              >
            </div>
            <div class="btn" @click="getClientToken(3)">
              <p>确定</p>
            </div>
            <p class="bottom_small_btn" @click="toStep(1)">>>上一步</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import comModal from "../newComm";
import Inp from "./Inp";
import Btn from "./Btn";
import {
  isPhone,
  isEmail,
  isPwd,
  isCode,
  isIos,
  IsPC
} from "../../../common/func";
import { mapMutations, mapActions, mapState } from "vuex";
import ENV from "common/Api/ENV";
export default {
  props: {
    intoGame: {
      type: Function
    }
  },
  data() {
    return {
      mobile: "",
      loginPassword: "",
      code: "",
      inviteCode: "",
      client: "web",
      styls: { height: "3.745318rem" },
      step: 1,
      btnText: "获取验证码",
      btnDisabled: false,
      googleToken: "",
      typeCode: null,
      clientType: "",
      md5Token: "",
      isApp: false, //是否从app打开
      canReqeust: true, //是否能请求登录，注册，忘记密码的接口
      loginTitleImg: require("../../../assets/Images/Login/login_title.png"),
      registTitleImg: require("../../../assets/Images/Login/regist_title.png"),
      restPSDTitleImg: require("../../../assets/Images/Login/resetpsd_title.png"),
      timer: null
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    let str = this.$lStore.get("app_type");
    if (str) {
      if (str == "1") {
        this.isApp = true;
      } else {
        this.isApp = false;
      }
    } else {
      this.isApp = false;
    }
  },
  watch: {
    step: function(newStep, oldStep) {
      console.log(newStep, oldStep);
      if (newStep === 4) {
        this.styls = { height: "4.194757rem" };
      } else {
        this.styls = { height: "3.745318rem" };
      }
      //3.745318rem
    }
  },
  components: { comModal, Inp, Btn },
  methods: {
    // 获取验证码token  type:后续操作  1:注册 2.登录 3.忘记密码
    getClientToken(type) {
      if (this.canReqeust) {
        this.canReqeust = false;
        setTimeout(() => {
          this.canReqeust = true;
        }, 5000);
        window.setToken = this.setToken;
        this.typeCode = type;
        this.md5Token = "";
        if (this.isApp) {
          this.clientType = 0;
          this.$requestClientToken(type);
        } else {
          this.clientType = 1;
          this.getGoogleToken(type);
        }
      }
    },

    setToken(resToken) {
      this.md5Token = resToken;
      if (this.typeCode == 1) {
        this.register();
      } else if (this.typeCode == 2) {
        this.Login();
      } else if (this.typeCode == 3) {
        this.ForgetPassword();
      }
    },

    async getGoogleToken(type) {
      const token = await this.$recaptchaToken();
      this.googleToken = token;
      if (type == 1) {
        this.register();
      } else if (type == 2) {
        this.Login();
      } else if (type == 3) {
        this.ForgetPassword();
      }
    },
    close() {
      this.$emit("close");
    },

    changeText(value) {
      this.$changeInput(value);
    },
    toStep(step) {
      this.titleType(step);
      this.$clickAudio();
      this.loginPassword = "";

      //验证码状态重置
      clearInterval(this.timer);
      this.btnDisabled = false;
      this.btnText = "获取验证码";

      if (step == 4 && !isEmail(this.mobile) && !isPhone(this.mobile)) {
        this.$toast("请输入正确的账号！");
      } else {
        if (step == 1) {
          this.code = "";
        }
        this.step = step;
      }
    },
    show(step) {
      this.mobile = "";
      this.loginPassword = "";
      this.styls = { height: "2.636704rem" };
      this.step = step || 1;
      clearInterval(this.timer);
      this.btnDisabled = false;
      this.btnText = "获取验证码";
      this.$refs.comm.show();
    },
    //发送验证码
    sendCode(type) {
      if(this.btnDisabled) return;
      if (isEmail(this.mobile) || isPhone(this.mobile)) {
        let _this = this;
        console.log("测试发送验证码，账号", this.mobile, "type", type);
        this.$clickAudio();
        this.$ajax(
          {
            url: "/uac/user/sms",
            data: { params: { account: this.mobile, type: type || 1 } }
          },
          true
        )
          .then(res => {
            let time = 60;
            _this.timer = null;
            this.btnDisabled = true;
            this.btnText = "60s重新发送";

            _this.timer = setInterval(() => {
              --time;
              if (time === 0) {
                clearInterval(_this.timer);
                this.btnDisabled = false;
                this.btnText = "重新发送";
              } else {
                this.btnText = time + "s重新发送";
              }
            }, 1000);
            this.$toast("验证码发送成功！");
          })
          .catch(err => {
            clearInterval(_this.timer);
            this.btnDisabled = false;
            this.btnText = "重新发送";
            console.log(err);
          });
      } else if (this.mobile === "") {
        this.$toast("请输账号");
      } else {
        this.$toast("账号格式有误，请输入账号");
      }
    },
    // 检测验证码是否正确(0-注册,1-忘记密码)
    checkCode(type) {
      if (isEmail(this.mobile) || isPhone(this.mobile)) {
        if (this.code.trim().length == 0) {
          this.$toast("请输入验证码");
          return;
        }
        if (type == 0) {
          this.$ajax(
            {
              url: "/uac/user/checkEmailCode",
              data: { params: { account: this.mobile, captcha: this.code } }
            },
            true
          ).then(res => {
            if (res.code == 0) {
              this.toStep(3);
            }
          });
        }
      } else if (this.mobile === "") {
        this.$toast("账号不能为空！");
      } else {
        this.$toast("账号格式有误，请输入账号");
      }
    },
    // 检测账号(0-不存在,1-存在)
    checkAccount() {
      if (isEmail(this.mobile) || isPhone(this.mobile)) {
        try {
          this.$ajax(
            {
              url: "/uac/user/checkAccount",
              data: { params: { mobile: this.mobile } }
            },
            true
          ).then(res => {
            console.log("检查账号结果", res);
            if (res.data) {
              console.log("账号存在");
              this.step = 2;
            } else {
              console.log("账号不存在");
              this.step = 3;
            }
          });
        } catch (err) {
          this.$toast(`${err}`);
        }
      } else if (this.mobile === "") {
        this.$toast("账号不能为空！");
      } else {
        this.$toast("账号格式有误，请输入账号");
      }
    },
    titleType(step) {
      console.log(step);
      if (step == 1) {
        return this.loginTitleImg;
      } else if (step == 2) {
        return this.registTitleImg;
      } else if (step == 3) {
        return this.registTitleImg;
      } else if (step == 4) {
        return this.restPSDTitleImg;
      }
    },
    //登录操作
    Login() {
      if (isEmail(this.mobile) || isPhone(this.mobile)) {
        if (isPwd(this.loginPassword)) {
          this.$ajax(
            {
              url: "/uac/user/login",
              data: {
                params: {
                  mobile: this.mobile,
                  loginPassword: this.loginPassword,
                  recaptchaCode: this.googleToken,
                  recaptchaVersion: this.clientType,
                  md5Str: this.md5Token
                }
              }
            },
            true
          )
            .then(res => {
              setTimeout(() => {
                this.canReqeust = true;
              }, 1000);

              if (res.code === 0) {
                res.data.head = ENV.getENV().ImageURL + res.data.head;
                this.updatedUserInfo(res.data);
                this.updatedToken(res.data.token);
                if (this.intoGame) {
                  this.intoGame();
                }
                this.close();
              }
            })
            .catch(err => {
              setTimeout(() => {
                this.canReqeust = true;
              }, 1000);
              console.log(err);
            });
        } else if (this.loginPassword === "") {
          this.canReqeust = true;
          this.$toast("请输入登录密码");
        } else {
          this.canReqeust = true;
          this.$toast("密码格式错误，6-20位数字，字母，下划线");
        }
      } else if (this.mobile === "") {
        this.canReqeust = true;
        this.$toast("请输入账号");
      } else {
        this.canReqeust = true;
        this.$toast("账号格式有误，请输入账号");
      }
    },
    //注册操作
    register(googleCode) {
      this.$clickAudio();
      if (isPwd(this.loginPassword)) {
        this.$ajax(
          {
            url: "/uac/user/register",
            data: {
              params: {
                mobile: this.mobile,
                code: this.code,
                loginPassword: this.loginPassword,
                beInvitationCode: this.inviteCode,
                ditch: 0,
                recaptchaCode: this.googleToken,
                recaptchaVersion: this.clientType,
                md5Str: this.md5Token
              }
            }
          },
          true
        )
          .then(res => {
            this.canReqeust = true;
            console.log(res);
            if (res.code === 0) {
              res.data.head = ENV.getENV().ImageURL + res.data.head;
              this.updatedUserInfo(res.data);
              this.updatedToken(res.data.token);
              if (this.intoGame) {
                this.intoGame();
              }
              this.close();
            }
          })
          .catch(err => {
            this.canReqeust = true;
            console.log(err);
          });
      } else if (this.loginPassword === "") {
        this.canReqeust = true;
        this.$toast("请输入登录密码");
      } else {
        this.canReqeust = true;
        this.$toast("密码格式错误，6-20位数字，字母，下划线");
      }
    },
    //调用忘记密码接口
    ForgetPassword() {
      if (isPwd(this.loginPassword)) {
        this.$ajax({
          url: "/uac/user/resetPassword",
          data: {
            params: {
              code: this.code,
              mobile: this.mobile,
              newLoginPassword: this.loginPassword,
              recaptchaCode: this.googleToken,
              recaptchaVersion: this.clientType,
              md5Str: this.md5Token
            }
          }
        })
          .then(res => {
            this.canReqeust = true;
            if (res.code === 0) {
              this.$toast("修改密码成功");
              this.toStep(1);
            }
          })
          .catch(err => {
            this.canReqeust = true;
            console.log(err);
          });
      } else if (this.loginPassword === "") {
        this.canReqeust = true;
        this.$toast("请输入登录密码");
      } else {
        this.canReqeust = true;
        this.$toast("密码格式错误，6-20位数字，字母，下划线");
      }
    },
    ...mapActions(["updatedUserInfo", "updatedToken", "updatedPkNum"])
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.dialog-leave-active {
  // 动画离开过程：0.5s
  transition: all 0.4s ease;
}
.dialog-enter-active {
  // 动画离开过程：0.5s
  transition: all 0.2s ease;
}
.dialog-enter, .dialog-leave-active {
  // 动画之前的位置
  transform: scale(0.4);
  opacity: 0;
}
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  .modal {
    width: 5.243446rem;
    height: 3.745318rem;
    background-color: #1b1c1d;
    border-radius: 0.059925rem;
    animation: Scale 0.8s ease;
    position: relative;
    .closeBtn {
      position: absolute;
      width: 0.419476rem;
      height: 0.419476rem;
      right: 0;
      top: -0.554307rem;
    }
    .modal-head {
      height: 0.599251rem;
      width: 100%;
      background: url('../../../assets/Images/Login/login_top.png') 0 0 / 100% 100% no-repeat !important;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 0.509363rem;
      }
    }
    .content {
      padding: 0.359551rem 0.359551rem 0 0.359551rem;
      color: #cabda7;
      font-size: 0.209738rem;
      input {
        background: url('../../../assets/Images/Login/bg_input.png') 0 0 / 100% 100% no-repeat !important;
        color: #fff;
        $placeholderColor('#8a847d');
        border-radius: 0.059925rem;
        height: 100%;
        padding: 0 0.104869rem 0 0.104869rem;
      }
      .input_title {
        height: 0.479401rem;
        margin-bottom: 0.2397rem;
        display: flex;
        position: relative;
        p {
          width: 18%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        input {
          width: 82%;
          &.login_psdInput {
            // padding: 0 70px 0 0.104869rem;
            padding-right: 1.198502rem;
          }
          &.login_psdInput {
            padding-right: 1.52809rem;
          }
        }
        .forgetPSD {
          position: absolute;
          right: 0.104869rem;
          top: 0.134831rem;
        }
        .getCode {
          position: absolute;
          right: 0;
          height: 100%;
          line-height: 0.479401rem;
          text-align: center;
          width: 1.52809rem;
          background: url('../../../assets/Images/Login/code_bg.png') 0 0 / 100% 100% no-repeat !important;
          color: #2d2b2a;
        }
      }
      .btn {
        margin-top: 0.074906rem;
        width: 100%;
        height: 0.479401rem;
        background: url('../../../assets/Images/Login/login_action_bg.png') 0 0 / 100% 100% no-repeat !important;
        color: #2d2b2a;
        display: flex;
        align-items: center;
        justify-content: center;
        &.disable {
          background: url('../../../assets/Images/Login/login_action_bg_no.png') 0 0 / 100% 100% no-repeat !important;
        }
      }
      .bottom_small_btn {
        margin-top: 0.359551rem;
        text-align: right;
      }
      .resetPsd_account {
        display: flex;
        margin-bottom: 0.2397rem;
        .resetPsd_account_title {
          width: 18%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .resetPsd_account_value {
          width: 82%;
        }
      }
    }
  }
}
</style>
