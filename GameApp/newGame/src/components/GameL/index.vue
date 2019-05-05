<template>
  <div class="wrapper">
    <div class="Wrap" v-if="isMain">
      <div class="BlockId">
        <p>猜尾数</p>
        <!-- <p>区块高度</p> -->
        <!-- <p>{{blockId}}</p> -->
      </div>
      <div class="Wrap-luzi" @click.stop="showLuzi">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/hxjc_Luzi@3x.png" alt>
        </p>
      </div>

      <!-- hash查询 -->
      <div class="Wrap-luzi" @click.stop="checkHash(0,1)">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/blockCheck_icon.png" alt>
        </p>
      </div>
      <!-- <div class="Wrap-add" @click="showHandle">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/ChongZ@3x.png" alt>
        </p>
      </div>-->
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
      <div class="Wrap-back" @click="backHome">
        <p class="Logo">
          <img src="~assets/Images/Hxjc/@3x/hxjc_back@3x.png" alt>
        </p>
      </div>
    </div>
    <Recharge ref="Recharge"></Recharge>
    <MyBets v-if="isMyBets" @close="closeMyBets" :checkHash="checkHash"></MyBets>
    <GameAudioSet v-if="showAudioSet" @close="closeAudioSetFuc" pageType="1"></GameAudioSet>
    <HxjcLuzi
      v-if="showHxjcLuzi"
      @close="closeHxjcLuzi"
      :luziData="hxjcLuziData"
      :showHxjcLuziDetail="showHxjcLuziDetail"
    ></HxjcLuzi>
    <HxjcLuziDetail v-if="showLuziDetail" @close="closeHxjcLuziDetail" :checkHash="checkHash"></HxjcLuziDetail>
    <GameRule v-if="showGameRule" @close="closeGameRuleAlert"></GameRule>
    <HashCheck ref="HashCheck" :checkHashValue="checkHashValue"></HashCheck>
  </div>
</template>

