<template>
  <transition name="dialog">
    <div class="dialog" @click="close">
      <div class="modal" @click.stop>
        <div class="headTitle">
          <img src="~assets/Images/yydbnew/yydb_rule_title.png" alt>
        </div>
        <div class="subWrap_r">
          <div class="subWrap_r_wrap_rule">
            <ScrollH>
              <div class="rule_warpper">
                <!-- 规则详情页 -->
                <p class="head_p">玩法介绍</p>
                <p>
                  玩家通过预测EOS区块高度对应Hash(哈希值)的最后
                  <span class="redLight">3</span>位数字。
                </p>
                <p>玩家可任意购买夺币号码，从000到999，总共1000注，每注金额10PK即可。玩家购买一注，将获得1个系统分配的夺宝号码。</p>
                <p>
                  猜中末尾3位数字的玩家即可获得
                  <span class="light_p">8888PK奖励</span>，未猜中则损失购买本金。
                </p>
                <p>
                  <span class="light_p">区块哈希值为随机数，截止目前为止，地球上还没有人可以人为干预，保证中奖号码的绝对随机和公正</span>，这也是游戏的魅力所在。
                </p>
                <br>
                <p class="head_p">开奖规则</p>
                <p>
                  当全部夺宝号码售罄后或规定时间结束后玩家停止下注，封盘后3秒，EOS产生的第一个区块对应Hash(哈希值)为开奖区块，取Hash(哈希值)的最后
                  <span
                    class="redLight"
                  >3</span>位数字为开奖号码（剔除字母）。
                </p>
                <p>如在规定时间内，夺宝号码未售出80%，则本次夺宝视为流拍，已购号码玩家将收到系统自动退回的下注PK。</p>
                <br>
                <p class="head_p">Hash查询</p>
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
                <p class="head_p">举例说明</p>
                <p>封盘后3秒，EOS最新一个区块高度为50847956。</p>
                <p>浏览器输入https://eostracker.io/blocks/50847956，则出现以下提示，</p>
                <img class="explain_img" src="~assets/Images/Hxjc/@3x/hxjc_url_img.jpg" alt>
                <p>Hash(哈希值) 末尾302即为开奖号码。</p>
              </div>
            </ScrollH>
          </div>
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
      checkHXUrl: "https://eospark.com/block/50847956" //校验哈希值地址
    };
  },
  mounted() {},
  components: {
    ScrollH
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSuccess() {
      this.$clickAudio();
      this.$toast("复制成功");
    },
    onError() {
      this.$clickAudio();
      this.$toast("浏览器不支持复制");
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
    height: 4.494382rem;
    background-color: #242743;
    border-radius: 0.059925rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .headTitle {
      text-align: center;
      height: 0.659176rem;
      background: url('../../../assets/Images/yydbnew/bg_title_yydb@3x.png') 0 0 / 100% 100% no-repeat;
      text-align: center;
      img {
        height: 0.569288rem;
        margin-top: 0.044944rem;
      }
    }
    .subWrap_r {
      width: 100%;
      &_wrap_rule {
        width: 100%;
        height: 3.715356rem;
        .rule_warpper {
          padding: 0.179775rem 0.179775rem;
          text-align: left;
          font-size: 0.179775rem;
          line-height: 0.374532rem;
          color: #c0d9fb;
          word-wrap: break-word;
          .head_p {
            color: #fff;
            font-size: 0.209738rem;
          }
          .light_p {
            color: #fff;
          }
          img {
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
