<template>
  <transition name="dialog">
    <div class="dialog" @click="close">
      <div class="modal" @click.stop>
        <div class="headTitle">
          <img src="~assets/Images/Hxjc/@3x/game_myBetsTitle@3x.png" alt>
        </div>
        <div class="listTitle">
          <h2>玩法/房间</h2>
          <h2>区块/状态</h2>
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
                :class="!item.blockId?'all-List-li lightCell':'all-List-li'"
              >
                <!-- 游戏名称 -->
                <div class="data-pet-No data-game-Name">
                  <p v-if="item.gameType === 0">
                    {{getGameName(item.roomName,0)}}
                    <br>
                    {{getGameName(item.roomName,1)}}
                  </p>
                  <p v-else>{{item.roomName}}</p>
                </div>
                <!-- 游戏期数 -->
                <div class="data-pet-No" @click="showHashCheck(item.blockId,item.gameType)">
                  <div v-if="item.gameType === 0">
                    <p v-if="!item.blockId">
                      <span class="zhuang" v-if="item.userType == 1">庄</span>
                      <span class="titleSpan">未结算</span>
                    </p>
                    <p v-else>
                      {{item.blockId}}
                      <br>
                      <span class="zhuang" v-if="item.userType == 1">庄</span>
                      <span class="titleSpan">已结算</span>
                    </p>
                  </div>
                  <div v-else>
                    <p v-if="!item.blockId">本期</p>
                    <p v-else>
                      {{item.blockId}}
                      <br>已结算
                    </p>
                  </div>
                </div>
                <!-- 开奖结果 -->
                <div class="data-pet-Result">
                  <div v-if="item.gameType === 0">
                    <p class="noResult" v-if="!item.blockId">未开奖</p>
                    <p class="haveResult" v-else>
                      庄:{{item.niuBanker}}
                      <br>
                      {{item.niuSky}}/{{item.niuLand}}/{{item.niuMysterious}}
                    </p>
                  </div>
                  <div v-else>
                    <p class="noResult" v-if="!item.blockId">未开奖</p>
                    <p class="noResult" v-else-if="item.result === -2">流拍</p>
                    <p class="haveResult" v-else>
                      {{item.result}}
                      <span v-if="item.gameType != 3">号</span>
                    </p>
                  </div>
                </div>
                <!-- 投注位置 -->
                <div class="data-pet-loction">
                  <ul>
                    <li v-for="(betItem,index) in item.detailList" :key="index">
                      <p v-if="item.gameType == 3">{{GetDBLocation(betItem)}}</p>
                      <p v-else>{{getXZLoactionNum(item,betItem)}}</p>
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
                      <p v-if="item.result == -2 && item.blockId">已返还</p>
                      <p
                        :class="betItem.winBets>0?'green':betItem.winBets<0?'red':''"
                        v-else-if="item.result != -1 && item.blockId"
                      >{{betItem.winBets}}PK</p>
                    </li>
                  </ul>
                </div>
                <!-- 总金额 -->
                <div class="data-pet-No data-pet-AllMoney">
                  <p v-if="item.result == -2 && item.blockId">已返还</p>
                  <p
                    :class="item.winBets>0?'green':item.winBets<0?'red':''"
                    v-else-if="item.result != -1 && item.blockId"
                  >{{item.winBets}}PK</p>
                </div>
              </li>
            </ul>
          </ScrollH>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollH from "components/ScrollH";
export default {
  props: {
    // displayNo: {
    //   type: Function,
    //   default: null
    // }
    checkHash: {
      type: Function,
      default: null
    }
  },
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
  },
  components: {
    ScrollH
  },
  methods: {
    close() {
      this.$emit("close");
    },
    LoadMyBet() {
      if (!this.canLoadData) {
        return;
      }
      let _this = this;
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
            console.log("我的投注数据：", res);
            _this.canLoadData = true;
            if (!res.data && _this.gameId == "") {
              _this.listData = [];
            } else if (!res.data && _this.gameId != "") {
              _this.$toast("已加载全部数据");
            } else {
              _this.listData = _this.listData.concat(res.data);
              _this.gameId = _this.listData[_this.listData.length - 1].gameId;
            }
          }
        })
        .catch(err => {
          this.canLoadData = true;
          console.log(err);
        });
    },
    //获取夺宝下注位置
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
      //return this.displayNo(num);
      if (num > 99) {
        return num;
      } else if (num > 9) {
        return "0" + num;
      } else {
        return "00" + num;
      }
    },
    //获取下注位置号码
    getXZLoactionNum(item, betItem) {
      if (item.gameType == 1 && betItem.startNo > 9) {
        //开大小单双
        switch (betItem.startNo) {
          case 10:
            return "大";
            break;
          case 11:
            return "小";
            break;
          case 12:
            return "单";
            break;
          case 13:
            return "双";
            break;
          default:
            break;
        }
      }
      if (betItem.startNo == betItem.endNo) {
        return betItem.startNo + "号";
      } else {
        return betItem.startNo + "-" + betItem.endNo + "号";
      }
    },
    //获取游戏名字
    getGameName(gameName, index) {
      var arr = gameName.split("-");
      return arr[index];
    },
    //显示哈希查询弹窗
    showHashCheck(blockId, gameType) {
      if (gameType != 0 && gameType != 1) {
        return;
      }
      if (!blockId) {
        this.$toast("区块高度不存在");
        return;
      }
      this.checkHash(blockId, gameType);
      this.close();
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
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .modal {
    width: 8.2397rem;
    height: 4.494382rem;
    background-color: #111619;
    border-radius: 0.059925rem;
    overflow: hidden;
    .headTitle {
      text-align: center;
      height: 0.659176rem;
      background: url('../../../assets/Images/Hxjc/@3x/mybets_topBG@3x.png') 0 0 / 100% 100% no-repeat;
      text-align: center;
      img {
        height: 0.569288rem;
        margin-top: 0.044944rem;
      }
    }
    .listTitle {
      width: 100%;
      height: 0.569288rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 0.014981rem #1a2b31 solid;
      h2 {
        color: #608d9e;
        font-size: 0.134831rem;
        line-height: 0.569288rem;
        font-weight: 400;
        text-align: center;
        border-right: 0.014981rem #1a2b31 solid;
        flex: 0.125;
        &:last-child {
          border-right: none;
        }
        &:nth-child(3) {
          flex: 0.15;
        }
      }
    }
    .myBetsAll {
      height: 3.265918rem;
      .all-List {
        margin-top: -0.014981rem;
        border-top: 0.014981rem #1a2b31 solid;
      }
      .all-List-li {
        color: #608d9e;
        font-size: 0.134831rem;
        border-bottom: 0.014981rem #1a2b31 solid;
        display: flex;
        justify-content: space-between;
        min-height: 0.524345rem;
        .data-game-Name, .data-pet-No, .data-pet-Result, .data-pet-loction, .data-pet-money, .data-pet-AllPay, .data-pet-JieSuan-money, .data-pet-AllMoney {
          flex: 0.125;
          border-right: 0.014981rem #1a2b31 solid;
        }
        .data-pet-Result {
          flex: 0.15;
        }
        .data-pet-No {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 0.209738rem;
          .zhuang {
            display: inline-block;
            margin-right: 0.029963rem;
            width: 0.209738rem;
            height: 0.209738rem;
            color: #333333;
            background: #e3c877;
            border-radius: 0.029963rem;
          }
        }
        .data-pet-loction {
          li {
            border-bottom: 0.014981rem #1a2b31 solid;
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
}
</style>
