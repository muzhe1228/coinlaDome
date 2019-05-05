<template>
  <transition name="dialog">
    <div class="dialog" @click="ClickOutSide">
      <div class="modal" @click.stop :style="styls">
        <div class="modal-head">
          <p class="title">{{titleName}}</p>
          <!-- <p class="close animated" @click="close">
            <i class="iconfont">&#xe619;</i>
          </p>-->
        </div>
        <slot></slot>
        <!-- <img class="closeBtn" @click="close" src="../../assets/Images/Login/icon_login_close.png" alt> -->
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
      type: Object,
      default: () => {
        return {};
      }
    },
    pageType: {
      type: String,
      required: false
    }
  },

  components: {},
  methods: {
    close() {
      this.$emit("close");
    },
    show() {
      this.isShow = true;
    },
    ClickOutSide() {
      //只有登录页面点击外面蒙版不触发关闭操作
      if (this.pageType == "login") {
      } else {
        this.close();
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import './styl.styl';
.modal {
  width: 5.123596rem;
  height: 2.636704rem;
  position: relative;
  .closeBtn {
    position: absolute;
    width :0.419476rem;
    height :0.419476rem;
    right :0;
    top :-0.554307rem;

  }
}
</style>
