<template>
  <p class="Progress">
    <span class="Progress_info" :style="{height: changeHeig(heig)}" :class="checkClass(heig)"></span>
  </p>
</template>

<script>
export default {
  props: ["heig"],
  data() {
    return {};
  },
  components: {},
  methods: {
    checkClass(heig) {
      if (heig > 79) {
        return "active1";
      } else if (heig > 49) {
        return "active";
      }
    },
    changeHeig(heig) {
      if (heig * 104 > 14) {
        return heig + "%";
      }
      return "0.14rem";
    }
  }
};
</script>

<style scoped lang="stylus">
.Progress {
  width: 0.149813rem;
  height: 1.048689rem;
  border-radius: 0.074906rem;
  background-color: #051116;
  position relative
  &_info {
    position: absolute;
    bottom: -1px;
    left: 0;
    border-radius: 0.074906rem;
    width: 0.149813rem;
    min-height: 0.149813rem;
    transition: height 1s linear;
    background: linear-gradient(to right, #1c9b55, #a1d675);
  }
  .active {
    background: linear-gradient(to top, #c7ef50, #fab904 70%);
  }
  .active1 {
    background: linear-gradient(to top, #ec972a, #d20202 70%);
  }
}
</style>
