<template>
  <transition name="dialog">
    <div class="wrapper">
      <div class="result">
        <img src="../../assets/Images/YYdb/@3x/liupai_text_@3x.png" alt>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollH from "components/ScrollH";
import { dateFormat } from "common/func";
export default {
  data() {
    return {};
  },
  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  components: { ScrollH },
  mounted() {},
  methods: {
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
.wrapper {
  position: fixed;
  width: 55%;
  height: 70%;
  background: #16151180;
  left: 0.973783rem;
  top: 0.659176rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  .result {
    width: 4.344569rem;
    height: 0.988764rem;
    justify-content: center;
    display: flex;
    align-items: center;
    background: url('../../assets/Images/YYdb/@3x/bg_liupai_@3x.png') 0 0 / 100% 100% no-repeat;
    // margin-right: 0.749064rem;
    // margin-bottom: 1.06367rem;
    img {
      height: 80%;
      width: 80%;
    }
  }
}
</style>
