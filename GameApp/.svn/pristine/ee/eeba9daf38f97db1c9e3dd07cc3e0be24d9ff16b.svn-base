<template>
  <div class="PKWrap">
    <img src="~assets/Images/Pk.png" alt="PK">
    <p class="PkNum">{{AllPkNum == 0 ? 0 : AllPkNum|numFormat}}</p>
    <p class="icon" @click="showFun">
      <img src="~assets/Images/Hxjc/@3x/icon_add@3x.jpg" alt>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["showFun"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["AllPkNum"])
  },
  components: {},
  methods: {}
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.PKWrap {
  display: flex;
  align-items: center;
  width: 2.097378rem;
  height: 0.404494rem;
  background-color: #1e234a;
  border-radius: 0.194757rem;
  margin-left: 0.599251rem;
  img {
    width: 0.299625rem;
    height: 0.299625rem;
    margin: 0 0.044944rem;
  }
  .PkNum {
    font-size: 0.209738rem;
    color: #fff;
    flex: 1;
    padding-left: 0.044944rem;
    text-align :right;
  }
  .icon {
    width: 0.269663rem;
    height: 0.269663rem;
    // background-color: yellow;
    text-align: center;
    margin: 0 0.104869rem;
    img {
      width: 0.254682rem;
      height: 0.254682rem;
      border-radius: 50%;
    }
  }
}
</style>
