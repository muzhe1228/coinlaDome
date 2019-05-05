<template>
  <div id="toast" v-if="showWrap">
    <p :class="showContent ?'fadein':'fadeout'" v-html="text"></p>
  </div>
</template>

<style lang="stylus" scoped>
#toast {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    background: rgba(0, 0, 0, 0.6);
    padding: 0.089888rem;
    border-radius: 0.059925rem;
    min-width: 1.498127rem;
    text-align: center;
    line-height: 0.359551rem;
    color: #fff;
    font-size: 0.179775rem;
  }
}
.fadein {
  animation: animate_in 0.3s;
}
.fadeout {
  animation: animate_out 0.3s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
