<template>
  <div class="Wrapp">
    <div class="wrapper">
      <div class="header">
        <div class="back" @click="back()">
          <img class="back_img" src="~assets/Images/invitedown/icon_back@3x.png" alt>
          <p>返回</p>
        </div>
        <p class="title">{{title}}</p>
      </div>

      <div class="content">
        <div class="content_l">
          <!-- 左侧列表 -->
          <ul class="subWrap_l">
            <li class="li" v-for="item in subList" :key="item.id" @click.stop="selectIcon(item)">
              <div class="hight_light_back" v-if="checkIcon === item.id">
                <p>{{item.value}}</p>
              </div>
              <div v-else class="default_back">
                <p>{{item.value}}</p>
              </div>
              <!-- <img class="line" src="~assets/Images/invitedown/icon_line.png"> -->
            </li>
          </ul>
        </div>
        <div class="content_r">
          <div class="wapper_right" v-if="timeList.length>0">
            <!-- 赢钱榜 -->
            <div v-if="checkIcon === 0" class="winpk_rank">
              <div class="winrank_top">
                <p class="rank_title">
                  <img src="../../assets/Images/rank/rank_img.png">排行
                </p>
                <p class="rank_username">
                  <img src="../../assets/Images/rank/rank_head.png">用户名
                </p>
                <p class="rank_pk">
                  <img src="../../assets/Images/rank/rank_pkimg.png">赚取PK数量
                </p>
                <p class="rank_eth">
                  <img
                    src="../../assets/Images/rank/rank_pkimg.png"
                    v-if="!IsToday(timeList[timeSelect])"
                  >
                  <span v-if="!IsToday(timeList[timeSelect])">奖励</span>
                </p>
              </div>
              <div class="winrank_content">
                <ul class="winrank_list">
                  <ScrollH :data="data" v-if="data.length>0">
                    <li v-for="(item,index) in data" :key="index">
                      <!-- 排名 -->
                      <p class="top_three" v-if="index == 0">
                        <img src="../../assets/Images/rank/rank_list_1.png">
                      </p>
                      <p class="top_three" v-else-if="index == 1">
                        <img src="../../assets/Images/rank/rank_list_2.png">
                      </p>
                      <p class="top_three" v-else-if="index == 2">
                        <img src="../../assets/Images/rank/rank_list_3.png">
                      </p>
                      <p class="top_three" v-else>{{index+1}}</p>
                      <!-- 用户信息 -->
                      <div class="userValue">
                        <img :src="ImageURL+item.head">
                        <p>{{item.nick}}</p>
                      </div>
                      <!-- 赚取PK数量 -->
                      <div class="pkCount">
                        <img src="../../assets/Images/rank/rank_list_pk.png">
                        <p>{{item.totalNumber | numFormat}}</p>
                      </div>
                      <!-- 奖励 -->
                      <p class="eth_val">{{IsToday(timeList[timeSelect])?'':item.award}}</p>
                    </li>
                  </ScrollH>
                </ul>

                <ul class="time_list" v-if="timeList.length>0">
                  <li v-for="(item,index) in timeList" :key="index" @click="selectTime(item,index)">
                    <p class="time_select" v-if="timeSelect === index">{{ShowTime(item)}}</p>
                    <p v-else class="time_default">{{ShowTime(item)}}</p>
                    <img class="r_bottom_line" src="../../assets/Images/rank/rank_right_line.png">
                  </li>
                </ul>
              </div>
            </div>
            <!-- 游戏说明 -->
            <div v-else class="instru">
              <ScrollH>
                <h2>BBPK公测活动正式开启！快上车，要分ETH啦！</h2>
                <p>
                  <span class="darkColor">比赛时间：</span> 2019.3.6-2019.3.12，共7天
                </p>
                <p>
                  <span class="darkColor">比赛规则：</span>
                </p>
                <p>活动期间，玩家通过参与币猜活动，累计赢钱数，进入排行榜前20名，即有机会赢得最高10ETH奖励！</p>
                <p class="rule">1. 玩家每日均可获得100w PK筹码去参与游戏；</p>
                <p class="rule">2. 赢钱榜只累计每局结算金额的正值金额；</p>
                <p
                  class="rule"
                >3. 当天累计的赢钱金额只限在当天00:00至23:50参与排行榜活动，23:50统计数据公布当日排行榜，每天24点系统将会自动清零，重新获得100w PK；</p>
                <p
                  class="rule"
                >4. 获奖后请主动在【游戏大厅】-【客服】联系工作人员登记钱包地址，活动结束后3个工作日内，工作人员统一发放奖励（若因玩家多次联系不上等情况，则视为自动放弃奖品）；</p>
                <p class="rule">5. 因违规操作或通过不正当手段参与活动者，BBPK团队有权在不事先通知的情况下取消其得奖资格；</p>
                <p class="rule">6. 如需帮助，请联系BBPK客服。</p>
                <p class="rule">7. 本活动最终解释权归BBPK团队所有。</p>
                <p>
                  <span class="darkColor">奖励发放：</span>
                </p>
                <p>按赢钱数量排序，取前20名奖励</p>
                <div class="instruTable">
                  <img src="../../assets/Images/rank/rank_table.png" alt>
                </div>
              </ScrollH>
            </div>
          </div>
        </div>
      </div>
      <div class="userRankInfo">
        <p class="self_rank_name">用户名 : {{UserRankInfo.nick}}</p>
        <p class="self_rank_no">
          <img src="~assets/Images/rank/rank_self_rank.png" alt>
          排名 : {{UserRankInfo.rangking}}
        </p>
        <p class="self_rank_pk">
          <img src="~assets/Images/rank/rank_self_rank.png" alt>
          {{UserRankInfo.totalNumber}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollH from "components/ScrollH";
import star0 from "Images/invitedown/icon_star0@3x.png";
import star1 from "Images/invitedown/icon_star1@3x.png";
import star2 from "Images/invitedown/icon_star2@3x.png";
import star3 from "Images/invitedown/icon_star3@3x.png";
import star4 from "Images/invitedown/icon_star4@3x.png";
import copy from "copy-to-clipboard";
import Inp from "components/LeftNav";
import { unitConvert, isIos, IsPCm, dateFormat } from "common/func";
import { mapState } from "vuex";
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2"; // 引入qrcode
import ENV from "common/Api/ENV";
export default {
  data() {
    return {
      title: "排行榜",
      subList: [{ value: "赢钱榜", id: 0 }, { value: "游戏说明", id: 1 }],
      checkIcon: 0,
      timeSelect: 0,
      data: [],
      timeList: [],
      ImageURL: ENV.getENV().ImageURL,
      UserRankInfo: {}
    };
  },
  components: {
    ScrollH,
    Inp
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.GetTimeList();
  },
  methods: {
    // 返回大厅
    back() {
      this.$clickAudio();
      this.$router.push("/index");
    },
    // 选择左侧导航
    selectIcon(item) {
      let type = item.id;
      this.title = item.value;
      this.checkIcon = type;
    },
    // 选择时间
    selectTime(item, index) {
      this.timeSelect = index;
      this.GetRankList(item);
      this.GetUserRankInfo(item);
    },
    // 获取排行榜时间列表
    GetTimeList() {
      this.$ajax(
        {
          url: "/uac/user/selectURL",
          data: {
            params: {
              urlType: 2
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log("时间列表", res.data);
            var TimeStrArray = res.data.split(","),
              list = []; //字符分割
            for (var i = 0; i < TimeStrArray.length; i++) {
              if (TimeStrArray[i] * 1000 <= new Date().getTime()) {
                list.push(TimeStrArray[i]);
              }
            }
            this.timeList = list;
            console.log("时间列表", this.timeList);
            if (this.timeList.length > 0) {
              this.GetRankList(this.timeList[0]);
              this.GetUserRankInfo(this.timeList[0]);
            }
          }
        })
        .catch(err => {
          console.log("错误结果：" + err);
        });
    },
    // 获取排行榜数据
    GetRankList(time) {
      console.log("传入参数", time);
      this.$ajax(
        {
          url: "/uas/userAssets/selectRankingList",
          data: {
            params: {
              dateTime: time
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log("排行榜", res.data);
            this.data = res.data.list;
          }
        })
        .catch(err => {
          console.log("错误结果：" + err);
        });
    },
    //获取用户排行信息
    GetUserRankInfo(time) {
      this.$ajax(
        {
          url: "/uas/userAssets/selectUserRanking",
          data: {
            params: {
              dateTime: time,
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log("用户排行信息", res.data);
            this.UserRankInfo = res.data;
          }
        })
        .catch(err => {
          console.log("错误结果：" + err);
        });
    },
    //获取右侧要显示的时间
    ShowTime(item) {
      if (this.IsToday(item)) {
        return "今天";
      } else {
        return dateFormat(item * 1000, "MM月dd日");
      }
    },
    //判断是否是今天
    IsToday(time) {
      var timeStr = dateFormat(time * 1000, "yyyy-MM-dd");
      var todayStr = dateFormat(new Date().getTime(), "yyyy-MM-dd");
      return timeStr == todayStr;
    }
  }
};
</script>

<style scoped lang="stylus">
.Wrapp {
  width: 100%;
  height: 100%;
  background: url('../../assets/Images/rank/rank_bg.png') 0 0 / 100% 100% no-repeat;
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      height: 0.674157rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      background: url('../../assets/Images/invitedown/bg_top@3x.png') 0 0 / 100% 100% no-repeat;
      .title {
        color: #fefeff;
        font-size: 0.2397rem;
      }
      .back {
        display: flex;
        background: url('../../assets/Images/invitedown/bg_back@3x.png') 0 0 / 100% 100% no-repeat;
        align-items: center;
        height: 0.674157rem;
        width: 1.797753rem;
        padding-left: 0.269663rem;
        color: #95b1d7;
        font-size: 0.179775rem;
        position: absolute;
        left: 0;
        top: 0;
        .back_img {
          width: 0.389513rem;
          height: 0.374532rem;
        }
        p {
          margin-left: 0.059925rem;
        }
      }
    }
    .content {
      display: flex;
      height: 100%;
      .content_l {
        width: 1.40824rem;
        height: 100%;
        background: url('../../assets/Images/rank/rank_l_bg.png') 0 0 / 100% 100% no-repeat;
        .subWrap_l {
          width: 1.40824rem;
          color: #acb3e2;
          font-size: 0.209738rem;
          padding-top: 0.299625rem;
          .li {
            width: 1.40824rem;
            height: 0.659176rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 0;
            .hight_light_back {
              z-index: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 0.659176rem;
              width: 1.348315rem;
              margin-left: 0.11236rem;
              background: url('../../assets/Images/rank/rank_l_select.png') 0 0 / 100% 100% no-repeat;
              p {
                padding-top: 0.044944rem;
                color: #1b130f;
              }
            }
            .default_back {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 0.659176rem;
              width: 100%;
              margin-left: 0.11236rem;
              p {
                padding-top: 0.044944rem;
                color: #b9d2ff;
              }
            }
            .line {
              width: 100%;
            }
          }
        }
      }
      .content_r {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.269663rem 0.269663rem 0.494382rem 0.269663rem;
        .wapper_right {
          width: 100%;
          height: 100%;
          background-color: #272c58;
          overflow: hidden;
          .winpk_rank {
            width: 100%;
            height: 100%;
            .winrank_top {
              background: url('../../assets/Images/rank/rank_top.jpg') 0 0 / 100% 100% no-repeat;
              display: flex;
              align-items: center;
              height: 0.2397rem;
              p {
                color: #fff;
                font-size: 0.149813rem;
                display: flex;
                align-items: center;
                img {
                  width: 0.179775rem;
                  margin-right: 0.074906rem;
                }
              }
              .rank_title {
                margin-left: 0.374532rem;
                flex: 15;
              }
              .rank_username {
                flex: 25;
              }
              .rank_pk {
                flex: 34;
              }
              .rank_eth {
                flex: 11;
                padding-right: 25%;
              }
            }
            .winrank_content {
              width: 100%;
              height: calc(100% - 0.2397rem);
              display: flex;
              .winrank_list {
                flex: 8.5;
                height: 100%;
                padding-right: 0.179775rem;
                li {
                  display: flex;
                  align-items: center;
                  color: #fff;
                  margin-top: 0.11985rem;
                  height: 0.659176rem;
                  background: url('../../assets/Images/rank/rank_list_bg.png') 0 0 / 100% 100% no-repeat;
                  font-size: 0.209738rem;
                  img {
                    width: 0.359551rem;
                    height: 0.359551rem;
                  }
                  .top_three {
                    flex: 10;
                    margin-left: 0.299625rem;
                    font-size: 0.2397rem;
                    width: 0.359551rem;
                    text-align: center;
                    padding-right: 5%;
                  }
                  .userValue {
                    flex: 30;
                    justify-content: flex-start;
                    display: flex;
                    align-items: center;
                    color: #171e3a;
                    img {
                      margin-right: 0.074906rem;
                      border-radius: 0.179775rem;
                    }
                  }
                  .pkCount {
                    flex: 37;
                    justify-content: flex-start;
                    display: flex;
                    align-items: center;
                  }
                  .eth_val {
                    flex: 23;
                    justify-content: flex-start;
                    display: flex;
                    align-items: center;
                    color: #ffde00;
                    font-size: 0.209738rem;
                  }
                }
              }
              .time_list {
                flex: 1.5;
                background: url('../../assets/Images/rank/rank_r_bg.png') 0 0 / 100% 100% no-repeat;
                font-size: 0.179775rem;
                li {
                  height: 0.479401rem;
                  z-index: 0;
                  position: relative;
                  p {
                    z-index: 1;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 108%;
                    position: absolute;
                    top: 0;
                    left: -8%;
                  }
                  .r_bottom_line {
                    width: 100%;
                    height: 0.029963rem;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                  }
                }
                .time_select {
                  color: #fff;
                  background: url('../../assets/Images/rank/rank_r_select.png') 0 0 / 100% 100% no-repeat;
                }
                .time_default {
                  color: #99b4df;
                }
              }
            }
          }
          .instru {
            width: 100%;
            height: 100%;
            font-size: 0.209738rem;
            color: #fff;
            padding: 0.2397rem 0.269663rem 0.269663rem 0.269663rem;
            h2 {
              text-align: center;
              color: #fae799;
              font-size: 0.2397rem;
              margin-bottom: 0.2397rem;
              margin-top: 0.029963rem;
            }
            p {
              line-height: 0.404494rem;
            }
            .darkColor {
              color: #d6e5fd;
            }
            .rule {
              padding-left: 2em;
              text-indent: -1em;
            }
            .instruTable {
              width: 4.029963rem;
              height: 2.344569rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
    .userRankInfo {
      z-index: 2;
      position: fixed;
      bottom: 0;
      left: 0;
      height: 0.299625rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #e2d5b3;
      font-size: 0.194757rem;
      img {
        width: 0.22472rem;
        margin-right: 0.074906rem;
      }
      .self_rank_name {
        margin-left: 1.677903rem;
      }
      .self_rank_no {
        margin-left: 0.838951rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .self_rank_pk {
        color: #f9de74;
        font-size: 0.224719rem;
        margin-left: 0.838951rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
  }
}
</style>
