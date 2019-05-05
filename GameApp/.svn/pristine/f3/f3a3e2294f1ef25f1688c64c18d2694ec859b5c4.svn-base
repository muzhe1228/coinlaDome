<template>
  <div class="wrapper">
    <div class="Wrap" v-if="isMain">
      <div class="BlockId">
        <!-- <p>区块高度</p>
        <p>{{blockId}}</p>-->
        <p>夺币</p>
      </div>

      <div class="Wrap-set" ref="SetDom">
        <p class="Logo" @click.stop="showLuziAlert">
          <img src="~assets/Images/yydbnew/icon_setting@3x.png" alt>
        </p>
      </div>
      <!-- <div class="Wrap-add" @click="showHandle">
        <p class="Logo">
          <img src="~assets/Images/yydbnew/icon_recharg@3x.png" alt>
        </p>
      </div> -->

      <div class="Wrap-myBet" @click="showMyBet">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/hxjc_myBets@3x.png" alt>
        </p>
      </div>
      <div class="Wrap-audioSet" @click="showAudioSetFuc">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/icon_audioSet@3x.png" alt>
        </p>
      </div>
      <div class="Wrap-gameRule" @click="showGameRuleAlert">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/game_rule.png" alt>
        </p>
      </div>
      <router-link class="Wrap-back" to="/index" tag="li">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/hxjc_back@3x.png" alt>
        </p>
      </router-link>
    </div>
    <transition name="slide">
      <div v-if="!isMain" class="subWrap" ref="subWrap">
        <ul class="subWrap_l">
          <li
            v-for="item in subList"
            :key="item.id"
            @click.stop="selectIcon(item.id)"
            :class="checkIcon === item.id&&'active'"
          >
            <img :src="getIconPic(item, checkIcon)" :alt="item.value">
            <p>{{item.value}}</p>
          </li>
        </ul>
        <div class="subWrap_r" v-if="showRule">
          <div class="ruleTitle">
            <p>规则</p>
            <span class="line"></span>
          </div>
          <div class="subWrap_r_wrap_rule">
            <ScrollH>
              <div class="rule_warpper">
                <!-- 规则详情页 -->
                <p>玩法介绍</p>
                <p>
                  玩家通过预测EOS区块高度对应Hash(哈希值)的最后
                  <span class="redLight">3</span>位数字。
                </p>
                <p>玩家可任意购买夺币号码，从000到999，总共1000注，每注金额10PK即可。玩家购买一注，将获得1个系统分配的夺宝号码。</p>
                <p>
                  猜中末尾3位数字的玩家即可获得
                  <span class="light_p">8888PK奖励</span>，未猜中则损失购买本金。
                </p>
                <br>
                <p>
                  <span class="light_p">区块哈希值为随机数，截止目前为止，地球上还没有人可以人为干预，保证中奖号码的绝对随机和公正</span>，这也是游戏的魅力所在。
                </p>
                <br>
                <p>开奖规则</p>
                <p>
                 当全部夺宝号码售罄后或规定时间结束后玩家停止下注，封盘后第3秒后EOS产生的第一个区块对应Hash(哈希值)为开奖区块，取Hash(哈希值)的最后
                  <span
                    class="redLight"
                  >3</span>位数字为开奖号码（剔除字母）。
                </p>
                <p>如在规定时间内，夺宝号码未售出80%，则本次夺宝视为流拍，已购号码玩家将收到系统自动退回的下注PK。</p>
                <br>
                <p>Hash查询</p>
                <p>
                  查询特定区块的哈希，只需要把以下链接：
                  <span
                    class="light_p copy"
                    v-clipboard:copy="checkHXUrl"
                    v-clipboard:success="onSuccess"
                    v-clipboard:error="onError"
                  >
                    https://eospark.com/block/
                    <span class="redLight">50847956</span>
                  </span>（点击复制）最后面的数字换成您想查询的区块高度即可
                </p>
                <br>
                <p>举例说明</p>
                <p>封盘后第3秒后EOS最新一个区块高度为50847956。</p>
                <p>浏览器输入，则出现以下提示，</p>
                <img src="~assets/Images/Hxjc/@3x/hxjc_url_img.jpg" alt>
                <p>Hash(哈希值) 末尾302即为开奖号码。</p>
              </div>
            </ScrollH>
          </div>
        </div>
        <div class="subWrap_r" v-else>
          <div class="title">
            <p v-for="item in subKeyList" :key="item.key">{{item.title}}</p>
          </div>
          <div class="subWrap_r_wrap">
            <ScrollH :data="dataList" pullup @scrollToEnd="getLuZhi(true)" :scrollToEndFlag="false">
              <ul class="List" v-if="suRigData.size">
                <li
                  class="List_single"
                  v-for="item in dataList"
                  :key="item.detailId"
                  :class="item.userId === userId&&'active'"
                >
                  <p class="perid">{{item.period}}</p>
                  <p class="hash">{{getHash(item.hash)}}</p>
                  <div
                    class="result_number"
                    v-show="!judgIsLiupai(item.result)"
                  >{{getNumStr(item.result)}}</div>
                  <div class="result_liupai" v-show="judgIsLiupai(item.result)">流拍</div>
                </li>
              </ul>
              <p v-else class="notData">暂无数据</p>
            </ScrollH>
          </div>
        </div>
      </div>
    </transition>
    <Recharge ref="Recharge"></Recharge>
    <MyBets v-if="isMyBets" @close="closeMyBets" :displayNo="displayNo" :checkHash="checkHash"></MyBets>
    <GameRule v-if="showGameRule" @close="closeGameRuleAlert"></GameRule>
    <GameAudioSet v-if="showAudioSet" @close="closeAudioSetFuc"></GameAudioSet>
    <YydbLuzi
      v-if="showLuzi"
      @close="closeLuziAlert"
      :luziData="LuziData"
      :showYydbLuziDetail="showLuziDetailAlert"
      :displayNo="displayNo"
    ></YydbLuzi>
    <YydbLuziDetail v-if="showLuziDetail" @close="closeLuziDetailAlert" :displayNo="displayNo"></YydbLuziDetail>
    <HashCheck ref="HashCheck" :checkHashValue="checkHashValue"></HashCheck>
  </div>
