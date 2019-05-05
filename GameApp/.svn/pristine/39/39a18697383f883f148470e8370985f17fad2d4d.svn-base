<template>
  <transition name="dialog">
    <div v-if="isShow" class="dialog" @click="close">
      <div class="modal" @click.stop :style="styls">
        <div class="modal-head">
          <!-- <p class="title">{{titleName}}</p> -->
          <img class="close" src="../../assets/Images/Login/icon_login_close.png" alt @click="close"/>
          <img v-if="titleName == '修改用户名'" class="headImg" src="../../assets/Images/PersonalPage/alert_title_editname.png" alt/>
          <img v-if="titleName == '设置资金密码'" class="headImg" src="../../assets/Images/PersonalPage/alert_title_money.png" alt/>
          <img v-if="titleName == '重置资金密码'" class="headImg" src="../../assets/Images/PersonalPage/alert_title_resetmoney.png" alt/>
          <img v-if="titleName == '重置登录密码'" class="headImg" src="../../assets/Images/PersonalPage/alert_title_psd.png" alt/>
          <img v-if="titleName == '提现验证'" class="headImg" src="../../assets/Images/PersonalPage/alert_title_tixian.png" alt/>
          <img v-if="titleName == '提现'" class="headImg" src="../../assets/Images/PersonalPage/alert_title_tixianAction.png" alt/>
          <img v-if="titleName == '充值'" class="headImg" src="../../assets/Images/PersonalPage/alert_title_chongzhiAction.png" alt/>
          <img v-if="titleName == '区块验证'" class="headImg" src="../../assets/Images/Hxjc/@3x/blockCheck@3x.png" alt/>
        </div>
        <slot class="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      required: true
    },
    styls: {
      type: [Object, String]
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  components: {},
  methods: {
    close() {
      this.$clickAudio();
      this.isShow = false;
    },
    show() {
      this.$clickAudio();
      this.isShow = true;
    }
  }
};
</script>

<style scoped lang="stylus">
@import './styl.styl';
.modal {
  margin-top :0.449438rem;
}
</style>
