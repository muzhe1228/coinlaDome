<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <transition name="dialog">
    <div v-if="isShow" class="dialog" @click="close">
      <div class="modal" @click.stop>
        <div class="modal-head">
          <p class="title">游戏规则</p>
          <!-- <p class="close animated" @click="close">
            <i class="iconfont">&#xe619;</i>
          </p> -->
        </div>
        <div class="gameRule">
          <ScrollH>
            <p>查询特定区块的哈希，只需要把以下链接：</p>
            <div class="copyLink">
              <p>https://eospark.com/block/50847956</p>
              <p
                class="copyLink_btn"
                v-clipboard:copy="'https://eospark.com/block/50847956'"
                v-clipboard:success="onSuccess"
                v-clipboard:error="onError"
              >点击复制</p>
            </div>
            <p>最后面的数字换成你想查询的高度值即可。如果出现以下提示，则表示此区块还未生成。</p>
            <p>
              预测ETH相应区块高度的hash
              的最后1位数字，猜中大小获得下单金额1.9倍奖励，猜中数字获得8倍奖励。
              未猜中则损失本金。
            </p>
            <p>举例：</p>
            <p>区块高度：5827450</p>
            <p>哈希值：00x2f4b7f770305faceaf7f56129b8d7701d784e0c3f00998e64ae80db9fc333af2</p>
          </ScrollH>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import comModal from "../comModal";
import ScrollH from "../../ScrollH";
export default {
  data() {
    return {
      isShow: false,
      title: "游戏规则"
    };
  },
  components: { comModal, ScrollH },
  methods: {
    onSuccess() {
      this.$toast("复制成功");
    },
    onError() {
      this.$toast("浏览器不支持复制");
    },
    close() {
      this.isShow = false;
    },
    show() {
      this.isShow = true;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../styl.styl';
.modal {
  width: 6.59176rem;
  height: 3.850187rem;
  background-color: #2e2e33;
  border-radius: 0.059925rem;
  .gameRule {
    margin-top: 0.164794rem;
    height: 2.801498rem;
    overflow: hidden;
    line-height: 0.359551rem;
    p {
      word-wrap: break-word;
    }
    .copyLink {
      width: 100%;
      height: 0.479401rem;
      background-color: $bgMain;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.2397rem;
      padding: 0 0.2397rem;
      margin: 0.149813rem 0;
      &_btn {
        color: $colorMain;
        text-decoration: underline;
      }
    }
  }
}
</style>
