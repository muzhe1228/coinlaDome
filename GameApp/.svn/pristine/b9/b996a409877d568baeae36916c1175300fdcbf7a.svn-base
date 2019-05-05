<template>
  <div class="wrapper">
    <LeftNav/>
    <div class="wrap">
      <ul class="wrap_title">
        <li>时间</li>
        <li class="select">
          <Select :selectList="selectList" :Change="ChangeSelect"/>
        </li>
        <li>游戏结果</li>
        <li>下注金额</li>
        <li>结算金额</li>
      </ul>
      <div class="wrap_all">
        <ScrollH
          :data="listData"
          pullup
          @scrollToEnd="getGameRecordList(nowGameType)"
          :scrollToEndFlag="false"
          v-if="listData.length"
        >
          <Single v-for="item in listData" :key="item.detailId" :item="item" class="single"></Single>
        </ScrollH>
        <p v-else class="notData">{{noDataTip}}</p>
      </div>
      <!-- <ul class="wrap_footer">
        <li>合计</li>
        <li>24.78ETH</li>
      </ul>-->
    </div>
  </div>
</template>

<script>
import LeftNav from "components/LeftNav";
import ScrollH from "components/ScrollH";
import Single from "./recordSingle";
import Select from "components/Select";
export default {
  data() {
    return {
      noDataTip:'加载中',
      page: 1,
      size: 20,
      canLoadData: true, //是否能加载数据
      listData: [],
      selectList: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "牛牛",
          value: 0
        },
        {
          label: "猜尾数",
          value: 1
        },
        {
          label: "夺币",
          value: 3
        }
      ],
      nowGameType: ""
    };
  },
  mounted() {
    this.getGameRecordList(this.nowGameType);
  },
  components: { LeftNav, ScrollH, Single, Select },
  methods: {
    togg(index) {
      let dom = "D" + index;
    },
    ChangeSelect(item) {
      console.log(item.value);
      this.page = 1;
      this.nowGameType = item.value;
      this.getGameRecordList(item.value);
    },
    getGameRecordList(gameType) {
      if (!this.canLoadData) {
        return;
      }
      console.log(gameType);
      this.canLoadData = false;
      this.$ajax(
        {
          url: "/hns/niuniu/selectGameRecordList",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              gameType: gameType,
              page: this.page,
              size: this.size
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log(res.data);
            this.canLoadData = true;

            if (this.page === 1) {
              this.listData = [];
            }
            if (res.data.size === 0 && this.page === 1) {
              this.listData = [];
              this.$toast("暂无数据");
              this.noDataTip = '暂无数据';
            } else if (res.data.size > 0) {
              res.data.list.forEach(item => {
                if (item.gameResultInfo) {
                  item.gameResultInfo = JSON.parse(item.gameResultInfo);
                }
              });
              this.page = this.page + 1;
              this.listData = this.listData.concat(res.data.list);
            } else {
              this.$toast("已加载全部数据");
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
@import '~assets/stylus/variable.styl';
.wrapper {
  height: calc(100% - 0.599251rem);
  width: 100%;
  display: flex;
  background-color: #363e76;
  .wrap {
    flex: 1;
    padding-bottom: 0.029963rem;
    &_title {
      display: flex;
      height: 0.479401rem;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 0.299625rem 0 0.209738rem;
      li {
        font-size: 0.179775rem;
        &:nth-child(1) {
          width: 15%;
        }
        &:nth-child(2) {
          width: 12%;
          margin-right: 3%;
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
        &.select {
          height: 0.479401rem;
        }
      }
    }
    &_title {
      color: #acb3e2;
      background-color: #303769;
    }
    &_all {
      height: calc(100% - 0.524345rem);
      .notData {
        text-align: center;
        color: #acb3e2;
        font-size: 0.194757rem;
        margin-top: 0.179775rem;
      }
      .single {
        height: 0.479401rem;
        color: #eee;
        border-bottom: 1px solid #282d57;
        margin: 0 0.299625rem 0 0.209738rem;
      }
    }
  }
}
</style>