<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <comModal ref="comm" :styls="styls" :titleName="`充值`">
    <div class="wrapper">
      <div class="modal-cont">
        <ul class="modal-cont-top">
          <li
            v-for="item in coinList"
            :key="item.text"
            :class="check === item.text&&'active'"
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
              src="~assets/Images/modal/icon_tixian_select_rb@3x.png"
              alt
            >
          </li>
        </ul>
        <div class="proportion" v-if="proportion">
          <p class="label">兑换比例</p>
          <p class="content">1{{check}} {{check == 'USDT'?'=':'≈'}} {{proportion}}PK</p>
        </div>
        <div class="modal-cont-info" v-if="hxValue">
          <p class="label">转账地址</p>
          <p class="codeImg">
            <img :src="!hxValue?'':`${ENV.httpApi}/uac/resource/qrcode?text=${hxValue}`" alt>
          </p>
          <!-- 充值活动 -->
          <div class="activity" v-if="ruleList">
            <p class="ac-title">首充返利 越充越值</p>
            <p
              class="ac-content"
              v-for="(item,index) in ruleList"
              :key="index"
              v-html="item.ruleDesc"
            ></p>
          </div>
        </div>
        <div class="Addr" v-if="hxValue">
          <p class="text">{{hxValue}}</p>
          <p
            class="copy"
            v-clipboard:copy="hxValue"
            v-clipboard:success="onSuccess"
            v-clipboard:error="onError"
          >复制</p>
        </div>
        <div class="tip">
          <p>*{{LestTopUp+check}}起充；转账产生的手续费自行承担；转错地址平台概不负责</p>
          <p>1USDT固定可兑换100PK，BTC和ETH随着市场价格波动，浮动兑换</p>
        </div>
      </div>
    </div>
  </comModal>
</template>

<script>
import ETH_select from "Images/modal/alert_eth_selected@3x.png";
import ETH_unselect from "Images/modal/alert_eth_unselect@3x.png";
import BTC_select from "Images/modal/alert_btc_selected@3x.png";
import BTC_unselect from "Images/modal/alert_btc_unselect@3x.png";
import USDT_select from "Images/modal/icon_coin_usdt_selected@3x.png";
import USDT_unselect from "Images/modal/icon_coin_usdt_unselect@3x.png";
import unChangeSelectImg from "Images/modal/icon_tixian_select_rb@3x.png";
import ENV from "common/Api/ENV";
import comModal from "components/Modal/comModal";
import Inp from "components/Modal/loginReg/Inp";
import Btn from "components/Modal/loginReg/Btn";
export default {
  data() {
    return {
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
        // {
        //   checkPic: EOS_select,
        //   unChekPic: EOS_select,
        //   text: "EOS",
        //   type: 3
        // },
        // {
        //   checkPic: BCH_select,
        //   unChekPic: BCH_unselect,
        //   text: "BCH",
        //   type: 4
        // }
      ],
      check: "ETH",
      hxValue: "",
      LestTopUp: "",
      ENV: ENV.getENV(),
      styls: {},
      proportion: null,
      ruleList: []
    };
  },
  components: { comModal, Inp, Btn },
  mounted() {
    this.check = "ETH";
    // this.RequestCoinAdress();
  },
  methods: {
    show() {
      this.styls = { height: "4.659176rem", width: "6.292135rem" };
      this.$refs.comm.show();
      this.check = "ETH";
      this.RequestCoinAdress();

      this.hxValue = "";
      this.LestTopUp = "";
    },
    Close() {
      this.$clickAudio();
      this.$refs.comm.close();
    },
    onSuccess() {
      this.$clickAudio();
      this.$toast("复制成功");
    },
    onError() {
      this.$clickAudio();
      this.$toast("浏览器不支持复制");
    },
    ChooseCoin(type) {
      console.log(this.coinList[type - 1].text);
      this.$clickAudio();
      this.check = this.coinList[type - 1].text;
      this.RequestCoinAdress();
    },
    RequestCoinAdress() {
      console.log("调用充值查询接口");
      if (!this.$lStore.get("Token")) return;
      this.hxValue = "";
      this.LestTopUp = "";
      this.proportion = "";
      var CoinType;
      for (let i = 0; i < this.coinList.length; i++) {
        if (this.coinList[i].text === this.check) {
          CoinType = this.coinList[i].type;
          break;
        }
      }
      var userHeader =
        CoinType === 1 ? "/ethes" : CoinType === 2 ? "/btces" : "/usdtes";
      //请求ETH的充值地址  /query/recharge
      this.$ajax(
        {
          url: userHeader + "/query/recharge",
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
          if (res.code === 0) {
            console.log(res.data);
            this.hxValue = res.data.rechargeAddress;
            this.LestTopUp = res.data.rechargeLimit;
            this.proportion = res.data.convertPk;
            this.ruleList = res.data.ruleList;
            // this.OpenUserTopUpJianTing();
          } else {
            this.hxValue = "";
            this.LestTopUp = "";
          }
        })
        .catch(err => {
          console.log(err);
          this.hxValue = "";
          this.LestTopUp = "";
        });
    },
    //启动监听用户充值结果  ** 废弃 **（方法内容未更新）
    OpenUserTopUpJianTing() {
      var CoinType;
      for (let i = 0; i < this.coinList.length; i++) {
        if (this.coinList[i].text === this.check) {
          CoinType = this.coinList[i].type;
          break;
        }
      }
      this.$ajax(
        {
          url: "/ethes/exchange/recharge/monitor",
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
          if (res.code === 0) {
            console.log("充值结果监听启动", res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.wrapper {
  padding: 0 0.179775rem;
  .modal-cont {
    &-top {
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
        border: 0.014981rem solid #363e76;
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
        &.active {
          border-color: $colorMain;
          color: $colorMain;
        }
      }
    }
    &-info {
      margin-top: 0.179775rem;
      height: 1.123596rem;
      width: 100%;
      color: #888fc5;
      position: relative;
      display: flex;
      .label {
        position: absolute;
        left: 0;
        top: 0;
      }
      .codeImg {
        width: 1.123596rem;
        position: relative;
        margin-left: 0.973783rem;
        img {
          width: 100%;
        }
      }
      .activity {
        margin-left: 0.179775rem;
        .ac-title {
          color: #fccf4e;
          font-size: 0.179775rem;
          margin-bottom: 12px;
        }
        .ac-content {
          font-size: 0.164794rem;
          line-height: 0.269663rem;
        }
        .light-text {
          color: #fccf4e;
        }
      }
    }
    .proportion {
      display: flex;
      margin-top: 0.179775rem;
      .label {
        color: #888fc5;
      }
      .content {
        margin-left: 0.179775rem;
      }
    }
    .Addr {
      width: 100%;
      height: 0.479401rem;
      margin-top: 0.179775rem;
      background-color: #363e76;
      border-radius: 0.059925rem;
      padding: 0 0.2397rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.194757rem;
      color: #888fc5;
      .copy {
        color: #e3c877;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .tip {
      margin-top: 0.074906rem;
      padding-left: 0.179775rem;
      font-size: 0.164794rem;
      color: #acb3e2;
      line-height: 0.269663rem;
    }
  }
}
</style>
