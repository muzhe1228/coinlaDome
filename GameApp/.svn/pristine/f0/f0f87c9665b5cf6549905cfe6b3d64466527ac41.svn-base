<template>
  <div class="startPage">
    <div class="wrap">
      <img class="wrap-logo" src="~assets/Images/startPage/StartLogo@3x.png" alt>

      <div class="wrap-btn" @click="showLogin" v-if="showLoading == false">
        <p class="login">
          <img :src="startBtnImg" alt>
        </p>
      </div>

      <div class="wrap-loading" v-if="showLoading == true">
        <p>LOADING.. {{num}}%</p>
        <div class="wrap-loading-info">
          <div class="progress">
            <p>
              <img id="progressImg" src="~assets/Images/startPage/progress.png" alt>
            </p>
          </div>
          <div class="progressLight" id="progressLightImg">
            <img src="~assets/Images/startPage/progressLight.png" alt>
          </div>
        </div>
      </div>
    </div>
    <LoginReg v-if="isShowLogin" @close="closeReg" :intoGame="startProgress"></LoginReg>
  </div>
</template>

<script>
import ENV from "common/Api/ENV";
import LoginReg from "components/Modal/loginReg";
import { isIos } from "common/func";
export default {
  data() {
    return {
      showLoading: false,
      num: 0,
      startBtnImg: require(this.$lStore.get("Token")
        ? "../../assets/Images/startPage/btn_startup_login@3x.png"
        : "../../assets/Images/startPage/login@3x.png"),
      isShowLogin: false
    };
  },
  mounted() {
    window.setAppType = this.setAppType;
    window.receiveAppVersion = this.receiveAppVersion;
    this.$getAppType();
    this.getAppVersion();
  },
  components: { LoginReg },
  methods: {
    setAppType(type) {
      this.$lStore.set("app_type", type);
    },
    showLogin() {
      this.checkAudioSet();
      if (this.$lStore.get("Token")) {
        this.LoadAllAudio();
        this.startProgress();
      } else {
        //显示登录页面
        this.LoadAllAudio();
        this.isShowLogin = true;
      }
    },
    closeReg() {
      this.isShowLogin = false;
    },
    LoadAllAudio() {
      //获取图片地址存入本地
      console.log("****", ENV.getENV().ImageURL);
      this.$lStore.set("ImageUrl", ENV.getENV().ImageURL);

      //默认开启操作音效
      // this.$lStore.set("Game_Audio_Switch", true);
      let isOpenAudio = this.$lStore.get("Game_Audio_Switch_Standard");
      this.$lStore.set("Game_Audio_Switch", isOpenAudio ? isOpenAudio : true);

      //哈希竞猜
      this.$welcomeHXJC(0);
      this.$hxjcPlayAllBackgroundBGM();
      this.$hxjcLoadAllCountDown();
      this.$hxjcLoadAllOpenResult();
      this.$hxjcStartGame(0);
      this.$hxjcXiaZhuSuccess(0);
      this.$hxjcStopXiaZhu(0);
      this.$hxjcSlideBgm(0);
      this.$hxjcChipDownBGM(0);
      //一元夺币
      this.$dbWelcom(0);
      this.$dbStartGame(0);
      this.$dbXiaZhuSuccess(0);
      this.$dbStopXiaZhu(0);
      //点击音效
      this.$clickAudio(true);

      console.log("预加载全部语音");
    },

    //进度条
    startProgress() {
      this.showLoading = true;
      let timer = null;
      timer = setInterval(() => {
        this.num++;

        let progressImg = document.getElementById("progressImg");
        progressImg.style.left = this.num - 100 + "%";

        let progressLightImg = document.getElementById("progressLightImg");
        progressLightImg.style.left = this.num - 3.5 + "%";

        if (this.num == 100) {
          clearInterval(timer);
          // this.$clearHistory();
          this.$router.push("/index");
        }
      }, 10);
    },
    //获取版本号
    getAppVersion() {
      if (isIos()) {
        window.webkit.messageHandlers.NativeMethod.postMessage("getAppVersion");
      } else {
        window.openApp.getAppVersion();
      }
    },
    //接收APP版本号
    receiveAppVersion(version) {
      this.$lStore.set("app_version", version);
    },
    //检查音效设置
    checkAudioSet() {
      if (this.$lStore.get("Token")) {
        this.$ajax(
          {
            url: "/uac/user/selectMusicSetting",
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
              console.log("后端音效设置", res.data);
              var isBackgroundMusic = !res.data.isBackgroundMusic;
              var isGameMusic = !res.data.isGameMusic;
              this.$lStore.set("BackGround_BGM_Switch", isBackgroundMusic);
              this.$lStore.set("Game_Audio_Switch", isGameMusic);
              this.$lStore.set("Game_Audio_Switch_Standard", isGameMusic);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.startPage {
  width: 100%;
  height: 100%;
  background: url('../../assets/Images/startPage/Startpage@3x.jpg') 0 0 / 100% 100% no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 6.052434rem;
    &-logo {
      width: 4.044944rem;
    }
    &-loading {
      height: 1.198502rem;
      width: 100%;
      padding-top: 0.569288rem;
      font-size: 0.179775rem;
      color: #e6d088;
      text-shadow: 0 0.029963rem 0.029963rem #735805;
      p {
        text-align: center;
        margin-bottom: 0.224719rem;
      }
      &-info {
        width: 100%;
        height: 0.11985rem;
        position: relative;
        .progress {
          width: 100%;
          height: 100%;
          background-color: #251a0b;
          border-radius: 0.059925rem;
          border: 1px solid #65553b;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            left: -100%;
            top: 0;
            width: 100%;
            height: 100%;
            // transform: translate(-50%, -50%);
          }
        }
        .progressLight {
          position: absolute;
          left: -0.172285rem;
          top: -0.134831rem;
          width: 0.344569rem;
          height: 0.389513rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    &-btn {
      height: 1.198502rem;
      display: flex;
      padding-top: 0.524345rem;
      img {
        width: 1.52809rem;
      }
    }
  }
}
</style>
