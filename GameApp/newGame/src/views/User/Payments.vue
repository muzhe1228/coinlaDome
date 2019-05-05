<template>
  <div class="wrapper">
    <LeftNav/>
    <div class="wrap">
      <ul class="wrap_title">
        <!-- <li>时间</li> -->
        <li class="select">
          <Select :selectList="timeSelect" keyId="timeSelect" :Change="ChangeTimeSelect"/>
        </li>
        <li class="select">
          <Select :selectList="selectList" keyId="select1" :Change="ChangeSelect"/>
        </li>
        <li class="select">
          <Select :selectList="selectList1" keyId="select2" :Change="ChangeSelect1"/>
        </li>
        <li>详情</li>
        <li>数量</li>
        <li>状态</li>
      </ul>
      <div class="wrap_all" v-if="listData.length>0">
        <ScrollH :data="listData" pullup @scrollToEnd="LoadData">
          <ul class="single" v-for="(item,index) in listData" :key="index">
            <li>{{item.createDate | dateFormat("yyyyMMdd")}}</li>
            <li :class="item.iaeType.code?'color-red':'color-green'">{{item.iaeType.msg}}</li>
            <li>{{item.bizType.msg}}</li>
            <li>{{item.bizDesc}}</li>
            <li
              :class="item.currencyNumber == 0?'color-white':item.iaeType.code?'color-red':'color-green'"
            >{{item.currencyNumber == 0?'':item.iaeType.code?"":"+"}}{{item.currencyNumber}}</li>
            <li>{{item.bizStatus.msg}}</li>
          </ul>
        </ScrollH>
      </div>
      <p class="noDataTip" v-else>{{noDataTip}}</p>
      <ul class="wrap_footer" v-if="listData.length>0">
        <li>合计</li>
        <li>{{showAllBalance(PkNum)}}PK</li>
      </ul>
    </div>
  </div>
</template>

