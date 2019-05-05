<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <div class="logo">
        <img src="../../assets/Images/open/icon_infor_radio@3x.png" alt>
      </div>
      <div class="size" v-if="content.messageType == 1">
        <p>{{content.message}}</p>
      </div>
      <div class="size" v-else>
        <p>恭喜您在</p>
        <p class="game">{{content.gameType |gameEnum}}</p>
        <p>中获得</p>
        <p class="PK">{{content.winBets}}PK</p>
        <p>奖励</p>
      </div>
      <!-- <span class="content">{{content}}</span> -->
      <!-- <a class="btn" @click.stop.prevent="handleClose">{{btn}}</a> -->
      <img class="closeImg" @click.stop.prevent="handleClose" src="../../assets/Images/open/icon_close@3x.png" alt>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Notification",
  props: {
    content: {
      type: Object,
      required: true
    },
    btn: {
      type: String,
      default: "关闭"
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    style() {
      return {};
    }
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    afterLeave() {
      this.$emit("closed");
    },
    afterEnter() {},
    clearTimer() {},
    createTimer() {}
  }
};
</script>

<style scoped lang="stylus">
.fade-enter-active，.fade-leave-active {
  // 动画离开过程：0.5s
  transition: all 0.3s;
}
.fade-enter, .fade-leave-active {
  // 动画之前的位置
  transform: translateX(100%);
  opacity: 0;
}
.notification {
  display: flex;
  background: linear-gradient(to right, #363e76, #3d4c8d);
  color: #acb3e2;
  align-items: center;
  position: fixed;
  top: 1.198502rem;
  right: 0;
  min-width: 1.797753rem;
  height: 0.449438rem;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  border-radius: 0.224719rem 0 0 0.224719rem;
  .logo {
    padding-left: 0.059925rem;
    padding-right: 0.11985rem;
    img {
      width: 0.359551rem;
    }
  }
  .size {
    display: flex;
    font-size: 0.209738rem;
    padding-right: 0.11985rem;
    p {
      color: #acb3e2;
      letter-spacing: 1px;
      &.game {
        color: #fff;
        padding: 0 0.029963rem;
      }
      &.PK {
        color: #ffe069;
        padding: 0 0.029963rem;
      }
    }
  }
  .btn {
    color: #ff4081;
    cursor: pointer;
    padding: 0 0.11985rem;
  }
  .closeImg{
    width :0.299625rem;
    padding-right :0.074906rem;
  }
}
</style>
