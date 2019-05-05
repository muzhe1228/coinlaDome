<template>
  <div class="Select" ref="select">
    <p class="Select_default" @click="show">{{check}}
      <i class="iconfont">&#xe627;</i>
    </p>
    <div v-if="isShow" class="optionAll">
      <ul class="Select_option">
        <li
          @click="select(item)"
          v-for="item in selectList"
          :key="item.value"
          :class="item.label === check&&'active'"
        >{{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    Change: {
      type: Function
    },
    keyId: {
      type: String
    }
  },
  data() {
    return {
      isShow: false,
      check: this.keyId==='timeSelect'?'时间':"全部"
    };
  },
  components: {},
  mounted() {
    document.addEventListener("click", this.close);
  },
  destroyed() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    close(event) {
      this.$clickAudio()
      let sp = this.$refs.select;
      if (sp) {
        if (!sp.contains(event.target)) {
          this.isShow = false;
        }
      }
    },
    select(item) {
      this.$clickAudio()
      this.isShow = false;
      this.check = item.label;
      this.Change(item);
    },
    show() {
      this.$clickAudio()
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.Select {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  i{
    position: absolute;
    top:0;
    right:0.074906rem;
    // margin-left :0.11985rem;
    font-size :0.104869rem;
  }
  &_default {
    position: absolute;
    top:calc(50% - 0.164794rem);
    width: 100%;
    height: 0.329588rem;
    line-height: 0.329588rem;
    background-color: #282d57;
    border-radius :0.029963rem;
    // padding: 0 -12px 0 12px;
    left:-0.074906rem;
    padding-left :0.074906rem;
  }
  &_option {
    width: calc(100% + 17px);
    max-height: 1.917603rem;
    overflow-y: scroll;
    // background-color: rgba(40,45,87,0.8);
    li {
      padding-left: 0.11985rem;
      height: 0.479401rem;
      line-height: 0.479401rem;
      text-align: left;
      background-color: rgba(40,45,87,0.8);
      color: #acb3e2;
      &.active {
        background-color: #151a45;
        color: #ffffff;
      }
    }
  }
  .optionAll {
    background-color: rgba(40,45,87,0.8);
    border-radius: 0.059925rem;
    width: 100%;
    // max-height: 1.917603rem;
    overflow: hidden;
    position: absolute;
    top: 105%;
    left: -0.059925rem;
  }
}
</style>
