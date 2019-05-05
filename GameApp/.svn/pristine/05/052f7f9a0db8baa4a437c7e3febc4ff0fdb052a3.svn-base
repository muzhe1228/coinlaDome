<template>
  <header>
    <div class="leftBack" @click="backHome">
      <p class="back">
        <img src="~assets/Images/sub_icon_back.png" alt>
      </p>
      <p class="backTitle">返回</p>
    </div>

    <p class="pageTitle">{{getTitle()}}</p>
    <p></p>
    <LoginReg v-if="show" @close="close"></LoginReg>
  </header>
</template>

<script>
import LoginReg from "components/Modal/loginReg";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState(["userInfo", "routerPath"])
  },
  mounted() {},
  methods: {
    getTitle() {
      switch (this.routerPath) {
        case "/user_info":
          return "个人资料";
          break;
        case "/task_center":
          return "任务中心";
          break;
        case "/payments":
          return "收支明细";
          break;
        case "/game_record":
          return "游戏记录";
          break;
        case "/security_setting":
          return "安全设置";
          break;
        case "/msg_center":
          return "消息中心";
          break;
        case "/nn_room":
          return "牛牛房间列表";
          break;
        default:
          break;
      }
    },
    close() {
      this.show = false;
    },
    showLoginReg() {
      this.$clickAudio();
      var token = this.$lStore.get("Token");
      if (!token) {
        this.show = true;
      }
    },
    backHome() {
      this.$clickAudio();
      this.$router.push("/index");
    }
  },
  components: {
    LoginReg
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
header {
  height: 0.599251rem;
  width: 100%;
  background: url('../../assets/Images/sub_bg_top.png') 0 0 / 100% 100% no-repeat !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .leftBack {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    background: url('../../assets/Images/back_bg.png') 0 0 / 100% 100% no-repeat !important;
    height: 115%;
    width: 1.498127rem;
    .back {
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 0.269663rem;
      img {
        width: 0.374532rem;
      }
    }
    .backTitle {
      margin-left: 0.059925rem;
      font-size: 0.179775rem;
      font-weight: 400;
      color: #95b1d7;
    }
  }
  .pageTitle {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 0.599251rem;
    font-size: 0.2397rem;
    color: #fefeff;
    text-shadow: #0b1239 0 2.00003px;
  }
  .rightModal {
    display: flex;
    p {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 0.209738rem;
      img {
        width: 0.299625rem;
        height: 0.299625rem;
      }
    }
  }
}
</style>