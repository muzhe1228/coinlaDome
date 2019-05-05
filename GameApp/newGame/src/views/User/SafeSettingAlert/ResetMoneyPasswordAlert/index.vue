<template>
  <comModal ref="comm" :styls="styls" :titleName="getTitleName()">
    <div class="wrapper">
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

      <Inp label="密码" placeholder="请输入资金密码" name="newPsd" type="password" @Change="InpChange"></Inp>

      <Btn class="submit" text="确定" @click.native="getClientToken()"/>

      <div class="tip">
        <span>*Tips:</span>
        <p>您的资金密码用来提现，建议不要与登录密码一致，由此产生的账号被盗，本平台概不负责。</p>
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
    },
    PageType: {
      type: Number,
      default: ""
    }
  },
  data() {
    return {
      newPsd: "",
      code: "",
      unClick: false, //不能点击
      btnSize: "获取验证码",
      styls: "",
      btnText: "获取验证码",
      btnDisabled: false,
      timer1: null,
      timer2: null,
      googleToken: "",
      clientType: "",
      md5Token: "",
      isApp: false //是否从app打开
    };
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  },
  components: { comModal, Inp, Btn },
  methods: {
    show() {
      this.newPsd = "";
      this.code = "";
      this.btnText = "获取验证码";
      this.styls = { height: "75%", width: "65%" };
      this.$refs.comm.show();
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
      this.Submit();
    },

    async getGoogleToken() {
      console.log("开始获取谷歌token");
      const token = await this.$recaptchaToken();
      this.googleToken = token;
      console.log("获取到的谷歌token", this.googleToken);
      this.Submit();
    },
    InpChange(val, name) {
      this[name] = val;
    },
    getTitleName() {
      if (this.PageType === 0) {
        return "重置资金密码";
      } else {
        return "设置资金密码";
      }
    },
    //发送验证码
    sendCode(type) {
      let _this = this;
      this.$clickAudio();
      this.$ajax(
        {
          url: "/uac/user/sms",
          data: { params: { account: _this.mobile, type: type || 2 } }
        },
        true
      )
        .then(res => {
          _this.$toast("验证码发送成功！");

          _this.btnDisabled = true;
          _this.btnText = "60s";
          let time = 60;
          _this.timer1 = setInterval(() => {
            --time;
            if (time === 0) {
              clearInterval(_this.timer1);
              _this.btnDisabled = false;
              _this.btnText = "重新发送";
            } else {
              _this.btnText = time + "s重新发送";
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
    //提交请求
    Submit() {
      if (this.PageType === 0) {
        this.SubmitUpdatePassword();
      } else {
        this.SubmitUpdatePassword();
      }
    },
    //提交重置资金密码的请求
    SubmitUpdatePassword() {
      this.$ajax(
        {
          url: "/uac/user/resetAssetsPassword",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              code: this.code,
              mobile: this.mobile,
              newAssetsPassword: this.newPsd,
              recaptchaCode: this.googleToken,
              recaptchaVersion: this.clientType,
              md5Str: this.md5Token
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log(res.data);
            if (this.PageType === 0) {
              this.$toast("资金密码修改成功！");
            } else {
              this.$toast("资金密码设置成功！");
            }
            
            this.$emit("reload");
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
  margin: 0.2rem;
  margin-top: 0;
  font-size: 0.209738rem;
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
  .tip {
    margin-top: 0.16rem;
    font-size: 0.209738rem;
    position: relative;
    span {
      line-height: 0.299625rem;
      color: #888fc5;
      position: absolute;
      left: 0;
      top: 0;
    }
    p {
      color: #888fc5;
      padding-left: 0.644195rem;
      padding-top: 0.026667rem;
      line-height: 0.299625rem;
    }
  }
}
</style>
