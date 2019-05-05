<template>
  <div>
    <div class="openWrapper show" :class="LotteryData && 'show'" @click="hide">
      <div class="openWrap">
        <div class="openBei">
          <img :src="BeiImg" alt>
          <p>123456</p>
        </div>
        <div class="openPk">
          <img :src="PKImg" alt>
          <p>154.56PK</p>
        </div>
        <div class="openBtn">
          <img @click="toOther" :src="BtnOkImg" alt>
          <img @click="toOther()" :src="BtnCancelmg" alt>
        </div>
      </div>
    </div>
    <!-- <Socket :url="`${ENV.socketOpen}/${userId}`" :onMessage="OpenSocket"/> -->
  </div>
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
.openWrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0, 0);
  transition: all 0.4s linear;
  &.show {
    transform: scale(1, 1);
  }
  .openWrap {
    width: 4.494382rem;
    height: 4.494382rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .openBei {
      width: 100%;
      height: 2.951311rem;
      display: flex;
      justify-content: center;
      position: relative;
      img {
        width: 2.966292rem;
        height: 2.951311rem;
      }
      p {
        position: absolute;
        top: 43%;
        left: 50%;
        font-size: 0.2397rem;
        transform: translateX(-50%);
        font-weight: bolder;
        // background: linear-gradient(to left, #fff7be, #fff, #fff7be);
        // -webkit-background-clip: text;
        // color: transparent;
        color: #fff7be;
      }
    }
    .openPk {
      display: flex;
      align-items: center;
      height: 0.659176rem;
      img {
        height: 0.329588rem;
        width: 0.329588rem;
      }
      p {
        font-size: 0.269663rem;
        color: $colorMain;
        margin-left: 0.11985rem;
        font-weight: bolder;
      }
    }
    .openBtn {
      display: flex;
      align-items: center;
      height: 0.659176rem;
      img {
        height: 0.449438rem;
        width: 1.52809rem;
        margin: 0.11985rem;
      }
    }
  }
}
</style>