<script>
import LuziIcon from "Images/Hxjc/@3x/subLuZi.png";
import BenJucon from "Images/Hxjc/@3x/subBenJu.png";
import RuleIcon from "Images/Hxjc/@3x/hxjc_unselect_rule@3x.png";
import BackIcon from "Images/Hxjc/@3x/subBack.png";
import ScrollH from "components/ScrollH";
import Recharge from "components/Modal/Recharge";
import MyBets from "components/Modal/Hxjc/MyBets";
import GameAudioSet from "components/Modal/GameAudioSet/GameAudioSet";
import { mapGetters } from "vuex";
import HxjcLuzi from "components/Modal/LuZi/HxjcLuzi";
import HxjcLuziDetail from "components/Modal/LuZi/HxjcLuziDetail";
import GameRule from "components/Modal/GameRule/HxjcGameRule";
import HashCheck from "components/Modal/HashCheck";
export default {
  props: {
    blockId: {
      type: [String, Number],
      default: "----"
    },
    openData: {
      type: Object,
      default: {}
    },
    showResult: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showResult(newShowResult, oldshowResult) {
      if (newShowResult) {
        if (
          this.openData.blockId !=
          this.hxjcLuziData[this.hxjcLuziData.length - 1].blockId
        ) {
          this.hxjcLuziData = [...this.hxjcLuziData, this.openData];
          if (this.hxjcLuziData.length > 90) {
            this.hxjcLuziData.splice(0, 6);
          }
        }
      }
    }
  },
  data() {
    return {
      subList: [
        { iconPic: LuziIcon, value: "路子", id: 0 },
        { iconPic: BenJucon, value: "本局", id: 1 },
        { iconPic: RuleIcon, value: "规则", id: 2 },
        { iconPic: BackIcon, value: "返回", id: 3 }
      ],
      subKeyList: [
        { title: "账号", key: "nick" },
        { title: "竞猜", key: "positionType" },
        { title: "金额", key: "bets", suffix: "PK" }
      ],
      setShow: false,
      isMain: true,
      suRigData: [],
      checkIcon: 0,
      show: false,
      isMyBets: false, //是否显示我的投注
      showAudioSet: false, //是否显示音效设置
      luziPage: 1,
      luziSize: 20,
      localGamePage: 1,
      localGameSize: 20,
      luziNoDataTitle: "加载中···",
      loacalGameNoDataTitle: "加载中···",
      showHxjcLuzi: false,
      hxjcLuziData: [],
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
    this.getHxjcLuZhi();
  },
  destroyed() {
    document.removeEventListener("click", this.eventClick);
  },
  components: {
    ScrollH,
    Recharge,
    MyBets,
    GameAudioSet,
    HxjcLuzi,
    HxjcLuziDetail,
    GameRule,
    HashCheck
  },
  methods: {
    showMyBet() {
      this.isMyBets = true;
    },
    closeMyBets() {
      this.isMyBets = false;
    },
    showAudioSetFuc() {
      this.showAudioSet = true;
    },
    closeAudioSetFuc() {
      this.showAudioSet = false;
    },
    showHandle() {
      this.$refs.Recharge.show();
    },
    close() {
      this.show = false;
    },
    //开启游戏说明
    showGameRuleAlert() {
      this.showGameRule = true;
    },
    //关闭游戏说明
    closeGameRuleAlert() {
      this.showGameRule = false;
    },
    eventClick(event) {
      let sp = this.$refs.subWrap,
        Set = this.$refs.SetDom;
      if (sp && !this.isMain) {
        if (!sp.contains(event.target)) {
          this.isMain = true;
        }
      }

      if (Set && this.setShow) {
        if (!Set.contains(event.target)) {
          this.setShow = false;
        }
      }
    },
    hashSplic(hash) {
      let hash2 = hash.substring(hash.length - 7);
      return "..." + hash2;
    },
    showLuzi() {
      this.showHxjcLuzi = true;
    },
    closeHxjcLuzi() {
      this.showHxjcLuzi = false;
    },
    showHxjcLuziDetail() {
      this.showHxjcLuzi = false;
      this.showLuziDetail = true;
    },
    closeHxjcLuziDetail() {
      this.showLuziDetail = false;
    },
    setHanle() {
      this.setShow = !this.setShow;
    },
    //获取路子数据
    getLuZhi() {
      console.log("开始调用路子数据");
      let _this = this;
      _this
        .$ajax(
          {
            url: "hjs/hashJingcai/findWay",
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
          console.log("路子数据", res.data);
          if (_this.luziPage === 1) {
            _this.suRigData = [];
          }
          if (res.data.list.length === 0 && _this.luziPage === 1) {
            _this.suRigData = [];
            _this.$toast("暂无数据");
          } else if (res.data.list.length > 0) {
            _this.suRigData = _this.suRigData.concat(res.data.list);
            _this.luziPage = _this.luziPage + 1;
          } else {
            _this.$toast("已加载全部数据");
          }
          if (_this.suRigData.length == 0) {
            _this.luziNoDataTitle = "暂无数据";
          }
        });
    },
    //返回大厅
    backHome() {
      this.$router.push("/index");
    },
    //获取哈希竞猜路子数据
    getHxjcLuZhi() {
      console.log("开始调用路子数据");
      let _this = this;
      _this
        .$ajax(
          {
            url: "hjs/hashJingcai/findWay",
            data: {
              params: {
                page: 1,
                pageSize: 31
              }
            }
          },
          true
        )
        .then(res => {
          this.hxjcLuziData = res.data.list.reverse();
        });
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
      height: 0.449438rem;
      padding-top: 0.134831rem;
      font-size: 0.209738rem;
      font-weight: bold;
      line-height: 0.2397rem;
      text-align: center;
      color: #3a6678;
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
        background-color: #091c25;
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
          height: 2.636704rem;
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
    &-luzi {
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
    z-index: 10;
    display: flex;
    &_l {
      width: 1.258427rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: url('../../assets/Images/Hxjc/@3x/leftBg.png') 0 0 / 100% 100% no-repeat;
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        &.active {
          background: url('../../assets/Images/Hxjc/@3x/selectBg.png') 0 0 / 100% 100% no-repeat;
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
          background-color: #1a3e48;
        }
        img {
          width: 0.524345rem;
          height: 0.524345rem;
        }
        p {
          margin-top: 0.134831rem;
          font-size: 0.2397rem;
          color: #428e98;
        }
      }
    }
    &_r {
      flex: 1;
      height: 100%;
      padding: 0 0.299625rem;
      background: url('../../assets/Images/Hxjc/@3x/subRBg.png') 0 0 / 100% 100% no-repeat;
      &_wrap {
        height: calc(100% - 0.749064rem);
      }
      .title {
        height: 0.614232rem;
        color: #428e98;
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
          background-color: #0f2128;
          left: 0;
          bottom: 0;
        }
      }
      .List {
        li {
          display: flex;
          p {
            flex: 1;
            text-align: center;
            &:last-child {
              text-align: right;
              padding-right: 0.11985rem;
            }
            &:first-child {
              text-align: left;
              white-space: nowrap;
              width: 30%;
            }
          }
        }
        &_single {
          color: #337d86;
          height: 0.419476rem;
          line-height: 0.419476rem;
          &.active {
            color: #78eaf1;
          }
        }
      }
      .notData {
        height: 0.419476rem;
        line-height: 0.419476rem;
        text-align: center;
        color: #337d86;
      }
    }
  }
}
</style>
