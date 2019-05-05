<template>
  <transition name="dialog">
    <div class="dialog" @click="close">
      <div class="modal" @click.stop>
        <div class="headTitle">
          <img src="~assets/Images/YYdb/@3x/yydb_luzi-title.png" alt>
        </div>
        <div class="listTitle">
          <h2>期数</h2>
          <h2>区块高度</h2>
          <h2>Hash结果</h2>
          <h2>开奖号码</h2>
        </div>
        <div class="myBetsAll">
          <ScrollH :data="listData" pullup @scrollToEnd="getLuZhi">
            <ul class="all-List">
              <li v-for="item in listData" :key="item.gameId" class="all-List-li">
                <!-- 期数 -->
                <div class="data-No">
                  <p v-if="item.period != 0">{{item.period}}</p>
                  <p v-else>流拍</p>
                </div>
                <!-- 区块高度 -->
                <div class="data-block">
                  <p v-if="item.blockId != 0">{{item.blockId}}</p>
                  <p v-else>流拍</p>
                </div>
                <!-- Hash结果 -->
                <div class="data-hash">
                  <p class="result-left" v-if="item.hash">{{item.hash.substr(0,2)}}......</p>
                  <p
                    class="result-right"
                    v-if="item.hash"
                  >{{item.hash.substr(item.hash.length - 18,18)}}</p>
                  <p v-else>无</p>
                </div>

                <!-- 开奖号码 -->
                <div class="data-Result">
                  <p v-if="item.result>=0">{{item.result}}</p>
                  <!-- <p></p> -->
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
  data() {
    return {
      listData: [],
      pageSize: 10,
      canLoadData: true, //是否能加载数据
      gameId: "",
      luziPage: 1,
      luziSize: 20
    };
  },
  mounted() {
    this.getLuZhi();
  },
  components: {
    ScrollH
  },
  methods: {
    close() {
      this.$emit("close");
    },
    //获取路子数据
    getLuZhi() {
      console.log("开始调用路子数据");
      let _this = this;
      _this
        .$ajax(
          {
            url: "hds/hashDuobao/findWay",
            data: {
              params: {
                page: _this.luziPage,
                pageSize: _this.luziSize
              }
            }
          },
          true
        )
        .then(res => {
          console.log("路子数据", res.data.list);
          if (_this.luziPage === 1) {
            _this.listData = [];
          }
          if (res.data.list.length === 0 && _this.luziPage === 1) {
            _this.listData = [];
            _this.$toast("暂无数据");
          } else if (res.data.list.length > 0) {
            _this.listData = _this.listData.concat(res.data.list);
            _this.luziPage = _this.luziPage + 1;
          } else {
            _this.$toast("已加载全部数据");
          }
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
    width: 8.58427rem;
    height: 3.970037rem;
    background-color: #242743;
    border-radius: 0.059925rem;
    overflow: hidden;
    .headTitle {
      text-align: center;
      height: 0.599251rem;
      background: url('../../../assets/Images/YYdb/@3x/yydb_luzi-title_bg.png') 0 0 / 100% 100% no-repeat;
      text-align: center;
      img {
        height: 0.419476rem;
        margin-top: 0.089888rem;
      }
    }
    .listTitle {
      width: 100%;
      height: 0.569288rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 0.014981rem #313665 solid;
      h2 {
        color: #c0d9fb;
        font-size: 0.179775rem;
        line-height: 0.569288rem;
        font-weight: 400;
        text-align: center;
        border-right: 0.014981rem #313665 solid;
        &:last-child {
          border-right: none;
        }
        &:nth-child(1) {
          flex: 15;
        }
        &:nth-child(2) {
          flex: 20;
        }
        &:nth-child(3) {
          flex: 40;
          text-align: left;
          padding-left: 0.2397rem;
        }
        &:nth-child(4) {
          flex: 25;
        }
      }
    }
    .myBetsAll {
      height: 2.846442rem;
      .all-List {
        margin-top: -0.014981rem;
        border-top: 0.014981rem #313665 solid;
      }
      .all-List-li {
        color: #ffffff;
        font-size: 0.179775rem;
        border-bottom: 0.014981rem #313665 solid;
        display: flex;
        justify-content: space-between;
        min-height: 0.524345rem;
        .data-No, .data-block, .data-Result, .data-hash {
          border-right: 0.014981rem #313665 solid;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 0.209738rem;
        }
        .data-No {
          flex: 15;
        }
        .data-block {
          flex: 20;
        }
        .data-hash {
          flex: 40;
          justify-content: flex-start;
          padding-left: 0.2397rem;
          .result-left {
            color: #c0d9fb;
          }
        }
        .data-Result {
          flex: 25;
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            text-align: center;
            width: 0.449438rem;
            height: 0.224719rem;
            font-size: 0.209738rem;
            color: #111619;
            background: #dbc279;
            border-radius: 0.029963rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .data-loction {
          li {
            border-bottom: 0.014981rem #313665 solid;
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
        .data-Result {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 0.209738rem;
        }
      }
    }
  }
}
</style>
