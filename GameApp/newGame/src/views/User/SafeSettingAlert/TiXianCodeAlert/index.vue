<template>
  <comModal ref="comm" :styls="styls" titleName="提现验证">
    <div class="wrapper">
      <div class="moneyPsd unChange">
        <div class="leftChoose">
          <p class="select">
            <img src="~assets/Images/PersonalPage/alert_select.png" alt>
          </p>
        </div>

        <span>资金密码</span>
      </div>

      <div class="moneyPsd" @click="SelectEmail">
        <div class="leftChoose">
          <p v-if="chooseEmailYanZheng===0" class="select">
            <img src="~assets/Images/PersonalPage/alert_select.png" alt>
          </p>
        </div>

        <span>验证码</span>
      </div>
      <Btn class="submit" text="确定" @click.native="SubmitTiXianSetting()"/>
    </div>
  </comModal>
</template>

<script>
import comModal from "components/Modal/comModal";
import Btn from "components/Modal/loginReg/Btn";
export default {
  props: {
    mobile: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      styls: "",
      chooseEmailYanZheng: 1
    };
  },
  components: { comModal, Btn },
  methods: {
    show() {
      this.styls = { height: "50%", width: "40%" };
      this.$refs.comm.show();
    },
    //选择-取消 验证
    SelectEmail() {
      this.$clickAudio();
      if (this.chooseEmailYanZheng === 0) {
        this.chooseEmailYanZheng = 1;
      } else {
        this.chooseEmailYanZheng = 0;
      }
    },
    //提交提现验证
    SubmitTiXianSetting() {
      this.$ajax(
        {
          url: "/uac/user/updateWithdrawVerify",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              isEmail: this.chooseEmailYanZheng
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log(res.data);
            this.$toast("设置成功！");
            this.$refs.comm.close();
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
  margin: 0.2rem;
  margin-top: 0;
  font-size: 0.186667rem;
  .moneyPsd {
    margin-top: 0.299625rem;
    position: relative;
    .leftChoose {
      position: absolute;
      width: 0.266667rem;
      height: 0.266667rem;
      border-radius: 0.059925rem;
      background: #3e4377;
      display: flex;
      align-items: center;
      text-align: center;
      p {
        display: flex;
        align-items: center;
        width: 100%;
        position: absolute;
        left: 0%;
        padding: 0.014981rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .select {
        background: #a5adea;
        border-radius: 0.059925rem;
      }
    }
    span {
      padding-left: 0.4rem;
      color: #fff;
      line-height: 0.266667rem;
    }
  }
  .submit {
    margin-top: 0.149813rem;
  }
}
</style>
