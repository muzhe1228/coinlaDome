<template>
  <div class="wrap">
    <div class="cItemTop">
      <img src="~assets/Images/Hxnn/hot.png" alt>
      <p class="cItemTop_btn">{{data.roomStatus|roomStatus}}</p>
    </div>
    <div class="wrap_center">
      <p class="ItemLocation">{{data.roomType|roomRank}}</p>
      <p class="ItemPric">
        <img src="~assets/Images/Hxnn/tenImg.png" alt>
        <span>{{data.totalBets|numRes}}PK</span>
      </p>
    </div>
    <div class="wrap_bot">
      <p>
        <i class="iconfont">&#xe670;</i>
        <span>{{data.peopleNumber}}</span>
      </p>
      <p>{{data.minBets|numRes}} - {{data.maxBets|numRes}}PK</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style scoped lang="less">
.wrap {
  width: 100%;
  height: 100%;
  min-height: 1.588015rem;
  padding: 0.089888rem;
  border-radius: 0.089888rem;
  background-color: #428d74;
  color: #fff;
  position: relative;
  .cItemTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    img {
      width: 0.2397rem;
      height: 0.2397rem;
    }
    &_btn {
      display: inline-block;
      padding: 0 0.089888rem;
      min-width: 0.749064rem;
      border-radius: 0.134831rem;
      background-color: #3a7d65;
      font-size: 0.149813rem;
      height: 0.269663rem;
      line-height: 0.2397rem;
      text-align: center;
      color: #acddcb;
    }
  }
  &_center {
    .ItemLocation {
      font-size: 0.329588rem;
      text-align: center;
      margin-top: 0.11985rem;
    }
    .ItemPric {
      text-align: center;
      font-size: 0.194757rem;
      display: flex;
      align-items: center;
      padding-top: 0.11985rem;
      justify-content: center;
      img {
        width: 0.179775rem;
        height: 0.179775rem;
        margin-right: 0.029963rem;
      }
    }
  }

  &_bot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 0.089888rem;
    border-radius: 0 0 0.089888rem 0.089888rem;
    height: 0.359551rem;
    width: 100%;
    background-color: #3a7d65;
    font-size: 0.149813rem;
    vertical-align: bottom;
    i {
      margin-right: 0.029963rem;
      font-size: 0.149813rem;
    }
  }
  &.active {
    background-color: #2b292f;

    .cItemTop {
      &_btn {
        background-color: #212126;
        color: #d7c142;
      }
    }
    .wrap_bot {
      background-color: #212126;
    }
  }
}
</style>
