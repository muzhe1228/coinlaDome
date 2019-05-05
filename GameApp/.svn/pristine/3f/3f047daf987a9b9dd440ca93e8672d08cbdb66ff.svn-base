<template>
  <comModal ref="comm" :styls="styls" :titleName="pageTitle">
    <div class="wrapper">
      <div class="PassWordAlert" v-if="showPsdAlert">
        <div class="moneyPsdInput">
          <Inp
            label="资金密码"
            placeholder="请输入资金密码"
            name="psd"
            :Val="psd"
            type="password"
            @Change="InpChange"
            :labelWidth="4"
          ></Inp>
        </div>

        <div class="emailCode" v-if="userSafedata.isEmailVerify === 0">
          <Inp
            label="验证码"
            placeholder="请输验证码"
            name="emailCode"
            :Val="emailCode"
            :btnText="btnText"
            :btnDisabled="btnDisabled"
            type="text"
            @Change="InpChange"
            @sendCode="sendCode(2)"
            :labelWidth="4"
          ></Inp>
        </div>

        <Btn class="submit" text="确定" @click.native="getClientToken()"/>
      </div>

      <div class="TiXianAlertDiv" v-else>
        <div class="YuE">
          <div class="localMoney">
            <span>当前余额</span>
            <span class="PKCount" v-if="data">{{scientificToNumber(data.availableBalance)}}PK</span>
          </div>
          <div class="localMoney iceMoney">
            <span>冻结中</span>
            <span class="PKCount icePK" v-if="data">{{scientificToNumber(data.frozenBalance)}}PK</span>
          </div>
          <div class="ice_ques">
            <img src="../../../assets/Images/ice_ques.png" alt @click="showIceIntroAlert()">
            <div v-if="showIceIntro" class="ice_intro">
              <p>赠送PK先冻结，满足流水50倍之后才可提现</p>
            </div>
          </div>
        </div>

        <ul class="modal-cont-top">
          <li
            v-for="item in coinList"
            :key="item.text"
            :class="check === item.text ? 'active' : 'unUse'"
            @click="ChooseCoin(item.type)"
          >
            <img
              class="logo"
              :src="check === item.text?item.checkPic:item.unChekPic"
              :alt="item.text"
            >
            <p>{{item.text}}</p>
            <img
              v-if="check === item.text"
              class="Jiao"
              src="../../../assets/Images/modal/icon_tixian_select_rb@3x.png"
              alt
            >
          </li>
        </ul>

        <div class="TiXianCount" v-if="data">
          <div class="tixianCount">
            <span class="countTitle">提现数量</span>
            <input
              :placeholder="`最多可提现${scientificToNumber(data.extractAssetsBalance)}PK`"
              v-model="CountInput"
              type="text"
              @input="CountInputValueChange(CountInput)"
              @focus="onFocus(CountInput)"
              class="CountInput"
            >
            <span class="allButton" @click="AllMoney">全部</span>
            <span
              class="CoinRate"
              v-if="CountInput"
            >≈{{check=='USDT'?(CountInput / this.convertRatio).toFixed(0):(CountInput / this.convertRatio).toFixed(3)}}{{check}}</span>
          </div>
          <div class="tixianCount tixianAdress">
            <span class="countTitle">提现地址</span>
            <input
              :placeholder="`输入您的${check}钱包地址`"
              :value="AdressInput"
              type="text"
              @input="AdressInputValueChange($event.target.value)"
              @focus="onFocus(AdressInput)"
              class="adreessInput"
            >
          </div>

          <div class="tixianTip">
            <p>*手续费{{serviceCharge+check}}用户承担,{{data.withdrawLimit + check}}起提；每日仅提现{{data.dayWithdrawCount}}次</p>
          </div>
        </div>

        <div class="submitDiv" v-if="data">
          <p class="tixian_cancel">
            <button @click="Close">取消</button>
          </p>
          <p class="tixian_submit">
            <button @click="showPassWordAlert" :class="CountInput&AdressInput?'activeButton':''">确定</button>
          </p>
        </div>
      </div>
    </div>
  </comModal>
</template>