<script>
import LeftNav from "components/LeftNav";
import ScrollH from "components/ScrollH";
import Select from "components/Select";
import { mapState } from "vuex";
import { toFixeds,numFormat } from "common/func";
export default {
  data() {
    return {
      noDataTip: "加载中",
      listData: [],
      timeSelect: [
        {
          label: "全部",
          value: 0,
          startTime: "",
          dateType:0
        },
        {
          label: "今天",
          value: 1,
          startTime: Date.parse(new Date()) / 1000 - 86400 * 1,
          dateType:1
        },
        {
          label: "本周",
          value: 2,
          startTime: Date.parse(new Date()) / 1000 - 86400 * 7,
          dateType:2
        },
        {
          label: "一月",
          value: 3,
          startTime: Date.parse(new Date()) / 1000 - 86400 * 30,
          dateType:3
        },
        {
          label: "半年",
          value: 4,
          startTime: Date.parse(new Date()) / 1000 - 86400 * 180,
          dateType:4
        }
      ],
      selectList: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "收入",
          value: 1
        },
        {
          label: "支出",
          value: 2
        }
      ],
      selectList1: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "游戏",
          value: 1
        },
        // {
        //   label: "交易",
        //   value: 2
        // },
        {
          label: "充值",
          value: 2
        },
        {
          label: "提现",
          value: 3
        },
        {
          label: "任务",
          value: 4
        },
        {
          label: "返佣",
          value: 5
        },
        {
          label: "代理",
          value: 6
        },
        {
          label: "转账",
          value: 7
        },
        {
          label: "活动",
          value: 8
        }
      ],
      timeType: 0,
      iaeType: 0,
      bizType: 0,
      page: 1,
      size: 20,
      canLoadData: true, //是否能加载数据
      PkNum: 0
    };
  },
  computed: {},
  mounted() {
    this.LoadData();
    this.LoadAllBalance();
  },
  components: { LeftNav, ScrollH, Select },
  methods: {
    ChangeTimeSelect(item) {
      console.log(item.value, 0);
      this.page = 1;
      this.timeType = item.value;
      this.LoadData();
      this.LoadAllBalance();
    },
    ChangeSelect(item) {
      console.log(item.value, 0);
      this.page = 1;
      this.iaeType = item.value;
      this.LoadData();
      this.LoadAllBalance();
    },
    ChangeSelect1(item) {
      console.log(item.value, 1);
      this.page = 1;
      this.bizType = item.value;
      this.LoadData();
      this.LoadAllBalance();
    },
    //加载数据
    LoadData() {
      if (!this.canLoadData) {
        return;
      }
      console.log('传入时间type'+this.timeSelect[this.timeType].dateType)
      this.canLoadData = false;
      var iaeTypeArr = ["", "0", "1"];
      var bizTypeArr = ["", "0", "2", "3", "4", "5", "8", "9",'10'];
      console.log("选中的biztype", bizTypeArr[this.bizType]);
      this.$ajax(
        {
          url: "/uas/userAssets/selectIncomeExpensesList",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              iaeType: iaeTypeArr[this.iaeType], //收入 支出
              bizType: bizTypeArr[this.bizType], //游戏类型
              currencyType: "",
              page: this.page,
              size: this.size,
              endTime: this.timeType === 0 ? "" : Date.parse(new Date()) / 1000,
              startTime: this.timeSelect[this.timeType].startTime,
              dateType:this.timeSelect[this.timeType].dateType
            }
          }
        },
        true
      )
        .then(res => {
          this.canLoadData = true;
          if (res.code === 0) {
            console.log(res.data.list);
            if (this.page === 1) {
              this.listData = [];
            }
            if (res.data.list.length === 0 && this.page === 1) {
              this.listData = [];
              this.$toast("暂无数据");
              this.noDataTip = "暂无数据";
            } else if (res.data.list.length > 0) {
              this.listData = this.listData.concat(res.data.list);
              this.page = this.page + 1;
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
    //加载合计PK
    LoadAllBalance() {
      var iaeTypeArr = ["", "0", "1"];
      var bizTypeArr = ["", "0", "2", "3", "4", "5", "8", "9",'10'];
      this.$ajax(
        {
          url: "/uas/userAssets/selectListTotal",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              iaeType: iaeTypeArr[this.iaeType], //收入 支出
              bizType: bizTypeArr[this.bizType], //游戏类型
              currencyType: "",
              endTime: this.timeType === 0 ? "" : Date.parse(new Date()) / 1000,
              startTime: this.timeSelect[this.timeType].startTime
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            this.PkNum = res.data;
          }
        })
        .catch(err => {
          this.canLoadData = true;
          console.log(err);
        });
    },
    //展示合计PK
    showAllBalance(PkNum) {
      return toFixeds(PkNum, 0) | numFormat;
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
    &_title, .single {
      display: flex;
      min-height: 0.479401rem;
      line-height: 0.224719rem;
      // align-items: center;
      justify-content: space-between;
      padding: 0.11985rem 0 0.11985rem 0;
      margin: 0 0.299625rem 0 0.209738rem;
      border-bottom: 1px solid #282d57;
      li {
        font-size: 0.179775rem;
        &:nth-child(1) {
          width: 11%;
        }
        &:nth-child(2) {
          width: 11%;
        }
        &:nth-child(3) {
          width: 11%;
        }
        &:nth-child(4) {
          width: 35%;
        }
        &:nth-child(5) {
          width: 12%;
        }
        &:nth-child(6) {
          width: 10%;
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
      height: 0.479401rem;
      align-items: center;
      padding: 0.11985rem 0.299625rem 0.11985rem 0.209738rem;
      margin: 0;
      border-bottom: none;
    }
    &_all {
      color: #eee;
      height: calc(100% - 0.988764rem);
      // background-color: #363e76;
    }
    &_footer {
      display: flex;
      height: 0.479401rem;
      padding-bottom: 0.149813rem;
      align-items: center;
      justify-content: space-between;
      margin: 0 0.299625rem 0 0.209738rem;
      padding-top: 0.179775rem;
      border-top: 0.014981rem solid $bgMain;
      li {
        color: #fff;
        font-size: 0.209738rem;
        &:last-child {
          color: $colorMain;
          font-size: 0.269663rem;
        }
      }
    }
    .noDataTip {
      text-align: center;
      color: #acb3e2;
      font-size: 0.194757rem;
      margin-top: 0.179775rem;
    }
  }
}
</style>