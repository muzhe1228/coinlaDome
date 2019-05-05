<template>
  <transition name="dialog">
    <div class="dialog" @click="close">
      <div v-if="pageType == 1" class="hxjc_modal" @click.stop>
        <div class="headTitle">
          <img src="~assets/Images/Hxjc/@3x/hxjc_audioSetTitle@3x.png" alt>
        </div>
        <div class="content">
          <div class="audioSet backgroundAudioSet">
            <p class="title">背景音乐</p>
            <div class="control">
              <p :class="backGroundAudioSwitch?'unselect':'select'" @click="closeBGM">关</p>
              <p :class="backGroundAudioSwitch?'select':'unselect'" @click="openBGM">开</p>
            </div>
          </div>
          <div class="audioSet gameAudioSet">
            <p class="title">游戏音效</p>
            <div class="control">
              <p :class="GameAudioSwitch?'unselect':'select'" @click="closeGameAudio">关</p>
              <p :class="GameAudioSwitch?'select':'unselect'" @click="openGameAudio">开</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="modal" @click.stop>
        <div class="headTitle">
          <img src="~assets/Images/Hxjc/@3x/all_audioSetTitle@3x.png" alt>
        </div>
        <div class="content">
          <div class="audioSet backgroundAudioSet">
            <p class="title">背景音乐</p>
            <div class="control">
              <p :class="backGroundAudioSwitch?'unselect':'select'" @click="closeBGM">关</p>
              <p :class="backGroundAudioSwitch?'select':'unselect'" @click="openBGM">开</p>
            </div>
          </div>
          <div class="audioSet gameAudioSet">
            <p class="title">游戏音效</p>
            <div class="control">
              <p :class="GameAudioSwitch?'unselect':'select'" @click="closeGameAudio">关</p>
              <p :class="GameAudioSwitch?'select':'unselect'" @click="openGameAudio">开</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props:{
    //pageType 显示在哪个页面 0 全局  1 哈希竞猜
    pageType: {
      type: Number
    },
  },
  data() {
    return {
      listData: [],
      page: 1,
      pageSize: 20,
      canLoadData: true, //是否能加载数据
      backGroundAudioSwitch: this.$lStore.get("BackGround_BGM_Switch"), //背景音乐开关
      GameAudioSwitch: this.$lStore.get("Game_Audio_Switch") //音效开关
    };
  },
  mounted() {
  },
  methods: {
    openBGM() {
      this.$clickAudio();
      this.backGroundAudioSwitch = true;
      this.$hxjcBackgroundBGM();
      this.$lStore.set("BackGround_BGM_Switch",true);
      this.setSeverAudio();
    },
    closeBGM() {
      this.$clickAudio();
      this.backGroundAudioSwitch = false;
      this.$hxjcCloseBackgroundBGM();
      this.$lStore.set("BackGround_BGM_Switch",false);
      this.setSeverAudio();
    },
    openGameAudio() {
      this.GameAudioSwitch = true;
      this.$lStore.set("Game_Audio_Switch",true);
      this.$lStore.set("Game_Audio_Switch_Standard",true);
      this.$clickAudio();
      this.setSeverAudio();
    },
    closeGameAudio() {
      this.GameAudioSwitch = false;
      this.$lStore.set("Game_Audio_Switch",false);
      this.$lStore.set("Game_Audio_Switch_Standard",false);
      this.setSeverAudio();
    },
    close() {
      this.$emit("close");
    },
    //通知服务器变更音效设置
    setSeverAudio(){
      var bgAudio,gameAudio;
      if(this.$lStore.get("BackGround_BGM_Switch")){
        bgAudio = 0;
      } else {
        bgAudio = 1;
      }
      if(this.$lStore.get("Game_Audio_Switch")){
        gameAudio = 0;
      } else {
        gameAudio = 1;
      }

      if (this.$lStore.get("Token")) {
        this.$ajax(
          {
            url: "/uac/user/updateMusicSetting",
            data: {
              params: {
                token: this.$lStore.get("Token"),
                isBackgroundMusic:bgAudio,
                isGameMusic:gameAudio
              }
            }
          },
          true
        )
          .then(res => {
            if (res.code === 0) {
              console.log("后端音效更新成功");
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
  z-index: 999;
  .modal {
    width: 5.213483rem;
    height: 2.337079rem;
    background-color: #2b2f57;
    border-radius: 0.059925rem;
    overflow: hidden;
    .headTitle {
      text-align: center;
      height: 0.659176rem;
      background: url('../../../assets/Images/Hxjc/@3x/audio_topBG@3x.png') 0 0 / 100% 100% no-repeat;
      img {
        height: 0.569288rem;
        margin-top: 0.044944rem;
      }
    }
    .content {
      height: 1.677903rem;
      width: 100%;
      padding: 0 0.419476rem;
      .backgroundAudioSet {
        border-bottom: 1px #1c1f3a solid;
      }
      .audioSet {
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #acb3e2;
        font-size: 0.209738rem;
        .control {
          background :#1c1f3a;
          padding:0.059925rem;
          border-radius :0.044944rem;
          width: 1.318352rem;
          display: flex;
          justify-content: space-between;
          .select {
            background: #a5adff;
            color: #040d12;
          }
          .unselect {
            background: transparent;
            color: #acb3e2;
          }
          p {
            flex: 0.5;
            text-align: center;
            height: 0.419476rem;
            line-height: 0.419476rem;
            border-radius: 0.044944rem;
          }
        }
      }
    }
  }
  .hxjc_modal{
    width: 5.213483rem;
    height: 2.337079rem;
    background-color: #111619;
    border-radius: 0.059925rem;
    overflow: hidden;
    .headTitle {
      text-align: center;
      height: 0.659176rem;
      background: url('../../../assets/Images/Hxjc/@3x/hxjc_luzi_title_bg.png') 0 0 / 100% 100% no-repeat;
      img {
        height: 0.569288rem;
        margin-top: 0.044944rem;
      }
    }
    .content {
      height: 1.677903rem;
      width: 100%;
      padding: 0 0.419476rem;
      .backgroundAudioSet {
        border-bottom: 1px #1a2b31 solid;
      }
      .audioSet {
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #608d9e;
        font-size: 0.209738rem;
        .control {
          background :#010a0f;
          padding:0.059925rem;
          border-radius :0.044944rem;
          width: 1.318352rem;
          display: flex;
          justify-content: space-between;
          .select {
            background: #608d9e;
            color: #040d12;
          }
          .unselect {
            background: transparent;
            color: #608d9e;
          }
          p {
            flex: 0.5;
            text-align: center;
            height: 0.419476rem;
            line-height: 0.419476rem;
            border-radius: 0.044944rem;
          }
        }
      }
    }
  }
}
</style>
