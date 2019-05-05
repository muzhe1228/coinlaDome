<template>
  <footer>
    <img class="lightLine" src="../../assets/Images/home_bottom_light.png" alt>
    <ul>
      <li @click="toPage('/user_info')">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_personal.png" alt>
        </p>
        <p class="text">我的</p>
      </li>
      <li @click="toPage('/task_center')">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_ task.png" alt>
        </p>
        <p class="text">任务</p>
      </li>
      <!-- <li @click="showRule">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_rule.png" alt>
        </p>
        <p>说明</p>
      </li>-->
      <!-- <li @click="toPage('/invite')">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_fl.png" alt>
        </p>
        <p class="new" v-if="!checkFuli"></p>
        <p>福利</p>
      </li>-->
      <li @click="toPage('/activity')">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_activity.png" alt>
        </p>
        <p class="text">活动</p>
      </li>
      <li @click="toPage('/severChat')">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_kf.png" alt>
        </p>
        <p class="text">客服</p>
      </li>
      <li @click="showAudioSetFuc">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_audioset.png" alt>
        </p>
        <p class="text">设置</p>
      </li>
      <!-- <li @click="toPage('/rank')">
        <img class="bottom_btn_bg" src="../../assets/Images/home_bottom_btnbg.png" alt>
        <p>
          <img src="../../assets/Images/home_bottom_rank.png" alt>
        </p>
        <p class="text">排行</p>
      </li>-->
    </ul>
    <p class="appVersion">{{showAppVersion()}}</p>
    <!-- <p class="quicklyStart" @click="quicklyStart">快速开始</p> -->
    <HomeRule ref="gameRule"></HomeRule>
    <GameAudioSet v-if="showAudioSet" @close="closeAudioSetFuc"></GameAudioSet>
  </footer>
</template>

<script>
import HomeRule from "../Modal/GameRule/home";
import GameAudioSet from "components/Modal/GameAudioSet/GameAudioSet";
import { isIos } from "common/func";
export default {
  data() {
    return {
      checkFuli: null, //检查是否有新的福利未领取 (点击过一次红点就消失)
      showAudioSet: false //是否显示音效设置
    };
  },
  mounted() {
    this.checkFuli = this.$lStore.get("checkFuli");
  },
  components: { HomeRule, GameAudioSet, isIos },

  methods: {
    showAudioSetFuc() {
      this.showAudioSet = true;
    },
    closeAudioSetFuc() {
      this.showAudioSet = false;
    },
    showRule() {
      this.$clickAudio();
      this.$refs.gameRule.show();
    },

    toPage(path) {
      this.$clickAudio();
      if (
        path === "/severChat" ||
        path === "/invite" ||
        path === "/user_info"
      ) {
        this.CheckToken(0, path);
      } else if (path === "/activity") {
        let isApp = this.$lStore.get("app_type");
        var herf = window.location.href;
        window.location.href =
          "https://wap.bbpk.app/?isApp=" +
          isApp +
          "&backUrl=" +
          herf;
      } else {
        this.$router.push(path);
      }
    },
    //验证TOKEN
    CheckToken(type, path) {
      this.$ajax(
        {
          url: "/uac/user/checkToken",
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
            if (type === 0) {
              this.$router.push(path);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //显示版本号
    showAppVersion() {
      var appVersion = this.$lStore.get("app_version");
      if (appVersion) {
        if (appVersion % 1 === 0) {
          return "v" + appVersion + ".0";
        } else {
          return "v" + appVersion;
        }
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
footer {
  height: 0.659176rem;
  width: 100%;
  background-color: $bgMain;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.359551rem;
  background: url('../../assets/Images/home_bottom_bg@3x.png') 0 0 / 100% 100% no-repeat !important;
  position: relative;
  .lightLine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.014981rem;
  }
  ul {
    display: flex;
    width: 100%;
    li {
      margin-right: 0.2397rem;
      display: flex;
      position: relative;
      img {
        z-index: 1;
        width: 0.269663rem;
      }
      p {
        z-index: 1;
        // margin-top: 0.074906rem;
        margin-left: 0.059925rem;
        font-size: 0.179775rem;
        // background: linear-gradient(#f4ce8e, #fcf3bd);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        // te
        color: #b79253;
        img {
          margin-top: -0.067416rem;
        }
      }
      .new {
        z-index: 1;
        position: absolute;
        left: 0.194757rem;
        top: -0.074906rem;
        width: 0.089888rem;
        height: 0.089888rem;
        border-radius: 0.044944rem;
        background: red;
      }
      .bottom_btn_bg {
        position: absolute;
        left: 0.037453rem;
        bottom: 0;
        width: 0.794007rem;
        z-index: 0;
      }
      .text {
        padding-top: 0.029963rem;
      }
    }
  }
  .quicklyStart {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.947566rem;
    height: 100%;
    background: url('../../assets/Images/home_btn_bottom_start@3x.png') 0 0 / 100% 100% no-repeat !important;
    color: #ffffff;
    text-shadow: #cd7900 0 0.022472rem;
    font-size: 0.269663rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .notic {
    width: 2.996255rem;
  }
  .appVersion {
    position: absolute;
    top: 0;
    right: 0;
    height: 0.659176rem;
    font-size: 0.209738rem;
    color: #95b1d7;
    line-height: 0.659176rem;
    padding-right: 0.089888rem;
  }
}
</style>
