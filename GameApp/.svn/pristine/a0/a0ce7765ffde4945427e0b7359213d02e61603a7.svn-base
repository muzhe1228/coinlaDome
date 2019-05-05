<template>
  <div class="home">
    <img class="bgMain" src="../../assets/Images/bg@3x.jpg" alt>
    <!-- <LeftNav/> -->
    <ul class="wrap">
      <li class="wrap-radio">
        <MsgSlider class="notic"></MsgSlider>
      </li>
      <li class="wrap-L">
        <div class="left_girl">
          <img src="~/assets/Images/home_left_girl.png" alt>
        </div>
        <p @click.stop="toPage('/hxnn','open')">
          <img src="~/assets/Images/home_gameIcon_first.png" alt>
        </p>
      </li>
      <li class="wrap-C" @click.stop="toPage('/hxjc')">
        <img src="~/assets/Images/home_gameIcon_second.png" alt>
      </li>
      <li class="wrap-R">
        <p class="wrap-R-T" @click.stop="toPage('/yydb')">
          <img src="~/assets/Images/home_gameIcon_third.png" alt>
        </p>
        <p class="wrap-R-B" @click.stop="agentMentor">
          <img src="~/assets/Images/home_gameIcon_fourth.png" alt>
        </p>
      </li>
    </ul>
    <SignWindow
      v-if="isShowSign"
      :signNum="ActivityStatuResultVo.sginNum"
      :sginList="ActivityStatuResultVo.sginList"
      @close="CloseSign"
    ></SignWindow>
    <RedPackage
      v-if="isShowRedbag"
      :pkNumber="ActivityStatuResultVo.registerNum"
      @close="CloseRedBag"
    ></RedPackage>
  </div>
</template>
<script>
import LeftNav from "components/LeftNav";
import MsgSlider from "components/MsgSlider";
import SignWindow from "components/Modal/SignWindow";
import RedPackage from "components/Modal/RedPackage";
import { mapActions, mapState } from "vuex";
import ENV from "common/Api/ENV";
export default {
  data() {
    return {
      show: false,
      ActivityStatuResultVo: {}, //签到，注册红包状态
      isShowRedbag: false, //红包显示
      isShowSign: false //签到显示
    };
  },
  mounted() {
    this.$lStore.set("backUrl", window.location.href);
    this.getActivityState();
    if (this.$lStore.get("BackGround_BGM_Switch")) {
      this.$hxjcBackgroundBGM();
    } else {
      this.$hxjcCloseBackgroundBGM();
    }
    this.$clearHistory();
  },
  computed: {
    ...mapState(["userInfo", "token"])
  },
  watch: {
    token(newToken, oldToken) {
      if (newToken) {
        this.getActivityState();
      }
    }
  },
  methods: {
    getActivityState() {
      if (!this.$lStore.get("Token")) {
        return;
      }
      this.$ajax(
        {
          url: "/acs/activityCenter/selectActivityStatus",
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
            console.log(res.data,'000000000000');
            this.ActivityStatuResultVo = res.data;
            this.isShowRedbag = res.data.registerStatu == 0;
            if (res.data.registerStatu >= 1) {
              this.isShowSign = this.ActivityStatuResultVo.signStatu == 0;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    CloseRedBag() {
      this.isShowRedbag = false;
      this.isShowSign = this.ActivityStatuResultVo.signStatu == 0;
    },
    CloseSign() {
      this.isShowSign = false;
    },
    toPage(url, open) {
      this.$clickAudio();
      var token = this.$lStore.get("Token");
      if (!token) {
        this.updatedIsShowLogin(true);
      } else {
        if (open) {
          this.intoNiuNiu();
        } else {
          this.$router.push(url);
        }
      }
    },
    agentMentor() {
      if (this.userInfo.type == 4 || this.userInfo.type == 5) {
        window.open("https://agent.bbpk.com");
      } else {
        // window.open("https://agent.bbpk.com");
        this.$router.push("/invite");
      }
    },
    res() {
      window.location.reload();
    },
    //进入牛牛
    intoNiuNiu() {
      let isApp = this.$lStore.get("app_type") == 1;
      //APP跳转URL通过配置，其他情况取当前域名下的牛牛（域名随时变）
      let openUrl = isApp
        ? ENV.getENV().hxnnUrl
        : window.location.origin + "/hxnn/hxnn.html";

      //APP时 参数通过URL传递，线上通过localStorage传递
      if (isApp || ENV.getENV().name == "test") {
        openUrl = ENV.getENV().hxnnUrl;

        openUrl +=
          "?userId=" +
          this.userInfo.userId +
          "&appType=" +
          (isApp ? 1 : 0) +
          "&token=" +
          this.$lStore.get("Token") +
          "&backUrl=" +
          window.location.href;
      }
      location.href = openUrl;
    },
    ...mapActions(["updatedPkNum", "updatedIsShowLogin", "updatedIsShowLogin"])
  },
  components: { LeftNav, MsgSlider, SignWindow, RedPackage }
};
</script>

<style lang="stylus" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  .bgMain {
    position: absolute;
    left: 0;
    top: -20%;
    z-index: -1;
    height: 120%;
    width: 100%;
  }
  .wrap {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0.749064rem 0 0 2.247192rem;
    position: relative;
    .wrap-radio {
      position: absolute;
      top: 0.179775rem;
      width: 5.692884rem;
      left: 35%;
      height: 0.524345rem;
    }
    &-L {
      position: relative;
      .left_girl {
        position: absolute;
        left: -2.397004rem;
        top: -0.599251rem;
        width: 2.996255rem;
        z-index: -1;
        img {
          height: 100%;
        }
      }
    }
    &-L, &-C {
      width: 2.247191rem;
      height: 3.146067rem;
      border-radius: 0.089888rem;
      margin-right: 0.11985rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-C {
      width: 2.247191rem;
    }
    &-R {
      width: 2.486891rem;
      height: 3.146067rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-T, &-B {
        width: 2.247191rem;
        height: 1.468165rem;
        border-radius: 0.089888rem;
        padding-left: 0.074906rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-B {
        width: 2.247191rem;
        padding-left: 0;
      }
    }
  }
}
</style>

