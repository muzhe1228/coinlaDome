<template>
  <transition name="dialog">
    <div class="dialog" @click="closeMyself()">
      <div class="modal" @click.stop>
        <div class="modal-head">
          <img class="title" src="~assets/Images/pay/title_txt@3x.png">
          <p class="close animated" @click="closeMyself()">
            <img class="iconfont" src="~assets/Images/pay/icon_close@3x.png">
          </p>
        </div>
        <div class="modal-cont">
          <div class="find" v-if="step == 1">
            <div class="find_account">
              <p class="head">对方账户</p>
              <input
                class="input"
                v-model="account"
                placeholder="请输入对方账号"
                @input="changeText(account)"
                @focus="changeText(account)"
              >
            </div>
            <p class="find_tip">Tips：PK币将实时转入对方账户，无法退回</p>
            <p class="find_next_step" @click.stop="toNext()">下一步</p>
          </div>

          <div class="to_pay" v-if="step == 2">
            <div class="pay_user_info">
              <p class="avatar">
                <img class="head_Img" :src="getUserHead(headImg)" alt>
              </p>
              <div class="user_details">
                <p class="nick">
                  <span class="span1">{{payUserInfo.nick}}</span>
                  <span class="span2">(ID:{{payUserInfo.userId}})</span>
                </p>
                <P class="account">{{payUserInfo.mobile}}</P>
              </div>
            </div>

            <div class="pay_num">
              <p class="head">转账金额</p>
              <input
                type="number"
                class="input"
                :placeholder="getPayNum()"
                v-model="payNumber"
                :max="PkNum|Num"
                @focus="focus($event)"
                @input="zhuanZhangPK(payNumber)"
              >
              <p class="tip">PK</p>
            </div>

            <div class="pay_txt">
              <p class="head">转账备注</p>
              <input
                class="input"
                @input="changeText(payExplain)"
                @focus="changeText(payExplain)"
                v-model="payExplain"
                maxlength="10"
              >
              <p class="max_num">{{payExplain.length}}/10</p>
            </div>

            <div class="button_div">
              <p class="back_step" @click.stop="toPro()">上一步</p>
              <p class="sure" :class="canReqeust?'':'disable'" @click.stop="surePay()">确定</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import unChangeSelectImg from "Images/modal/icon_tixian_select_rb@3x.png";
