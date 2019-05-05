<template>
  <div>
    <div class="rect" ref="rect"></div>
    <transition
      name="showRect"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @before-leave="handleBeforeLeave"
      @leave="handleLeave"
      @after-leave="handleAfterLeave"
      :css="false"
    >
      <div class="rect" v-if="show"></div>
    </transition>
    <button @click="handleClick()">切换显示方块</button>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
export default {
  data() {
    return {
      isTest: false,
      show: false
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(function() {
      Velocity(
        _this.$refs.rect,
        {
          backgroundColor: "#0085eb",
          translateX: 260,
          rotateZ: "360deg"
        },
        {
          duration: 1000,
          easing: [0.4, 0.01, 0.165, 0.99]
        }
      );
    });
  },
  methods: {
    handleClick: function() {
      this.show = !this.show;
    },
    handleBeforeEnter: function(el) {
      el.style.opacity = 0;
      console.log("方块显示动画即将执行");
    },
    handleEnter: function(el, done) {
      Velocity(el, "stop");
      Velocity(
        el,
        {
          backgroundColor: "#0085eb",
          opacity: 1,
          translateX: 260,
          rotateZ: ["360deg", 0]
        },
        {
          duration: 1000,
          easing: [0.4, 0.01, 0.165, 0.99],
          complete: done
        }
      );
      console.log("方块显示动画执行中...");
    },
    handleAfterEnter: function(el) {
      console.log("方块显示动画结束");
    },
    handleBeforeLeave: function(el) {
      console.log("方块隐藏动画即将执行");
    },
    handleLeave: function(el, done) {
      Velocity(el, "stop");
      Velocity(
        el,
        {
          backgroundColor: "#4dd0e1",
          opacity: 0,
          translateX: 0,
          rotateZ: [0, "360deg"]
        },
        {
          duration: 1000,
          easing: [0.4, 0.01, 0.165, 0.99],
          complete: done
        }
      );
      console.log("方块隐藏动画执行中...");
    },
    handleAfterLeave: function(el) {
      console.log("方块隐藏动画结束");
    }
  }
};
</script>

<style scoped lang="stylus">
.rect {
  width: 50px;
  height: 50px;
  background: #4dd0e1;
}
</style>
