<template>
  <div class="left-wrap show">
    <transition name="slide-fade">
      <div class="left-nav">
        <ul class="nav-info">
          <router-link :to="item.url" tag="li" v-for="item in NavData" :key="item.url">
            {{item.title}}
            <p
              class="redPoint"
              v-if="messageUnReadNum > 0 && item.url === '/msg_center'"
            >{{messageUnReadNum}}</p>
            <img class="line" src="~assets/Images/left_nav_line.png">
            <div @click="ClickItem" class="itemDiv"></div>
          </router-link>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      NavData: [
        {
          title: "个人资料",
          url: "/user_info",
          icon: "&#xe61e;"
        },
        {
          title: "任务中心",
          url: "/task_center",
          icon: "&#xe602;"
        },
        {
          title: "收支明细",
          url: "/payments",
          icon: "&#xe78e;"
        },
        {
          title: "游戏记录",
          url: "/game_record",
          icon: "&#xe61f;"
        },
        {
          title: "安全设置",
          url: "/security_setting",
          icon: "&#xe723;"
        },
        {
          title: "消息中心",
          url: "/msg_center",
          icon: "&#xe620;"
        }
      ]
    };
  },
  computed: {
    ...mapState(["messageUnReadNum"])
  },
  mounted() {
    this.RequestUnReadCount();
  },
  components: {},
  methods: {
    ClickItem() {
      console.log("点击侧边栏条目");
      // this.$clickAudio();
    },
    RequestUnReadCount() {
      if (!this.$lStore.get("Token")) {
        return;
      }
      this.$ajax(
        {
          url: "/mcs/message/selectMessageRedDot",
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
            if (res.data) {
              console.log("未读消息数量" + res.data);
              this.updateMessageUnRead(res.data);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions(["updateMessageUnRead"])
  }
};
</script>

<style scoped lang="stylus">
.left-wrap {
  position: relative;
  width: 0;
  &.show {
    width: 1.348315rem;
  }
  .slide-fade-leave-active, .slide-fade-enter-active, & {
    transition: all 0.2s linear;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  .left-nav {
    position: relative;
    width: 1.348315rem;
    height: 100%;
    color: #fff;
    background-color: #2b292f;
    background: url('../../assets/Images/sub_bg_left.png') 0 0 / 100% 100% no-repeat !important;
    .nav-info {
      display: flex;
      flex-direction: column;
      height: 100%;
      li {
        // flex: 1;
        height :0.659176rem;
        display: flex;
        align-items: center;
        font-size: 0.224719rem;
        color: #acb3e2;
        text-shadow: #02093b 0.5px 1.5px;
        line-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        &.router-link-active {
          color: #fff;
          text-shadow: #ab4d15 -0.5px 1.5px;
          background: url('../../assets/Images/sub_btn_select.png') 0 0 / 100% 100% no-repeat !important;
          // border-bottom: 0.014981rem solid #e3c877;
        }
        i {
          margin-right: 0.059925rem;
        }
        .redPoint {
          width: 0.224719rem;
          height: 0.224719rem;
          border-radius: 0.12rem;
          background: red;
          color: white;
          font-size: 0.133333rem;
          display: inline-block;
          position: absolute;
          right: 0.029963rem;
          top: 30%;
          margin-top: -0.12rem;
          line-height: 0.224719rem;
        }
        .itemDiv {
          width: 100%;
          height: 100%;
          background-color: transparent;
          position: absolute;
          left: 0;
          top: 0;
        }
        .line {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
        }
      }
    }
  }
  .iconHandele {
    width: 0.299625rem;
    height: 0.779026rem;
    border-radius: 0 0.179775rem 0.179775rem 0;
    position: absolute;
    right: -0.299625rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(43, 41, 47, 0.8);
    color: #fff;
    text-align: center;
    line-height: 0.779026rem;
    z-index: 99;
    .iconfont {
      font-size: 0.179775rem;
    }
  }
}
</style>