<script>
import comModal from "components/Modal/comModal";
import Inp from "components/Modal/loginReg/Inp";
import Btn from "components/Modal/loginReg/Btn";
import ETH_select from "Images/modal/alert_eth_selected@3x.png";
import ETH_unselect from "Images/modal/alert_eth_unselect@3x.png";
import BTC_select from "Images/modal/alert_btc_selected@3x.png";
import BTC_unselect from "Images/modal/alert_btc_unselect@3x.png";
import USDT_select from "Images/modal/icon_coin_usdt_selected@3x.png";
import USDT_unselect from "Images/modal/icon_coin_usdt_unselect@3x.png";
import unChangeSelectImg from "Images/modal/icon_tixian_select_rb@3x.png";

export default {
  data() {
    return {
      styls: "",
      pageTitle: "提现",
      data: {},
      showPsdAlert: false,
      userSafedata: "",
      CountInput: "",
      AdressInput: "",
      psd: "",
      emailCode: "",
      btnText: "获取验证码",
      btnDisabled: false,
      convertRatio: 10000, //PK币与对应币种对应比率
      serviceCharge: 0, //手续费
      coinList: [
        {
          checkPic: ETH_select,
          unChekPic: ETH_unselect,
          text: "ETH",
          type: 1
        },
        {
          checkPic: BTC_select,
          unChekPic: BTC_unselect,
          text: "BTC",
          type: 2
        },
        {
          checkPic: USDT_select,
          unChekPic: USDT_unselect,
          text: "USDT",
          type: 3
        }
      ],
      check: "USDT",
      clientType: "", //修改密码传参
      md5Token: "", //修改密码传参
      isApp: false, //是否从app打开
      showIceIntro: false //是否显示冻结金额介绍
    };
  },
  components: { comModal, Inp, Btn },
  mounted() {},
  watch: {
    showPsdAlert: function(show) {
      if (this.showPsdAlert) {
        this.styls = { height: "50%", width: "50%" };
      } else {
        this.styls = { height: "4.659176rem", width: "6.292135rem" };
      }
    }
  },
  methods: {
    // 获取验证码token  type:后续操作  1:注册 2.登录 3.忘记密码
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
      this.TiXianAction();
    },
    //进行谷歌验证
    async getGoogleToken() {
      console.log("开始获取谷歌token");
      const token = await this.$recaptchaToken();
      this.googleToken = token;
      console.log("获取到的谷歌token", this.googleToken);
      this.TiXianAction();
    },
    show() {
      this.styls = { height: "4.659176rem", width: "6.292135rem" };
      this.$refs.comm.show();
      this.UserSafeSetting();
      this.LoadWithDrawal();
      this.showPsdAlert = false;
      this.CountInput = "";
      this.AdressInput = "";
      this.psd = "";
      this.emailCode = "";
      this.check = "USDT";
      this.showIceIntro = false;
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
    ChooseCoin(type) {
      if (type != 3) {
        this.$toast("暂未开放");
        return;
      }

      this.CountInput = "";
      this.AdressInput = "";
      this.psd = "";
      this.emailCode = "";

      console.log(this.coinList[type - 1].text);
      this.$clickAudio();

      this.check = this.coinList[type - 1].text;
      this.LoadWithDrawal();
    },
    Close() {
      this.$clickAudio();
      this.$refs.comm.close();
    },
    InpChange(val, name) {
      this[name] = val;
    },
    AdressInputValueChange(value) {
      this.AdressInput = value;
      this.$changeInput(this.AdressInput);
      console.log(this.AdressInput);
    },
    CountInputValueChange(value) {
      var val = value;
      val = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      val = val
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      if (val.indexOf(".") < 0 && val != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        val = parseFloat(val);
      }
      if (val <= this.scientificToNumber(this.data.extractAssetsBalance)) {
        this.CountInput = val;
      } else {
        this.CountInput = this.scientificToNumber(
          this.data.extractAssetsBalance
        );
      }
      this.$changeInput(this.CountInput);
      console.log(this.CountInput);
    },
    onFocus(val) {
      this.$changeInput(val);
    },
    AllMoney() {
      this.$clickAudio();
      this.CountInput = this.scientificToNumber(this.data.availableBalance);
    },
    showPassWordAlert() {
      this.$clickAudio();
      if (this.CountInput && this.AdressInput) {
        this.showPsdAlert = true;
      } else if (!this.CountInput) {
        this.$toast("请输入提现数量");
      } else if (!this.AdressInput) {
        this.$toast("请输入提现地址");
      }
    },
    //发送验证码
    sendCode(type) {
      this.$clickAudio();
      this.$ajax(
        {
          url: "/uac/user/sms",
          data: {
            params: { account: this.userSafedata.mobile, type: type || 2 }
          }
        },
        true
      )
        .then(res => {
          let time = 60,
            timer = null;
          this.btnDisabled = true;
          this.btnText = "60s";

          timer = setInterval(() => {
            --time;
            if (time === 0) {
              clearInterval(timer);
              this.btnDisabled = false;
              this.btnText = "重新发送";
            } else {
              this.btnText = time + "s重新发送";
            }
          }, 1000);
          this.$toast("验证码发送成功！");
        })
        .catch(err => {
          clearInterval(timer);
          this.btnDisabled = false;
          this.btnText = "重新发送";
          console.log(err);
        });
    },
    /*科学计数法转换数值*/
    scientificToNumber(num) {
      num = (num - 0).toLocaleString(); //"1,545,646,435,185,460,000,000,000,000"    注意这样会丢失一些精度
      num = num.toString().replace(/\$|\,/g, "");
      return num;
    },
    //查询用户安全设置(获取用户提现设置)
    UserSafeSetting() {
      this.$ajax(
        {
          url: "/uac/user/selectUserSetting",
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
            this.userSafedata = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    LoadWithDrawal() {
      this.data = null;
      var CoinType;
      for (let i = 0; i < this.coinList.length; i++) {
        if (this.coinList[i].text === this.check) {
          CoinType = this.coinList[i].type;
          break;
        }
      }
      var userHeader =
        CoinType === 1 ? "/ethes" : CoinType === 2 ? "/btces" : "/usdtes";
      console.log("请求币种ID", CoinType);
      this.$ajax(
        {
          url: userHeader + "/query/withdraw",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              currencyType: CoinType
            }
          }
        },
        true
      )
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            console.log(res.data);
            this.data = res.data;
            this.convertRatio = res.data.convertRatio; //PK币与对应币种对应比率
            console.log("比率", this.convertRatio);
            this.serviceCharge = res.data.serviceCharge; //手续费
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //执行提现操作
    TiXianAction() {
      this.$clickAudio();
      if (!this.psd) {
        this.$toast("请输入提现密码");
        return;
      }

      var CoinType;
      for (let i = 0; i < this.coinList.length; i++) {
        if (this.coinList[i].text === this.check) {
          CoinType = this.coinList[i].type;
          break;
        }
      }
      var userHeader =
        CoinType === 1 ? "/ethes" : CoinType === 2 ? "/btces" : "/usdtes";
      this.$ajax(
        {
          url: userHeader + "/exchange/withdraw/apply",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              currencyType: CoinType,
              address: this.AdressInput,
              amount: this.CountInput,
              pwd: this.psd,
              captcha: this.emailCode,
              recaptchaCode: this.googleToken,
              recaptchaVersion: this.clientType,
              md5Str: this.md5Token
            }
          }
        },
        true
      )
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            console.log(res.data);
            this.$toast("提现申请提交成功");
            this.Close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //显示/隐藏 冻结金额介绍
    showIceIntroAlert() {
      this.showIceIntro = !this.showIceIntro;
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper {
  padding: 0 0.179775rem;
  .TiXianAlertDiv {
    .YuE {
      padding-top: 0.359551rem;
      display: flex;
      align-items: center;
      font-size: 0.209738rem;
      .localMoney {
        display: flex;
        color: #acb3e2;
        .PKCount {
          margin-left: 0.11985rem;
          font-size: 0.209738rem;
          color: #e3c877;
        }
      }
      .iceMoney {
        margin-left: 0.749064rem;
        color: #acb3e2;
        .icePK {
          color: #fff;
        }
      }
      .ice_ques {
        margin-left: 0.11985rem;
        height: 0.299625rem;
        width: 0.299625rem;
        position: relative;
        img {
          height: 100%;
          width: 100%;
        }
        .ice_intro {
          position: absolute;
          width: 2.411985rem;
          height: 0.898876rem;
          left: 102%;
          top: 0;
          background: url('../../../assets/Images/ice_alert.png') 0 0 / 100% 100% no-repeat;
          z-index: 3;
          color: #acb3e2;
          font-size: 0.179775rem;
          padding: 0.194757rem;
          p {
            line-height: 0.254682rem;
          }
        }
      }
    }
    .modal-cont-top {
      display: flex;
      justify-content: space-between;
      padding-top: 0.2397rem;
      li {
        width: 1.797753rem;
        height: 0.599251rem;
        background-color: #363e76;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.059925rem;
        position: relative;
        border: 0.014982rem solid #363e76;
        color: #fff;
        font-size: 0.2397rem;
        cursor: pointer;
        .logo {
          width: 0.299625rem;
          height: 0.299625rem;
          margin-right: 0.089888rem;
        }
        .Jiao {
          width: 0.194757rem;
          height: 0.194757rem;
          position: absolute;
          bottom: -1px;
          right: -1px;
        }
      }
      .active {
        border-color: #e3c877;
        color: #e3c877;
      }
      .unUse {
        background-color: #aaaaaa;
        color: #333333;
      }
    }
    .TiXianCount {
      .tixianCount {
        margin-top: 0.173333rem;
        height: 0.426667rem;
        font-size: 0.194757rem;
        position: relative;
        display: flex;
        align-items: center;
        .countTitle {
          display: inline-block;
          width: 15%;
          // color: #aaaaaa;
          color: #fff;
          position: absolute;
          line-height: 0.479401rem;
          margin-left: 0.2397rem;
        }
        input {
          height: 0.479401rem;
          width: 75%;
          border-radius: 0.059925rem;
          padding-left: 1.198502rem;
          padding-right: 0.666667rem;
          background-color: #363e76;
          color: #fff;
          border: none;
          &::placeholder {
            color: #888fc5;
          }
        }
        .allButton {
          position: absolute;
          right: 27.5%;
          display: inline-block;
          width: 0.4rem;
          line-height: 0.479401rem;
          border-radius: 0.266667rem;
          color: #e3c877;
          z-index: 2;
        }
        .CoinRate {
          margin-left: 0.179775rem;
          display: inline-block;
          width: 22%;
          overflow: hidden;
        }
      }
      .tixianAdress {
        margin-top: 0.149813rem;
        .countTitle {
          display: inline-block;
          width: 15%;
          // color: #aaaaaa;
          color: #fff;
          position: absolute;
          line-height: 0.479401rem;
          margin-left: 0.2397rem;
        }
        input {
          height: 0.479401rem;
          width: 100%;
          border-radius: 0.059925rem;
          padding-left: 1.198502rem;
          padding-right: 0.666667rem;
          background-color: #363e76;
          color: #fff;
          border: none;
          &::placeholder {
            color: #888fc5;
          }
        }
      }
      .tixianTip {
        margin-top: 0.224719rem;
        p {
          text-align: center;
          font-size: 0.16rem;
          color: #888fc5;
        }
      }
    }
    .submitDiv {
      margin-top: 0.224719rem;
      display: flex;
      justify-content: center;
      .tixian_cancel, .tixian_submit {
        height: 0.449438rem;
        width: 1.947566rem;
        border-radius: 0.059925rem;
        margin: 0 0.374532rem;
        line-height: 0.449438rem;
        text-align: center;
        font-size: 0.209738rem;
        button {
          width: 100%;
          height: 100%;
          background-color: transparent;
          font-size: 0.209738rem;
          color: #2b2f57;
        }
      }
      .tixian_cancel {
        background: url('../../../assets/Images/PersonalPage/alert_btn_bg.png') 0 0 / 100% 100% no-repeat !important;
      }
      .tixian_submit {
        background-color: #444b81;
      }
      .activeButton {
        background: url('../../../assets/Images/PersonalPage/alert_btn_bg.png') 0 0 / 100% 100% no-repeat !important;
      }
    }
  }
  // 资金密码
  .PassWordAlert {
    margin: 0.2rem;
    margin-top: 0;
    font-size: 0.186667rem;
    .submit {
      margin-top: 0.074906rem;
    }
  }
}
</style>