</template>

<script>
import seleluziIcon from "Images/yydbnew/left_luzi_sel.png";
import seleRuleIcon from "Images/yydbnew/left_rule_sel.png";
import seleBackIcon from "Images/yydbnew/left_back_sel.png";

import LuziIcon from "Images/yydbnew/left_luzi.png";
import RuleIcon from "Images/yydbnew/left_rule.png";
import BackIcon from "Images/yydbnew/icon_back_child@3x.png";

import ScrollH from "components/ScrollH";
import Recharge from "components/Modal/Recharge";
import MyBets from "components/Modal/Hxjc/MyBets";
import GameAudioSet from "components/Modal/GameAudioSet/GameAudioSet";
import { mapGetters } from "vuex";
import YydbLuzi from "components/Modal/LuZi/YydbLuzi";
import YydbLuziDetail from "components/Modal/LuZi/YydbLuziDetail";
import GameRule from "components/Modal/GameRule/YydbGameRule";
import HashCheck from "components/Modal/HashCheck";
export default {
  props: {
    blockId: {
      type: [String, Number],
      default: "----"
    },
    displayNoMethod: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      subList: [
        { iconPic: LuziIcon, seleIcon: seleluziIcon, value: "路子", id: 0 },
        // { iconPic: BenJucon, value: "本局", id: 1 },
        { iconPic: RuleIcon, seleIcon: seleRuleIcon, value: "规则", id: 2 },
        { iconPic: BackIcon, seleIcon: seleBackIcon, value: "返回", id: 3 }
      ],
      subKeyList: [],
      setShow: false,
      isMain: true,
      suRigData: {},
      dataList: [],
      checkIcon: 2,
      show: false,
      showRule: false, //是否显示规则页面
      page: 1,
      pageSize: 20,
      canLoadData: true, //是否能加载数据
      isMyBets: false, //是否显示我的投注
      showAudioSet: false, //是否显示音效设置
      showLuzi: false,
      LuziData: [],
      showLuziDetail: false,
      showGameRule: false,
      checkHashValue: 0 //要查询的hash值
    };
  },
  computed: {
    ...mapGetters({ userId: "getUserId" })
  },
  mounted() {
    document.addEventListener("click", this.eventClick);
    this.getLuZhiAlertData();
    this.$EventListener.on("yydbGameSocket", this.receiveSocketMessage);
  },
  destroyed() {
    document.removeEventListener("click", this.eventClick);
  },
  components: {
    ScrollH,
    Recharge,
    GameAudioSet,
    MyBets,
    YydbLuzi,
    YydbLuziDetail,
    GameRule,
    HashCheck
  },
  methods: {
    receiveSocketMessage(data) {
      //开奖结果
      if (data.socketType === 3) {
        this.LuziData = [...this.LuziData, data];
        if (this.LuziData.length > 40) {
          this.LuziData.splice(0, 4);
        }
      }
    },
    showLuziAlert() {
      this.showLuzi = true;
    },
    closeLuziAlert() {
      this.showLuzi = false;
    },
    showLuziDetailAlert() {
      this.showLuzi = false;
      this.showLuziDetail = true;
    },
    closeLuziDetailAlert() {
      this.showLuziDetail = false;
    },
    getNumStr(num) {
      if (num < 10) {
        return "00" + num;
      } else if (num >= 10 && num < 100) {
        return "0" + num;
      } else {
        return num;
      }
    },
    showMyBet() {
      this.isMyBets = true;
    },
    closeMyBets() {
      this.isMyBets = false;
    },
    showAudioSetFuc() {
      this.showAudioSet = true;
    },
    //开启游戏说明
    showGameRuleAlert() {
      this.showGameRule = true;
    },
    //关闭游戏说明
    closeGameRuleAlert() {
      this.showGameRule = false;
    },
    closeAudioSetFuc() {
      this.showAudioSet = false;
    },
    displayNo(startNo, endNo) {
      var result = this.displayNoMethod(startNo, endNo);
      return result;
    },
    getIconPic(subItem, selectIcon) {
      if (selectIcon === subItem.id) {
        return subItem.seleIcon;
      } else {
        return subItem.iconPic;
      }
    },
    showHandle() {
      this.$refs.Recharge.show();
    },
    close() {
      this.show = false;
    },
    eventClick(event) {
      let sp = this.$refs.subWrap,
        Set = this.$refs.SetDom;
      if (sp && !this.isMain) {
        if (!sp.contains(event.target)) {
          this.isMain = true;
          this.page = 1;
        }
      }

      if (Set && this.setShow) {
        if (!Set.contains(event.target)) {
          this.setShow = false;
        }
      }
    },
    hashSplic(hash) {
      // let hash1 = hash.substring(0, 8);
      let hash2 = hash.substring(hash.length - 7);
      return "..." + hash2;
    },
    selectMain(type) {
      this.isMain = false;
      this.setShow = false;
      this.selectIcon(type);
    },
    selectIcon(type) {
      this.checkIcon = type;
      this.suRigData = {};
      if (type === 0) {
        this.showRule = false;
        this.subKeyList = [
          { title: "期数", key: "blockId" },
          { title: "中奖号段", key: "hash" }
          // { title: "结果", key: "result" }
        ];
        this.getLuZhi(false);
      } else if (type === 1) {
        // this.showRule = false;
        // this.subKeyList = [
        //   { title: "账号", key: "nick" },
        //   { title: "竞猜", key: "positionType" },
        //   { title: "金额", key: "bets", suffix: "PK" }
        // ];
        // this.getBenJu();
      } else if (type === 2) {
        this.showRule = true;
      } else if (type === 3) {
        this.showRule = false;
        this.isMain = true;
      }
    },
    setHanle() {
      this.setShow = !this.setShow;
    },
    //获取路子数据
    getLuZhi(isGetMore) {
      if (!this.canLoadData) {
        return;
      }
      this.$ajax(
        {
          url: "hds/hashDuobao/findWay",
          data: {
            params: {
              page: this.page,
              pageSize: this.pageSize
            }
          }
        },
        true
      )
        .then(res => {
          console.log(res.data);
          this.canLoadData = true;
          if (!isGetMore) {
            this.suRigData = res.data;
            this.dataList = [];
            this.page = 1;
            this.dataList = res.data.list;
          } else {
            if (this.page === 1) {
              this.dataList = [];
            }
            if (res.data.size === 0 && this.page === 1) {
              this.dataList = [];
              this.$toast("暂无数据");
              this.suRigData = res.data;
            } else if (res.data.size > 0) {
              this.suRigData = res.data;
              this.page = this.page + 1;
              this.dataList = this.dataList.concat(res.data.list);
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
    //获取最新30条路子数据
    getLuZhiAlertData() {
      this.$ajax(
        {
          url: "hds/hashDuobao/findWay",
          data: {
            params: {
              page: 1,
              pageSize: 10
            }
          }
        },
        true
      )
        .then(res => {
          console.log("夺币路子", res.data.list);
          this.LuziData = res.data.list.reverse();
        })
        .catch(err => {
          this.canLoadData = true;
          console.log(err);
        });
    },
    judgIsLiupai(result) {
      return result === -2;
    },
    getHash(hash) {
      if (hash) {
        return "..." + hash.substr(hash.length - 16, hash.length);
      }
    },
    //出现哈希查询弹窗
    checkHash(checkHashValue, gameType) {
      if (checkHashValue == 0) {
        this.checkHashValue = "";
      } else {
        this.checkHashValue = checkHashValue;
      }
      this.$refs.HashCheck.show(this.checkHashValue,gameType);
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper {
  .slide-leave-active, .slide-enter-active {
    // 动画离开过程：0.5s
    transition: all 0.8s ease-out;
  }
  .slide-enter, .slide-leave-active {
    // 动画之前的位置
    transform: translateX(-100%);
    opacity: 0.6;
  }
  .Wrap {
    width: 0.988764rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .BlockId {
      height: 0.70412rem;
      padding-top: 0.299626rem;
      font-size: 0.224719rem;
      font-weight: bold;
      line-height: 0.2397rem;
      text-align: center;
      color: #404979;
    }
    &-set {
      position: relative;
      .Logo {
        position: relative;
        z-index: 1;
        img {
          width: 0.599251rem;
          height: 0.599251rem;
        }
      }
      .hideWrap {
        position: absolute;
        top: 0.044944rem;
        left: 0.029963rem;
        width: 0.539326rem;
        border-radius: 0.269663rem;
        background-color: #0f1021;
        height: 0;
        // transform: translateY(-100%) scale(0.8, 0.8);
        // opacity: 0;
        transition: all 0.8s;
        overflow: hidden;
        &.show {
          // transform: translateY(0) scale(1, 1);
          // opacity: 1;
          padding-top: 0.539326rem;
          padding-bottom: 0.179775rem;
          height: 2.187266rem;
        }
        li {
          text-align: center;
          width: 0.539326rem;
          height: 0.479401rem;
          padding: 0.089888rem 0.11985rem;
          img {
            width: 0.299625rem;
          }
        }
      }
    }
    &-add {
      .Logo {
        img {
          width: 0.599251rem;
          height: 0.599251rem;
        }
      }
    }
    &-myBet {
      .Logo {
        img {
          width: 0.599251rem;
          height: 0.599251rem;
        }
      }
    }
    &-audioSet {
      .Logo {
        img {
          width: 0.599251rem;
          height: 0.599251rem;
        }
      }
    }
    &-gameRule {
      .Logo {
        img {
          width: 0.599251rem;
          height: 0.599251rem;
        }
      }
    }
    &-back {
      .Logo {
        img {
          width: 0.599251rem;
          height: 0.599251rem;
        }
      }
    }
  }
  .subWrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 4.794007rem;
    height: 100%;
    z-index: 4;
    display: flex;
    &_l {
      width: 1.258427rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #333b6d;
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        &.active {
          background: url('../../assets/Images/yydbnew/left_bg.png') 0 0 / 100% 100% no-repeat;
          &:after {
            display: none;
          }
        }
        &:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0.074906rem;
          width: 1.033708rem;
          height: 0.014981rem;
          background-color: #475396;
        }
        img {
          width: 0.524345rem;
          height: 0.524345rem;
        }
        p {
          margin-top: 0.134831rem;
          font-size: 0.209738rem;
          color: #eaf6fc;
        }
      }
    }
    &_r {
      flex: 1;
      height: 100%;
      padding: 0 0.299625rem;
      background: #242743;
      // background: url('../../assets/Images/yydbnew/left_bg.png') 0 0 / 100% 100% no-repeat;
      &_wrap {
        height: calc(100% - 0.749064rem);
      }
      .title {
        height: 0.614232rem;
        color: #c0c5f4;
        line-height: 0.599251rem;
        position: relative;
        display: flex;
        p {
          flex: 1;
          text-align: center;
          &:last-child {
            text-align: right;
          }
          &:first-child {
            text-align: left;
          }
        }
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 0.014981rem;
          background-color: #2a2e57;
          left: 0;
          bottom: 0;
        }
      }
      .List {
        li {
          display: flex;
          align-items: center;
          .perid {
            text-align: left;
            width: 10%;
          }
          .hash {
            width: 70%;
            text-align: center;
          }
          .result_number {
            width: 0.644194rem;
            text-align: center;
            margin-right: 0.044944rem;
            background: url('../../assets/Images/yydbnew/bg_no.png') 0 0 / 100% 100% no-repeat;
            font-size: 0.179775rem;
            color: #242743;
            font-weight: bold;
            height: 0.2397rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .result_liupai {
            width: 0.644194rem;
            color: #d7c385;
            text-align: center;
            margin-right: 0.044944rem;
            font-size: 0.179775rem;
            height: 0.2397rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
          }
        }
        &_single {
          color: #7592cd;
          height: 0.419476rem;
          line-height: 0.419476rem;
          &.active {
            color: #e9f5fc;
          }
        }
      }
      .notData {
        height: 0.419476rem;
        line-height: 0.419476rem;
        text-align: center;
        color: #7592cd;
      }
      // 规则页面
      .ruleTitle {
        height: 0.614232rem;
        color: #c0c5f4;
        line-height: 0.599251rem;
        display: flex;
        text-shadow: 2px 2px #10111d;
        flex-direction: column;
        p {
          flex: 1;
          text-align: center;
          width: 100%;
          height: 100%;
        }
        .line {
          width: 100%;
          height: 0.014981rem;
          background-color: #2a2e57;
          left: 0;
          bottom: 0;
        }
      }
      &_wrap_rule {
        width: 2.921348rem;
        height: calc(100% - 0.749064rem);
        .rule_warpper {
          text-align: left;
          font-size: 0.179775rem;
          line-height: 0.314607rem;
          color: #728dc7;
          padding-right: 0;
          word-wrap: break-word;
          .indent_p {
            text-indent: 2em;
          }
          .light_p {
            color: #71dce3;
          }
          img {
            // width: 100%;
            height: 1.602996rem;
          }
          .copy {
            text-decoration: underline;
          }
          .redLight {
            color: red;
          }
        }
      }
    }
  }
}
</style>
