<template>
  <transition name="fade">
    <div class="shade">test</div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style scoped lang="stylus">
.fade-leave-active, .fade-enter-active {
  transition: all 0.8s linear;
}
.fade-enter, .fade-leave-to {
  // transform: translateY(100%);
  opacity: 0;
}
.shade {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
  z-index: 6;
}
</style>