import ENV from "common/Api/ENV";
import { mapState } from "vuex";
import { numFormat } from "../../common/func.js";
export default {
  data() {
    return {
      account: "", //转账id，账号
      step: 1, //转账进行到哪一步
      payUserInfo: {},
      headImg: "",
      defaultHead: require("../../assets/Images/defaultHead.png"),
      payExplain: "",
      payNumber: null,
      canReqeust: true, //能否请求接口
      PkNum:0
    };
  },
  computed: {
  },
  components: {},
  mounted() {},
  methods: {
    closeMyself() {
      this.$clickAudio();
      this.$emit("close");
    },
    changeText(value) {
      // this.account = value;
      this.$changeInput(value);
    },
    getExplain(explain) {
      // this.payExplain = explain;
      this.$changeInput(this.payExplain);
    },
    zhuanZhangPK(num) {
      if (num) {
        let tmpNum = parseInt(num);
        let tmpPkNum = parseInt(this.PkNum);
        if (tmpNum <= tmpPkNum) {
          this.payNumber = tmpNum <= 0 ? "" : tmpNum;
        } else {
          // this.$toast("下注超额");
          this.$nextTick(() => {
            let newVal = tmpPkNum;
            this.payNumber = newVal;
          });
        }
      } else {
        this.$nextTick(() => {
          let newVal = "";
          this.payNumber = newVal;
        });
      }
      this.$changeInput(this.payNumber);
    },
    focus(value) {
      this.$changeInput(this.payNumber);
      event.currentTarget.select();
    },
    getLength(explain) {
      return this.$stringLength(explain);
    },
    toNext() {
      if (this.account == "") {
        this.$toast("输入内容不能为空");
        return;
      }
      this.checkUserUpAndDown();
    },
    toPro() {
      this.step = 1;
    },
    surePay() {
      //转账接口:
      this.transferAccounts();
    },
    getUserHead(head) {
      if (head == "") {
        return this.defaultHead;
      }
      return head;
    },
    getPayNum() {
      return "最多可转" + (this.PkNum == 0 ? 0 : numFormat(this.PkNum)) + " PK";
    },
    //校验转账用户账号
    checkUserUpAndDown() {
      this.$ajax(
        {
          url: "/uac/user/checkUserUpAndDown",
          data: {
            params: {
              mobile: this.account,
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log(res.data);
            this.payUserInfo = res.data;
            console.log('可转账余额',res.data.extractAssetsBalance);
            this.PkNum = res.data.extractAssetsBalance;
            this.headImg = ENV.getENV().ImageURL + res.data.head;
            this.step = 2;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //转账
    transferAccounts() {
      if (!this.payNumber) {
        this.$toast("请输入转账金额");
        return;
      }
      // if (this.payExplain == "") {
      //   this.$toast("请输入转账备注");
      //   return;
      // }
      if (this.canReqeust) {
        this.canReqeust = false;
        this.$ajax(
          {
            url: "/uac/user/transferAccounts",
            data: {
              params: {
                beUserId: this.payUserInfo.userId,
                currencyNumber: this.payNumber,
                desc: this.payExplain,
                token: this.$lStore.get("Token")
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
              this.$emit("close");
            }
          })
          .catch(err => {
            setTimeout(() => {
              this.canReqeust = true;
            }, 1000);
            console.log(err);
          });
      }
    }
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
    width: 5.423221rem;
    // height: 75%;
    background-color: #2b2f57;
    border-radius: 0.059925rem;
    animation: Scale 0.8s ease;
    position: relative;
    &-head {
      height: 0.659176rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('../../assets/Images/pay/bg_title@3x.png') 0 0 / 100% 100% no-repeat !important;
      .title {
        height: 0.524345rem;
      }
      .close {
        position: absolute;
        right: 0.044944rem;
        top: -0.524345rem;
        cursor: pointer;
        /* animation: zoomIn 1s infinite alternate; */
        .iconfont {
          color: #fff;
          font-size: 0.2397rem;
          height: 0.449438rem;
          width: 0.449438rem;
        }
      }
    }
    &-cont {
      .find {
        padding: 0.359551rem;
        .find_account {
          display: flex;
          color: #acb3e2;
          font-size: 0.209738rem;
          align-items: center;
          .head {
            width: 1.048689rem;
          }
          .input {
            height: 0.479401rem;
            width: 3.655431rem;
            background-color: #3e4377;
            border: 1px solid #3e4377;
            border-radius: 0.059925rem;
            padding-left: 0.11985rem;
            color: #fff;
            &::placeholder {
              color: #888fc5;
            }
          }
        }
        .find_tip {
          // margin-left 0.59925rem;
          margin-top: 0.2397rem;
          margin-bottom: 0.314607rem;
          font-size: 0.209738rem;
          color: #888fc5;
        }
        .find_next_step {
          width: 4.70412rem;
          line-height: 0.479401rem;
          text-align: center;
          background: url('../../assets/Images/pay/btn_next@3x.png') 0 0 / 100% 100% no-repeat !important;
          color: #282f57;
          font-size: 0.209738rem;
        }
      }
      .to_pay {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.359551rem;
        font-size: 0.209738rem;
        color: #888fc5;
        .pay_user_info {
          display: flex;
          align-items: center;
          padding: 0 0.149813rem 0 0.149813rem;
          height: 0.988764rem;
          width: 4.70412rem;
          background-color: #3e4377;
          border: 1px solid #3e4377;
          border-radius: 0.089888rem;
          .avatar {
            border-radius: 50%;
            width: 0.599251rem;
            height: 0.599251rem;
            background: url('../../assets/Images/pay/bg_head@3x.png') 0 0 / 100% 100% no-repeat !important;
            vertical-align: middle;
            text-align: center;
            overflow: hidden;
            position: relative;
            .head_Img {
              position: absolute;
              top: 0;
              left: 0;
              width: 0.629213rem;
              height: 0.629213rem;
            }
          }
          .user_details {
            display: flex;
            flex-direction: column;
            margin-left: 0.314607rem;
            justify-content: center;
            .nick {
              margin-bottom: 0.089888rem;
              .span1 {
                font-size: 0.2397rem;
                color: #fff;
              }
              .span2 {
                display: none;
                margin-left: 0.074906rem;
              }
            }
            .account {
              margin-top: 0.089888rem;
            }
          }
        }
        .pay_num, .pay_txt {
          position: relative;
          display: flex;
          color: #acb3e2;
          font-size: 0.209738rem;
          align-items: center;
          display: flex;
          color: #acb3e2;
          font-size: 0.209738rem;
          align-items: center;
          margin-top: 0.2397rem;
          .head {
            width: 1.048689rem;
          }
          .input {
            height: 0.479401rem;
            width: 3.655431rem;
            background-color: #3e4377;
            border: 1px solid #3e4377;
            border-radius: 0.059925rem;
            padding-left: 0.11985rem;
            color: #fff;
            &::placeholder {
              color: #888fc5;
            }
          }
          .input {
            &-webkit-outer-spin-button, &-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
          }
          .input[type='number'] {
            -moz-appearance: textfield;
          }
          .max_num {
            position: absolute;
            right: 0.11985rem;
            bottom: 0.089888rem;
            font-size: 0.149813rem;
          }
          .tip {
            position: absolute;
            right: 0.11985rem;
            color: #fff;
          }
        }
        .button_div {
          display: flex;
          justify-content: space-between;
          margin-top: 0.314607rem;
          width: 100%;
          color: #282f57;
          .back_step {
            line-height: 0.479401rem;
            text-align: center;
            width: 1.947566rem;
            margin-right: 0.089888rem;
            background: url('../../assets/Images/pay/btn_pre@3x.png') 0 0 / 100% 100% no-repeat !important;
          }
          .sure {
            line-height: 0.479401rem;
            text-align: center;
            width: 1.947566rem;
            margin-left: 0.089888rem;
            background: url('../../assets/Images/pay/btn_sure@3x.png') 0 0 / 100% 100% no-repeat !important;
            &.disable {
              background: url('../../assets/Images/pay/bg_btn_dis@3x.png') 0 0 / 100% 100% no-repeat !important;
            }
          }
        }
      }
    }
  }
}
@keyframes Scale {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}
</style>
