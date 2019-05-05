<template>
  <div class="modal" @click.stop>
    <div class="listTitle">
      <h2>玩法/房间</h2>
      <h2>期数/状态</h2>
      <h2>开奖结果</h2>
      <h2>投注位置</h2>
      <h2>投注金额</h2>
      <h2>总投注</h2>
      <h2>结算金额</h2>
      <h2>总金额</h2>
    </div>
    <div class="myBetsAll">
      <ScrollH :data="listData" pullup @scrollToEnd="LoadMyBet">
        <ul class="all-List">
          <li
            v-for="item in listData"
            :key="item.gameId"
            :class="item.result===-1?'all-List-li lightCell':'all-List-li'"
          >
            <!-- 游戏名称 -->
            <div class="data-pet-No data-game-Name">
              <p>{{item.roomName}}</p>
            </div>
            <!-- 游戏期数 -->
            <div class="data-pet-No">
              <!-- <p v-if="item.result=== -1 && item.blockId">
                    {{item.blockId}}
                    <br>本期
              </p>-->
              <p v-if="item.result=== -1">本期</p>
              <p v-else>
                {{item.blockId}}
                <br>已结算
              </p>
            </div>
            <!-- 开奖结果 -->
            <div class="data-pet-Result">
              <p class="noResult" v-if="item.result === -1">未开奖</p>
              <p class="noResult" v-else-if="item.result === -2">流拍</p>
              <p class="haveResult" v-else>
                {{item.result}}
                <span v-if="item.gameType != 3">号</span>
              </p>
            </div>
            <!-- 投注位置 -->
            <div class="data-pet-loction">
              <ul>
                <li v-for="(betItem,index) in item.detailList" :key="index">
                  <p v-if="item.gameType == 3">{{GetDBLocation(betItem)}}</p>
                  <p
                    v-else
                  >{{betItem.startNo == betItem.endNo?betItem.startNo:betItem.startNo+'-'+betItem.endNo}}号</p>
                </li>
              </ul>
            </div>
            <!-- 投注金额 -->
            <div class="data-pet-loction data-pet-money">
              <ul>
                <li v-for="(betItem,index) in item.detailList" :key="index">
                  <p>{{betItem.bets}}PK</p>
                </li>
              </ul>
            </div>

            <!-- 总投注 -->
            <div class="data-pet-No data-pet-AllPay">
              <p>{{item.bets}}PK</p>
            </div>
            <!-- 结算金额 -->
            <div class="data-pet-loction data-pet-JieSuan-money">
              <ul>
                <li v-for="(betItem,index) in item.detailList" :key="index">
                  <p v-if="item.result == -2">已返还</p>
                  <p
                    :class="betItem.winBets>0?'green':betItem.winBets<0?'red':''"
                    v-else-if="item.result != -1"
                  >{{betItem.winBets}}PK</p>
                </li>
              </ul>
            </div>
            <!-- 总金额 -->
            <div class="data-pet-No data-pet-AllMoney">
              <p v-if="item.result == -2">已返还</p>
              <p
                :class="item.winBets>0?'green':item.winBets<0?'red':''"
                v-else-if="item.result != -1"
              >{{item.winBets}}PK</p>
            </div>
          </li>
        </ul>
      </ScrollH>
    </div>
  </div>
</template>

<script>
import ScrollH from "components/ScrollH";
export default {
  data() {
    return {
      listData: [],
      pageSize: 10,
      canLoadData: true, //是否能加载数据
      gameId: ""
    };
  },
  mounted() {
    this.LoadMyBet();
    window.LoadMyBet = this.LoadMyBet;
  },
  components: {
    ScrollH
  },
  methods: {
    LoadMyBet() {
      console.log("111111111111111111111111111111111");
      if (!this.canLoadData) {
        return;
      }
      this.canLoadData = false;
      this.$ajax(
        {
          url: "/hns/niuniu/findMyDetailListAll",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              pageSize: this.pageSize,
              gameId: this.gameId
            }
          }
        },
        true
      )
        .then(res => {
          console.log(res.data);
          if (res.code === 0) {
            console.log("我的投注数据：", JSON.stringify(res.data));
            this.canLoadData = true;
            if (res.data.length === 0 && this.gameId == "") {
              this.listData = [];
            } else if (res.data.length > 0) {
              this.listData = this.listData.concat(res.data);
              this.gameId = this.listData[this.listData.length - 1].gameId;
            } else {
              this.$toast("已加载全部数据");
            }
          }
        })
        .catch(err => {
          this.canLoadData = true;
          console.log(err);
        });
    },
    GetDBLocation(betItem) {
      if (betItem.endNo - betItem.startNo == 0) {
        return this.AddZero(betItem.startNo);
      } else if (betItem.endNo - betItem.startNo == 1) {
        return (
          this.AddZero(betItem.startNo) + "," + this.AddZero(betItem.endNo)
        );
      } else {
        return (
          this.AddZero(betItem.startNo) + "~" + this.AddZero(betItem.endNo)
        );
      }
    },
    //数字前面补0变为3位
    AddZero(num) {
      if (num > 99) {
        return num;
      } else if (num > 9) {
        return "0" + num;
      } else {
        return "00" + num;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.modal {
  width: 100%;
  height: 100%;
  background-color: #121626;
  border-radius: 0.059925rem;
  overflow: hidden;
  .listTitle {
    width: 100%;
    height: 0.569288rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.014981rem #232D46 solid;
    h2 {
      color: #608d9e;
      font-size: 0.179775rem;
      line-height: 0.569288rem;
      font-weight: 400;
      text-align: center;
      border-right: 0.014981rem #232D46 solid;
      flex: 0.125;
      &:last-child {
        border-right: none;
      }
    }
  }
  .myBetsAll {
    height: calc(100% - 0.569288rem);
    .all-List {
      margin-top: -0.014981rem;
      border-top: 0.014981rem #232D46 solid;
    }
    .all-List-li {
      color: #608d9e;
      font-size: 0.179775rem;
      border-bottom: 0.014981rem #232D46 solid;
      display: flex;
      justify-content: space-between;
      min-height: 0.524345rem;
      .data-game-Name, .data-pet-No, .data-pet-Result, .data-pet-loction, .data-pet-money, .data-pet-AllPay, .data-pet-JieSuan-money, .data-pet-AllMoney {
        flex: 0.125;
        border-right: 0.014981rem #232D46 solid;
      }
      .data-pet-No {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 0.209738rem;
      }
      .data-pet-loction {
        li {
          border-bottom: 0.014981rem #232D46 solid;
          min-height: 0.524345rem;
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            text-align: center;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .data-pet-Result {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 0.209738rem;
      }
      .data-pet-AllMoney {
        border-right: none;
      }
      .data-pet-JieSuan-money, .data-pet-AllMoney {
        .green {
          color: #00d697;
        }
        .red {
          color: #fd0000;
        }
      }
    }
    .lightCell {
      color: #e9f5fc;
    }
  }
}
</style>
