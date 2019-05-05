<template>
  <transition name="dialog">
    <div class="dialog" @click="close">
      <div class="modal" @click.stop>
        <div class="headTitle">
          <img src="~assets/Images/Hxjc/@3x/hxjc_rule_title.png" alt>
        </div>
        <div class="subWrap_r_wrap_rule">
          <ScrollH>
            <div class="rule_warpper">
              <p class="light_p">玩法介绍</p>
              <p>玩家通过预测EOS区块高度对应Hash(哈希值)的最后1位数字。</p>
              <p>玩家可任意押注大小单双和0-9数字，每个位置最多可押注20000PK。</p>
              <p>大小单双赔率为1:1.95。</p>
              <p>猜中0-9尾数赔率为1:9。</p>
              <p>未猜中则损失下注本金。</p>
              <!-- <p>
                猜中尾数的玩家即可获得
                <span class="light_p">8倍奖励</span>，未猜中则损失下注本金。
              </p> -->
              <br>
              <p>
                <span class="light_p">区块哈希值为随机数，截止目前为止，地球上还没有人可以人为干预，保证中奖号码的绝对随机和公正</span>，这也是游戏的魅力所在。
              </p>
              <br>
              <p class="light_p">开奖规则</p>
              <p>封盘后3秒，EOS产生的第一个区块对应Hash(哈希值)为开奖区块，取Hash(哈希值)的最后1位数字为开奖号码（剔除字母）。</p>
              <br>
              <p class="light_p">Hash查询</p>
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
              <p class="light_p">举例说明</p>
              <p>封盘后3秒，EOS最新一个区块高度为50847956。</p>
              <p>浏览器输入https://eostracker.io/blocks/50847956，则出现以下提示，</p>
              <img src="~assets/Images/Hxjc/@3x/hxjc_url_img.jpg" alt>
              <p>Hash(哈希值) 尾数2即为开奖号码。</p>
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
    height: 3.970037rem;
    background-color: #111619;
    border-radius: 0.059925rem;
    overflow: hidden;
    .headTitle {
      text-align: center;
      height: 0.659176rem;
      background: url('../../../assets/Images/Hxjc/@3x/hxjc_luzi_title_bg.png') 0 0 / 100% 100% no-repeat;
      text-align: center;
      img {
        height: 0.569288rem;
        margin-top: 0.044944rem;
      }
    }
    
    .subWrap_r_wrap_rule {
      width: 100%;
      height: 3.310861rem;
      padding 0.269663rem;
      .rule_warpper {
        padding-right: 0;
        text-align: left;
        font-size: 0.179775rem;
        line-height: 0.314607rem;
        color: #428e98;
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
</style>
