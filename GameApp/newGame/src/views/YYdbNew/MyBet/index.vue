<template>
  <transition name="dialog">
    <div class="wrapper" @click="closeMyself()">
      <div class="myPet" @click.stop>
        <div class="headDiv">
          <div class="topHead">
            <p class="top_bg_img">
              <img src="~assets/Images/YYdb/@3x/mypet_top@3x.png" alt>
            </p>
            <!-- 头部 -->
            <div class="head">
              <img src="~assets/Images/YYdb/@3x/title_current issue@3x.png" alt>
              <p>我的投注</p>
            </div>
          </div>

          <!-- 标题 -->
          <div class="title">
            <div class="pet_No">
              <!-- <img src="~assets/Images/YYdb/@3x/mypet_bglight@3x.png" alt> -->
              <span>期数</span>
            </div>
            <div class="pet_Num_Money">
              <div class="pet_Num">
                <!-- <img src="~assets/Images/YYdb/@3x/mypet_bglight@3x.png" alt> -->
                <span>下注号码</span>
              </div>
              <div class="pet_Money">
                <!-- <img src="~assets/Images/YYdb/@3x/mypet_bglight@3x.png" alt> -->
                <span>下注金额</span>
              </div>
            </div>
            <div class="pet_Result">
              <!-- <img src="~assets/Images/YYdb/@3x/mypet_bglight@3x.png" alt> -->
              <span>结果</span>
            </div>
          </div>
        </div>
        <div class="content">
          <ScrollH :data="listData" pullup @scrollToEnd="LoadMyBet">
            <!-- 内容 -->
            <div class="data">
              <ul class="all-List">
                <li
                  v-for="item in listData"
                  :key="item.No"
                  :class="item.result===-1?'all-List-li lightCell':'all-List-li'"
                >
                  <div class="data-pet-No">
                    <p v-if="item.result=== -1">
                      No.{{item.period}}
                      <br>本期
                    </p>
                    <p v-else>No.{{item.period}}</p>
                  </div>
                  <div class="data-pet-Number-Count">
                    <ul class="singleBet-List">
                      <li
                        class="singleBet-List-li"
                        v-for="betItem in item.detailList"
                        :key="betItem.detailId"
                      >
                        <div class="data-bet-num">
                          {{
                          displayNo(betItem.startNo , betItem.endNo)
                          }}
                        </div>
                        <div class="data-bet-count">
                          <p>{{betItem.bets | numFormat}} PK</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="data-pet-Result">
                    <p class="noResult" v-if="item.result === -1">未开奖</p>
                    <p class="noResult" v-else-if="item.result === -2">流拍</p>
                    <p class="haveResult" v-else-if="item.winBets < 0">
                      {{item.winBets}}
                      <br>
                      幸运号码：{{displayNo(item.result)}}
                    </p>
                    <p class="haveResult" v-else>
                      +{{item.winBets}}
                      <br>
                      幸运号码：{{displayNo(item.result)}}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </ScrollH>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollH from "components/ScrollH";
export default {
  data() {
    return {
      styls: "",
      listData: [],
      page: 1,
      pageSize: 20,
      canLoadData: true //是否能加载数据
    };
  },
  props: {
    displayNoMethod: {
      type: Function,
      default: null
    }
  },
  components: { ScrollH },
  mounted() {
    this.LoadMyBet();
  },
  methods: {
    displayNo(startNo, endNo) {
      var result = this.displayNoMethod(startNo, endNo);
      return result;
    },
    closeMyself() {
      this.$emit("close");
    },
    LoadMyBet() {
      if (!this.canLoadData) {
        return;
      }
      this.canLoadData = false;
      this.$ajax(
        {
          url: "/hds/hashDuobao/findMyDetailListAll",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              page: this.page,
              pageSize: this.pageSize
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            this.canLoadData = true;
            console.log(res.data);
            if (res.data.list.length === 0 && this.page === 1) {
              this.listData = [];
            } else if (res.data.list.length > 0) {
              this.listData = this.listData.concat(res.data.list);
              this.page = this.page + 1;
            } else {
              // this.$toast('已加载全部数据');
            }
          }
        })
        .catch(err => {
          this.canLoadData = true;
          console.log(err);
        });
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
  background-color: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  .myPet {
    width: 6.921348rem;
    height: 3.865169rem;
    background: #242743;
    border-radius: 0.089888rem;
    .headDiv {
      .topHead {
        position: relative;
        .top_bg_img {
          position: absolute;
          text-align: center;
          top: 0;
          left: 0;
          width: 6.921348rem;
          height: 0.659176rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .head {
          padding-top: 0.074906rem;
          width: 6.921348rem;
          height: 0.659176rem;
          text-align: center;
          position: relative;
          p {
            width: 2.382022rem;
            height: 0.479401rem;
            line-height: 0.479401rem;
            font-size: 0.299625rem;
            position: absolute;
            top: 0.089888rem;
            left: 2.269663rem;
            // background: linear-gradient(#ecf7fc, #bad4fb);
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
            color: #dae4f3;
          }
          img {
            width: 2.247191rem;
            height: 0.434457rem;
          }
        }
      }
      .title {
        display: flex;
        justify-content: center;
        .pet_No, .pet_Num, .pet_Money, .pet_Result {
          position: relative;
          height: 0.419476rem;
          text-align: center;
          border-bottom: 0.014981rem #313665 solid;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            color: #c1d9fb;
            font-size: 0.209738rem;
            position: absolute;
            line-height: 0.419476rem;
            left: 50%;
            top: 0;
            transform: translate(-50%, 0);
          }
        }
        .pet_No {
          flex: 0.2;
          border-right: 0.014981rem #313665 solid;
        }
        .pet_Num_Money {
          flex: 0.6;
          display: flex;
          justify-content: center;
          border-right: 0.014981rem #313665 solid;
          .pet_Num {
            flex: 0.5;
            border-right: 0.014981rem #313665 solid;
          }
          .pet_Money {
            flex: 0.5;
          }
        }
        .pet_Result {
          flex: 0.2;
        }
      }
    }
    .content {
      margin-top: -0.014981rem;
      width: 100%;
      height: 2.786517rem;
      .data {
        .all-List-li {
          &:first-child {
            border-top: 0.014981rem #313665 solid;
          }
          color: #7592cd;
          font-size: 0.179775rem;
          font-weight: bold;
          border-bottom: 0.014981rem #313665 solid;
          display: flex;
          justify-content: center;
          min-height: 0.524345rem;
          .data-pet-No {
            flex: 0.2;
            border-right: 0.014981rem #313665 solid;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 0.209738rem;
          }
          .data-pet-Number-Count {
            flex: 0.6;
            border-right: 0.014981rem #313665 solid;
            .singleBet-List-li {
              border-bottom: 0.014981rem #313665 solid;
              display: flex;
              justify-content: center;
              min-height: 0.524345rem;
              .data-bet-num {
                flex: 0.5;
                border-right: 0.014981rem #313665 solid;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
              .data-bet-count {
                flex: 0.5;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
              &:last-child {
                border: none;
              }
            }
          }
          .data-pet-Result {
            flex: 0.2;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 0.209738rem;
          }
        }
        .lightCell {
          color: #e9f5fc;
        }
      }
    }
  }
}
</style>
