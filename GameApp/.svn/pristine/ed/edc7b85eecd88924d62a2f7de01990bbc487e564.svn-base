<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <comModal ref="comm" :styls="styls" :titleName="`区块验证`">
    <div class="wrapper">
      <div class="modal-cont">
        <div class="searchInput">
          <input placeholder="请输入区块高度" v-model="blockId">
          <p @click="requestHashValue()">搜索</p>
        </div>
        <div class="result" v-if="hashData">
          <div class="resultTitle">
            <p>区块哈希值</p>
            <p class="toWeb" @click="toWeb">区块浏览器</p>
          </div>
          <div class="hash">
            <!-- 牛牛哈希值 -->
            <span v-if="hashData.gameType.code == 0">{{hashData.hash.substr(0,hashData.hash.length-20)}}<span class="red">{{hashData.hash.substr(hashData.hash.length-20,20)}}</span></span>
            <!-- 哈希竞猜 -->
            <span v-else-if="hashData.gameType.code == 1" v-for="item in hashRes(hashData.hash,hashData.result)" :key="item" :class="item == hashData.result&&'red'">{{item}}</span>
          </div>
        </div>
        <div class="niuniu" v-if="hashData">
          <div class="niu-title" v-if="hashData.gameType.code == 0">
            <p>
              庄：
              <span :class="getWinLoseState(1)">{{hashData.niuBanker}}</span>
            </p>
            <p>
              闲一：
              <span :class="getWinLoseState(2)">{{hashData.niuSky}}</span>
            </p>
            <p>
              闲二：
              <span :class="getWinLoseState(3)">{{hashData.niuLand}}</span>
            </p>
            <p>
              闲三：
              <span :class="getWinLoseState(4)">{{hashData.niuMysterious}}</span>
            </p>
          </div>
          <div class="niu-card" v-if="hashData.gameType.code == 0">
            <div>
              <img
                v-for="(item,index) in getCardNum(hashData.cardBanker)"
                :key="index"
                :src="getCardSrc(item)"
                alt
              >
            </div>
            <div>
              <img
                v-for="(item,index) in getCardNum(hashData.cardSky)"
                :key="index"
                :src="getCardSrc(item)"
                alt
              >
            </div>
            <div>
              <img
                v-for="(item,index) in getCardNum(hashData.cardLand)"
                :key="index"
                :src="getCardSrc(item)"
                alt
              >
            </div>
            <div>
              <img
                v-for="(item,index) in getCardNum(hashData.cardMysterious)"
                :key="index"
                :src="getCardSrc(item)"
                alt
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </comModal>
</template>

