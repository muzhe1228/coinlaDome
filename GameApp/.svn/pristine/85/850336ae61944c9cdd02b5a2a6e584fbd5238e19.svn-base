<template>
  <comModal ref="comm" :styls="styls" titleName="重置登录密码">
    <div class="wrapper">
      <div class="alertContent">
        <div class="account">
          <span>账号</span>
          <p>{{HiddenPhoneNum(mobile)}}</p>
        </div>
        <div class="emailCode">
          <Inp
            label="验证码"
            placeholder="请输入验证码"
            name="code"
            :Val="code"
            :btnText="btnText"
            :btnDisabled="btnDisabled"
            type="text"
            @Change="InpChange"
            @sendCode="sendCode(2)"
          ></Inp>
        </div>

        <div>
          <Inp
            label="新密码"
            placeholder="请输入新登录密码"
            name="loginPassword"
            :Val="loginPassword"
            type="password"
            @Change="InpChange"
            autocomplete="off"
          ></Inp>
        </div>
        <Btn class="submit" text="确定" @click.native="getClientToken()"/>
      </div>
    </div>
  </comModal>
</template>

<script>
import comModal from "components/Modal/comModal";
import Inp from "components/Modal/loginReg/Inp";
import Btn from "components/Modal/loginReg/Btn";
import { isPhone,isEmail } from "common/func"
export default {
  props: {
    mobile: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loginPassword: "",
      code: "",
      unClick: false, //不能点击
      btnSize: "获取验证码",
      styls: "",
      btnText: "获取验证码",
      btnDisabled: false,
      timer1: null,
      timer2: null,
      googleToken: "",
      clientType: "", //修改密码传参
      md5Token: "", //修改密码传参
      isApp: false //是否从app打开
    };
  },
  destroyed() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  },
  mounted() {},
  components: { comModal, Inp, Btn },
  methods: {
    show() {
      this.styls = { height: "65%", width: "65%" };
      this.$refs.comm.show();
      this.btnText = "获取验证码";
      this.btnDisabled = false;
      clearInterval(this.timer1);
      clearInterval(this.timer2);
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
      window.setToken = this.setToken;
    },
    InpChange(val, name) {
      this[name] = val;
    },

    getClientToken() {
      this.md5Token = "";
      if (this.isApp) {
        this.clientType = 0;
        this.$requestClientToken("");
      } else {
        this.clientType = 1;
        this.getGoogleToken();
      }
    },

    setToken(resToken) {
      this.md5Token = resToken;
      this.SubmitUpdatePassword();
    },

    async getGoogleToken() {
      console.log("开始获取谷歌token");
      const token = await this.$recaptchaToken();
      this.googleToken = token;
      console.log("获取到的谷歌token", this.googleToken);
      this.SubmitUpdatePassword();
    },
    //发送验证码
    sendCode(type) {
      this.$clickAudio();
      this.$ajax(
        {
          url: "/uac/user/sms",
          data: { params: { account: this.mobile, type: type || 2 } }
        },
        true
      )
        .then(res => {
          this.$toast("验证码发送成功！");

          let time = 60;
          this.btnDisabled = true;
          this.btnText = "60s";

          this.timer1 = setInterval(() => {
            --time;
            if (time === 0) {
              clearInterval(this.timer1);
              this.btnDisabled = false;
              this.btnText = "重新发送";
            } else {
              this.btnText = time + "s重新发送";
            }
          }, 1000);
        })
        .catch(err => {
          clearInterval(timer);
          this.btnDisabled = false;
          this.btnText = "重新发送";
          console.log(err);
        });
    },
    //提交更改密码的请求
    SubmitUpdatePassword() {
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
          if (res.code === 0) {
            console.log(res.data);
            this.$toast("修改密码成功！");
            this.$refs.comm.close();
          }
        })
        .catch(err => {
          console.log(err);
          this.$clickAudio();
        });
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
@import '~assets/stylus/variable.styl';
.wrapper {
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
  z-index: 11;
  // display: flex;
  // align-items: center;
  .alertContent {
    margin: 0.2rem;
    margin-top: 0;
    font-size: 0.186667rem;
    .account {
      margin-top: 0.149813rem;
      font-size: 0.194757rem;
      height: 0.479401rem;
      line-height: 0.479401rem;
      padding: 0 0.089887rem;
      color: #acb3e2;
      display: flex;
      align-items: center;
      span {
        min-width: 0.749064rem;
      }
      p {
        flex: 1;
        height: 100%;
        color: #acb3e2;
      }
    }
    .emailCode {
      margin-top: -0.149813rem;
    }
    .submit {
      margin-top: 0.213333rem;
    }
  }
}
</style>
