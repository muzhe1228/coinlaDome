<template>
  <div class="warpper">
    <ul>
      <li
        v-for="(item,index) in listData"
        :key="index"
        @click="xiaZhu($event,midList[index])"
        :class="showOpenResult(index,showResult,openData)"
      >
        <!-- 号码和赔率 -->
        <div class="numAndPL">
          <p class="num">{{item.title}}</p>
          <p class="pl">1:{{item.odds}}</p>
        </div>
        <!-- 右上角数字 -->
        <div class="info">
          <img :src="item.image" alt>
        </div>
        <!-- 预下注 -->
        <div class="yuXia" v-if="yuXia[midList[index].positionType]">
          <span>{{yuXia[midList[index].positionType] | numRes}}</span>
          <i class="iconfont" @click.stop="clear(midList[index].positionType)">&#xe619;</i>
        </div>
        <!-- 已下注 -->
        <div class="right_bot" v-if="midList[index].myBets&&!yuXia[midList[index].positionType]">
          <p class="info">
            <span>{{midList[index].myBets | numRes}}</span>
          </p>
          <p class="before"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  props: {
    xiaZhu: {
      type: Function
    },
    clear: {
      type: Function
    },
    midList: {
      type: Array
    },
    yuXia: {
      type: Array
    },
    showResult: {
      type: Boolean,
      default: false
    },
    openData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      listData: [
        {
          id: "10",
          image: require("../../../assets/Images/Hxjc/@3x/midXZ/hxjc_da.png"),
          title: "大",
          odds: "1.95"
        },
        {
          id: "11",
          image: require("../../../assets/Images/Hxjc/@3x/midXZ/hxjc_xiao.png"),
          title: "小",
          odds: "1.95"
        },
        {
          id: "12",
          image: require("../../../assets/Images/Hxjc/@3x/midXZ/hxjc_dan.png"),
          title: "单",
          odds: "1.95"
        },
        {
          id: "13",
          image: require("../../../assets/Images/Hxjc/@3x/midXZ/hxjc_shuang.png"),
          title: "双",
          odds: "1.95"
        }
      ]
    };
  },
  components: { countTo },
  methods: {
    clickDiv() {
      console.log(this.midList);
    },
    showOpenResult(index, showResult, openData) {
      if (showResult) {
        if (index == 0) {
          if (openData.result > 4) {
            return "hightLight";
          } else {
            return "";
          }
        } else if (index == 1) {
          if (openData.result <= 4) {
            return "hightLight";
          } else {
            return "";
          }
        } else if (index == 2) {
          if (openData.result % 2 != 0) {
            return "hightLight";
          } else {
            return "";
          }
        } else if (index == 3) {
          if (openData.result % 2 == 0) {
            return "hightLight";
          } else {
            return "";
          }
        }
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.warpper {
  ul {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      width: 24.4%;
      height: 100%;
      background-color: #18303b;
      border-radius: 0.089888rem;
      box-shadow: 0 0 2px #4884a0;
      position: relative;
      .info {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        text-align: right;
        z-index: 0;
        img {
          margin-right: 0.11985rem;
          margin-top: 0.11985rem;
          width: 0.269663rem;
        }
      }
      .numAndPL {
        position: absolute;
        left: 0%;
        top: 30%;
        width: 100%;
        text-align: center;
        color: #0c2028;
        font-weight: bold;
        font-size: 0.2397rem;
        .num {
          color: #0c2028;
          font-size: 0.479401rem;
          opacity: 0.6;
        }
        .pl {
          margin-top: 0.029963rem;
        }
      }
      .right_bot {
        position: absolute;
        bottom: 0;
        right: 0;
        .info {
          position: relative;
          z-index: 1;
          min-width: 0.599251rem;
          padding: 0 0.149813rem;
          height: 0.299625rem;
          background-color: #2d5161;
          border-radius: 0.269663rem 0 0.089888rem 0;
          text-align: center;
          line-height: 0.299625rem;
          color: #cbb36a;
          font-size: 0.149813rem;
        }
        .before {
          position: absolute;
          width: 100%;
          height: 100%;
          left: -0.029963rem;
          top: 0;
          background-color: #051116;
          border-radius: 0.269663rem 0 0.089888rem 0;
        }
      }
      .yuXia {
        width: 100%;
        height: 0.299625rem;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 0 0 0.059925rem 0.059925rem;
        text-align: left;
        line-height: 0.299625rem;
        color: #a4c0cb;
        font-weight: bolder;
        z-index: 5;
        padding-left: 0.059926rem;
        .iconfont {
          position: absolute;
          right: 0.11985rem;
          top: 0;
          font-size: 0.089888rem;
          color: #a4c0cb;
          &:before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
          }
        }
      }
    }
    .hightLight {
      background: url('../../../assets/Images/Hxjc/@3x/midXZ/hxjc_mid_select.png') 0 0 / 100% 100% no-repeat !important;
    }
  }
}
</style>
