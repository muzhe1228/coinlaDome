<template>
  <div class="PKWrap">
    <div class="userGroup">
      <p class="nick">{{nick}}</p>
      <div class="PkNumberGroup">
        <p class="pkLogo" ref="pkLogo">
          <img class="pk" src="~assets/Images/Hxjc/@3x/icon_pk@3x.png" alt>
        </p>
        <p class="pkNum">
          {{getPkNum(PkNum) + " "}}
          <!-- <countTo :endVal="Number(PkNum)" :duration="800" :decimals="1" suffix=" PK"></countTo> -->
        </p>
        <p class="addIcon" @click="showFun">
          <img src="~assets/Images/Hxjc/@3x/icon_add@3x.jpg" alt>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import countTo from "vue-count-to";
import {
  numberFormat
} from "common/func";
export default {
  
  data() {
    return {};
  },
  props: {
    nick: {
      type: String
    },
    showFun:{
      type: Function
    }
  },
  computed: {
    ...mapState(["PkNum"])
  },
  components: {
    countTo
  },
  methods: {
    getPkNum(PkNum){
      return numberFormat(PkNum) + " PK";
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.PKWrap {
  // display: flex;
  // align-items: center;
  // width: 2.247191rem;
  // height: 0.404494rem;
  // background-color: #110e0d;
  // border-radius: 0.194757rem;
  // margin-left: 0.149813rem;
  // padding-right: 0.059925rem;
  color: #c1a068;
  position: absolute;
  bottom: 0;
  // left: 50%;
  // width: 2.247191rem;
  height: 0.82397rem;
  // margin-left: -3.835206rem;
  .userGroup {
    position: absolute;
    height: 0.58427rem;
    left: 0.808989rem;
    top: 0.11985rem;
    .nick {
      font-size: 0.179775rem;
      margin-bottom: 0.089888rem;
      color: #fff;
    }
    .PkNumberGroup {
      position: relative;
      height: 0.314607rem;
      min-width: 2.022472rem;
      background-color: rgba(1, 8, 11, 0.9);
      border-radius: 0.209738rem;
      box-shadow: 0 0 0.044944rem #a9b1bf;
      display: flex;
      padding-right: 0.179776rem;
      // justify-content: center;
      .pkLogo {
        padding: 0.029963rem;
        left: 0;
        img {
          width: 0.254682rem;
          vertical-align: middle;
        }
      }
      .pkNum {
        font-size: 0.179775rem;
        color: #d7c385;
        text-shadow: 0 0.014981rem 0.014981rem #735805;
        line-height: 0.314607rem;
        padding-left :0.074906rem;
      }
      .addIcon {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.029963rem;
        img {
          width: 0.254682rem;
          height: 0.254682rem;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
