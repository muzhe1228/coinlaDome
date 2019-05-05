<template>
  <div class="group">
    <ul class="single" @click="showHide">
      <li>{{item.createDate | dateFormat("yyyyMMdd")}}</li>
      <li>{{item.gameType.msg}}</li>
      <li>{{item.gameResult}}</li>
      <li>{{item.bets}}PK</li>
      <li
        :class="getPkColor(Number(item.settlementBets))"
        @click="toNiuRoom(item)"
      >{{getResultStr(item)}}</li>
    </ul>
    <transition name="slider">
      <ul v-if="item.gameType.code == 1&&show" class="single-cai-Detail">
        <span class="child_item_cai_result">结果</span>
        <span
          v-for="(hashItem,index) in hashRes(item.gameResultInfo.hash,30,item.gameResultInfo.result)"
          class="hashValue"
          :key="index"
          :class="hashItem == item.gameResultInfo.result&&'hxjc_result'"
        >{{hashItem}}</span>
        
        <span class="child_item_cai_close" @click="togg(false)">点击合起</span>
      </ul>

      <ul v-else-if="item.gameType.code == 3&&show" class="single-db-Detail">
        <li>
          <p>购买号码</p>
          <p>开奖结果</p>
        </li>

        <li>
          <p class="buy_number">{{getBuyNo(item.gameResultInfo)}}</p>
          <p class="result_no">{{item.gameResultInfo.result}}</p>
        </li>

        <li class="db_hash">
          <p class="period">
            期数：
            <span>{{item.period}}</span>
          </p>
          <p
            v-if="item.gameResultInfo.blockId != 0"
            @click=" copyClick(item.gameResultInfo.hash)"
          >区块高度：{{getHash(item.gameResultInfo.hash)}}</p>
          <!-- 流拍不显示区块高度 -->
          <p v-else>&nbsp;</p>
        </li>

        <li @click="togg(false)">点击合起</li>
      </ul>

      <ul v-else-if="item.gameType.code == 0&&show" class="single-niu-Detail">
        <li>
          <p>Hash</p>
          <p>结果</p>
        </li>
        <li>
          <p>...</p>
          <p></p>
        </li>
        <li>
          <p class="color-zhuang">{{item.gameResultInfo.cardBanker}}</p>
          <p>{{item.gameResultInfo.niuBanker}}</p>
        </li>
        <li>
          <p class="color-tian">{{item.gameResultInfo.cardSky}}</p>
          <p>{{item.gameResultInfo.niuSky}}</p>
        </li>
        <li>
          <p class="color-di">{{item.gameResultInfo.cardLand}}</p>
          <p>{{item.gameResultInfo.niuLand}}</p>
        </li>
        <li>
          <p class="color-xuan">{{item.gameResultInfo.cardMysterious}}</p>
          <p>
            <img src="~assets/Images/hg@3x.png" alt>
            {{item.gameResultInfo.niuMysterious}}
          </p>
        </li>
        <li @click="togg(false)">点击合起</li>
      </ul>
    </transition>
  </div>
</template>

