<template>
  <transition name="dialog">
    <!-- @click="closeMyself()" -->
    <div class="wrapper" >
      <!-- <div v-if="!judgIsResult(resultData)" class="liupai">
        <img src="../../assets/Images/YYdb/@3x/liupai_text_@3x.png" alt>
      </div> -->
       <!-- v-else-if="judgIsResult(resultData)" -->
      <div class="tiger">
        <!-- <img
          class="close_icon"
          src="../../assets/Images/yydbnew/icon_close@3x.png"
          @click="closeMyself()"
        >-->
        <div class="pk_num" v-show="showPkchange">
          <p class="number">{{getPkNum(resultData.winBets)}}</p>
        </div>
        <ul class="deng_left">
          <li class="deng_left_item" v-for="(item,index) in 7" :key="index">
            <img :src="item | DengImg">
          </li>
        </ul>
        <ul class="deng_top">
          <li class="deng_top_item" v-for="(item,index) in 7" :key="index">
            <img :src="item | DengImg">
          </li>
        </ul>
        <ul class="deng_right">
          <li class="deng_right_item" v-for="(item,index) in 7" :key="index">
            <img :src="item | DengImg">
          </li>
        </ul>

        <div class="scroll_num">
          <div
            class="groups animation-ease"
            v-for="(k,a) in 3"
            @webkitTransitionEnd="endGame(k)"
            :key="a"
          >
            <ul class="group-item" v-for="(i,j) in (round+1)" :key="j">
              <li class="prize-item" v-for="(item,index) in prizes" :key="index">
                <img :src="item | TigerNum" alt>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="kown_btn" @click="closeMyself()">
          <p>我知道了（{{time}}）</p>
        </div>-->
      </div>
    </div>
  </transition>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      round: 6, //转几回合后停下来
      prizes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemHeight: 0, //每个奖品的高度
      prize_id: "", //中奖id
      showPkchange: false
    };
  },

  props: {
    resultData: {
      type: [Object, String]
    },
    time: {
      type: Number,
      default: 3
    }
  },

  mounted() {
    if (this.judgIsResult(this.resultData)) {
      this.itemHeight = $(".prize-item").outerHeight();
      $(".groups").css(
        "height",
        this.itemHeight * this.prizes.length * (this.round + 1)
      );
      this.startClick();
    }
  },
  methods: {
    closeMyself() {
      this.$emit("close");
    },
    judgIsResult(result) {
      if (!result) {
        return false;
      } else {
        if (result.result) {
          if (result.result === -2) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    },
    isWin(winBets) {
      if (winBets) {
        return winBets >= 0 ? 1 : -1;
      } else {
        return 0;
      }
    },
    getPkNum(winBets) {
      var winResult = this.isWin(winBets);
      if (winResult === 0) {
        return "本期未参与";
      } else if (winResult === -1) {
        return this.resultData.winBets + "PK";
      } else {
        return "+" + this.resultData.winBets + "PK";
      }
    },
    startClick() {
      let index = 5;
      this.prizd_id = this.prizes[index];
      this.runGame(this.resultData.result);
    },
    runGame(result) {
      //启动抽奖
      if (result < 10) {
        result = "00" + result;
      } else if (result > 10 && result < 100) {
        result = "0" + result;
      } else {
        result = result + "";
      }
      var res = result.split("");
      // console.log(res);
      this.resetGame();
      var itemHeight = this.itemHeight;
      var groupsHeight = this.round * $(".group-item").height();
      $(".groups").each(function(index, e) {
        var pos = parseInt(res[index]) * itemHeight + groupsHeight;

        setTimeout(() => {
          $(this)
            .addClass("animation-ease")
            .css("transform", "translate3d(0, -" + pos + "px, 0)");
        }, index * 2000);
      });
    },
    endGame(k) {
      setTimeout(() => {
        this.showPkchange = true;
        if (this.isWin(this.resultData.winBets) === 1) {
        this.$winPK();
      }
      }, 4000);
      
      
    },
    resetGame() {
      //重置状态
      $(".groups")
        .removeClass("animation-ease")
        .css("transform", "");
    }
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
  width: 100%;
  height: 100%;
  background: #16151180;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  .liupai {
    width: 4.344569rem;
    height: 0.988764rem;
    justify-content: center;
    display: flex;
    align-items: center;
    background: url('../../assets/Images/YYdb/@3x/bg_liupai_@3x.png') 0 0 / 100% 100% no-repeat;
    margin-right: 0.749064rem;
    img {
      height: 80%;
      width: 80%;
    }
  }
  .tiger {
    height: 3.250936rem;
    width: 3.041199rem;
    background: url('../../assets/Images/yydbnew/tiger_bg.png') 0 0 / 100% 100% no-repeat;
    display: flex;
    // align-items: center;
    // justify-content: center;
    flex-direction: column;
    position: relative;
    .close_icon {
      position: absolute;
      right: -0.749064rem;
      width: 0.509363rem;
    }
    .deng_left {
      position: absolute;
      left: -0.044944rem;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .deng_left_item {
        height: 0.299625rem;
        img {
          width: 0.2397rem;
          height: 0.2397rem;
        }
        &:nth-child(1) {
          margin-left: 0;
        }
        &:nth-child(2) {
          margin-left: 0.022472rem;
        }
        &:nth-child(3) {
          margin-left: 0.029963rem;
        }
        &:nth-child(4) {
          margin-left: 0.044944rem;
        }
        &:nth-child(5) {
          margin-left: 0.059925rem;
        }
        &:nth-child(6) {
          margin-left: 0.074906rem;
        }
        &:nth-child(7) {
          margin-left: 0.089888rem;
        }
      }
    }
    .deng_top {
      position: absolute;
      display: flex;
      top: -0.074906rem;
      left: 0.209738rem;
      justify-content: space-between;
      width: 90%;
      .deng_top_item {
        width: 0.404494rem;
        display: flex;
        justify-content: space-between;
        img {
          width: 0.2397rem;
          height: 0.2397rem;
        }
      }
    }
    .deng_right {
      position: absolute;
      right: -0.044944rem;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .deng_right_item {
        height: 0.299625rem;
        img {
          width: 0.2397rem;
          height: 0.2397rem;
        }
        &:nth-child(1) {
          margin-left: 0;
        }
        &:nth-child(2) {
          margin-left: -0.022472rem;
        }
        &:nth-child(3) {
          margin-left: -0.029963rem;
        }
        &:nth-child(4) {
          margin-left: -0.044944rem;
        }
        &:nth-child(5) {
          margin-left: -0.059925rem;
        }
        &:nth-child(6) {
          margin-left: -0.074906rem;
        }
        &:nth-child(7) {
          margin-left: -0.089888rem;
        }
      }
    }
    .pk_num {
      position: absolute;
      background: url('../../assets/Images/yydbnew/tiger_pk_num.png') 0 0 / 100% 100% no-repeat;
      width: 2.397004rem;
      height: 0.314607rem;
      top: 0.149813rem;
      left: 0.314607rem;
      text-align: center;
      align-items: center;
      .number {
        padding: 0.074906rem 0;
        font-size: 0.164794rem;
        color: #fffffd;
        text-shadow: 2px 2px 2px #e36565;
      }
    }
    .scroll_num {
      position: absolute;
      width: 2.247191rem;
      height: 1.28839rem;
      overflow: hidden;
      top: 0.599251rem;
      left: 0.389513rem;
      display: flex;
      justify-content: space-between;
      .animation-ease {
        transition-property: transform;
        transition-duration: 3s;
        transition-timing-function: ease;
      }
      .groups {
        float: left;
        height: 1.348315rem;
        text-align: center;
        width: 0.70412rem;
        .group-item {
          width: 100%;
          .prize-item {
            width: 0.719101rem;
            background: url('../../assets/Images/yydbnew/tiger_middle@3x.png') 0 0 / 100% auto no-repeat;
            height: 1.28839rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            img {
              width: 0.58427rem;
              // height: 1.123596rem;
            }
          }
        }
      }
    }
    .kown_btn {
      position: absolute;
      background: #c8c8c8;
      color: #1f2b5a;
      font-size: 0.209738rem;
      height: 0.599251rem;
      width: 1.917603rem;
      align-items: center;
      display: flex;
      justify-content: center;
      left: 0.554307rem;
      bottom: -0.344569rem;
    }
  }
}
</style>