<script>
import ENV from "common/Api/ENV";
import comModal from "components/Modal/comModal";
export default {
  props: {
    checkHashValue: {
      type: [Number, String]
    }
  },

  data() {
    return {
      ENV: ENV.getENV(),
      styls: {},
      blockId: "",
      hash: "cedcef6846ede684fe612ce68f4e63d21e6f469e816cd",
      cardZhuang: "1659f",
      cardX1: "59fba",
      cardX2: "456a1",
      cardX3: "56afa",
      gameType:null,
      hashData:null,//查询哈希的结果
    };
  },
  components: { comModal },
  mounted() {},
  methods: {
    show(val,gameType) {
      console.log(val);
      this.hashData = null;
      this.gameType = gameType;
      this.blockId = val;
      this.requestHashValue();
      this.styls = { height: "4.494382rem", width: "8.2397rem" };
      this.$refs.comm.show();
    },
    Close() {
      this.$clickAudio();
      this.$refs.comm.close();
    },
    onSuccess() {
      this.$clickAudio();
      this.$toast("复制成功");
    },
    onError() {
      this.$clickAudio();
      this.$toast("浏览器不支持复制");
    },
    //分割数组
    getCardNum(string) {
      if (!string) return;
      var reg = /.{1}/g;
      var array = string.match(reg);
      array.push(string.substring(array.join("").length));
      array.pop();
      console.log(array);
      return array;
    },
    //获取图片地址
    getCardSrc(string) {
      return require(`../../../assets/Images/niuCard/niu_card_${string}.png`);
    },
    //请求哈希值
    requestHashValue() {
      if (!this.blockId) return;
      console.log("请求的blockID为", this.blockId,'游戏类型为',this.gameType);
      this.$ajax(
        {
          url: "/hns/niuniu/checkBlockValidation",
          data: {
            params: {
              gameType: this.gameType,
              blockId: this.blockId
            }
          }
        },
        true
      )
        .then(res => {
          console.log('查询哈希结果',res.data);
          if (res.code === 0) {
            this.hashData = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //根据不同游戏分割哈希值
    hashRes(hash, result) {
      let arr = hash.split(result),
        newArr = [],
        lastStr = parseInt(hash.charAt(hash.length - 1));
      newArr[0] = arr.slice(0, arr.length - 1).join(result);
      newArr[1] = result;
      newArr[2] = arr.slice(arr.length - 1, arr.length).join();
      // if (isNaN(lastStr)) {
      //   newArr[2] = arr.slice(arr.length - 1, arr.length).join();
      // }
      return newArr;
    },
    //获取输赢状态 location:1 庄 2，3，4 闲家
    getWinLoseState(location){
      if(location == 1) {
        if(this.hashData.niuOddLand > 0 && this.hashData.niuOddMysterious > 0 && this.hashData.niuOddSky > 0){
          return 'red';//庄赢
        }
      } else if(location == 2) {
        if(this.hashData.niuOddSky < 0){
          return 'red';
        }
      } else if(location == 3) {
        if(this.hashData.niuOddLand < 0){
          return 'red';
        }
      } else if(location == 4) {
        if(this.hashData.niuOddMysterious < 0){
          return 'red';
        }
      }
    },
    //前往区块浏览器
    toWeb(){
      window.open('https://eospark.com/block/'+this.blockId);
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.wrapper {
  padding: 0 0.179775rem;
  .modal-cont {
    padding: 0.2397rem;
    font-size: 0.209738rem;
    .searchInput {
      height: 0.479401rem;
      width: 100%;
      display: flex;
      input {
        width: 78%;
        height: 100%;
        background: #1f2945;
        color: #fff;
        border-radius: 0.059925rem;
        padding-left: 0.074906rem;
        &::placeholder {
          color: #8498b2;
        }
      }
      p {
        margin-left: 2%;
        width: 20%;
        height: 100%;
        background: url('../../../assets/Images/Hxjc/@3x/blockCheck_bg_search.png') 0 0 / 100% 100% no-repeat;
        text-align: center;
        line-height: 0.479401rem;
      }
    }
    .result {
      width: 100%;
      .resultTitle {
        height: 0.599251rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #bed4f3;
        .toWeb {
          color: #fff;
          text-decoration: underline;
        }
      }
      .hash {
        height: 0.479401rem;
        font-size: 0.179775rem;
        width: 100%;
        background: #1f2945;
        padding-left: 0.2397rem;
        line-height: 0.479401rem;
        color: #bed4f3;
        border-radius: 0.059925rem;
      }
      .red {
        color: #ff1d1d;
      }
    }
    .niuniu {
      width: 100%;
      .niu-title {
        height: 0.569288rem;
        display: flex;
        p {
          flex: 0.25;
          text-align: left;
          line-height: 0.569288rem;
        }
        span {
          color: #bed4f3;
        }
        .red {
          color: #ff1d1d;
        }
      }
      .niu-card {
        display: flex;
        height: 0.973783rem;
        width: 100%;
        div {
          flex: 0.25;
          position: relative;
          for i in 0 1 2 3 4 {
            img:nth-child({i + 1}) {
              width: 0.606742rem;
              height: 0.861423rem;
              position: absolute;
              left: i * 13 + '%';
            }
          }
        }
      }
    }
  }
}
</style>