<script>
import copy from "copy-to-clipboard";
export default {
  props: ["item"],
  data() {
    return {
      show: false
    };
  },
  components: {},
  methods: {
    togg(bol) {
      this.$clickAudio();
      this.show = bol;
    },
    showHide() {
      if (this.item.gameResult == "未开奖") {
        return;
      }
      this.$clickAudio();
      this.show = !this.show;
    },
    copyClick(str) {
      copy(str);
      this.$toast("复制成功");
    },

    getResultStr(item) {
      return item.gameStatus.code === 1 && item.gameType.code === 0
        ? "去查看"
        : item.settlementBets + "PK";
    },
    getHash(hashStr) {
      if (hashStr) {
        return "......" + hashStr.substr(hashStr.length - 16, hashStr.length);
      }
    },

    toNiuRoom(item) {
      if (item.gameStatus.code === 1) {
        if (item.gameType.code === 0) {
          this.$router.push("/bull_fight/" + item.roomId);
        }
      }
    },
    getBuyNo(resultInfo) {
      if (resultInfo.startNo === resultInfo.endNo) {
        return resultInfo.startNo;
      } else if (resultInfo.endNo - resultInfo.startNo > 1) {
        return resultInfo.startNo + "~" + resultInfo.endNo;
      } else {
        return resultInfo.startNo + "，" + resultInfo.endNo;
      }
    },
    getPkColor(pkNum) {
      if (pkNum < 0) {
        return "color-red";
      } else if (pkNum > 0) {
        return "color-green";
      } else {
        return "#fff";
      }
    },
    hashRes(hash, len, result) {
      let hash2 = "..." + hash.substring(hash.length - len),
        arr = hash2.split(result),
        newArr = [],
        lastStr = parseInt(hash2.charAt(hash2.length - 1));
      newArr[0] = arr.slice(0, arr.length - 1).join(result);
      newArr[1] = result;
      if (isNaN(lastStr)) {
        newArr[2] = arr.slice(arr.length - 1, arr.length).join();
      }
      // console.log("*******", newArr);
      return newArr;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.group {
  min-height: 0.479401rem;
  .slider-leave-active {
    // 动画离开过程：0.5s
    transition: all 0.4s ease;
  }
  .slider-enter-active {
    // 动画离开过程：0.5s
    transition: all 0.2s ease;
  }
  .slider-enter, .slider-leave-active {
    transform: scaleY(0);
    opacity: 0;
  }
  .single {
    display: flex;
    height: 0.479401rem;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    color: #eee;
    li {
      font-size: 0.179775rem;
      &:nth-child(1) {
        width: 15%;
      }
      &:nth-child(2) {
        width: 15%;
      }
      &:nth-child(3) {
        width: 35%;
      }
      &:nth-child(4) {
        width: 15%;
      }
      &:nth-child(5) {
        width: 20%;
      }
      &:nth-child(5) {
        text-align: right;
      }
    }
  }
  .single-niu-Detail {
    position: relative;
    height: 0.8rem;
    background-color: #2e3565;
    display: flex;
    align-items: center;
    padding: 0 0.299625rem 0 0.209738rem;
    color: #acb3e2;
    li {
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 12%;
      }
      &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) {
        width: 12%;
      }
      &:last-child {
        width: 19%;
        text-align: right;
        text-decoration: underline;
        font-size: 0.16rem;
      }
      p {
        &:last-child {
          margin-top: 0.089888rem;
          img {
            width: 0.149813rem;
            height: 0.149813rem;
            vertical-align: middle;
            margin-right: 0.059925rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .single-db-Detail {
    height: 0.8rem;
    background-color: #2e3565;
    display: flex;
    align-items: center;
    padding: 0 0.224719rem 0 0.209738rem;
    color: #acb3e2;
    position: relative;
    li {
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 10%;
        .result_no {
          color: #e3c877;
        }
      }
      &:nth-child(3) {
        width: 60%;
        .period {
          span {
            color: #e3c877;
          }
        }
      }
      &:last-child {
        width: 10%;
        text-align: right;
        text-decoration: underline;
        font-size: 0.16rem;
      }
      p {
        &:last-child {
          margin-top: 0.089888rem;
        }
      }
    }
  }
  .single-cai-Detail {
    display: flex;
    align-items: center;
    font-size: 0.179775rem;
    height: 0.453333rem;
    color: #acb3e2;
    text-align: left;
    background: #2e3565;
    padding: 0 0.299625rem 0 0.209738rem;
    position: relative;
    .child_item_cai_result {
      width: 10%;
    }
    .child_item_cai_content {
      width: 80%;
      overflow: hidden;
    }
    .child_item_cai_close {
      position: absolute;
      right: 0.224719rem;
      top: 0.134831rem;
      width: 10%;
      text-decoration: underline;
      text-align: right;
    }
    .hashValue {
      color: #fff;
      padding: 0 0.029963rem;
    }
    .hxjc_result {
      margin-top: -0.059925rem;
      display: inline-block;
      width: 0.269663rem;
      height: 0.269663rem;
      font-size: 0.2397rem;
      color: #2e3565;
      background: #e2c36f;
      text-align: center;
      line-height: 0.269663rem;
      border-radius: 0.134831rem;
    }
  }
}
</style>
