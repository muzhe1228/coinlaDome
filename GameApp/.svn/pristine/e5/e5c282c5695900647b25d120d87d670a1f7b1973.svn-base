<template>
  <div class="inpGroup">
    <p class="label" :class="labelWidth == 4&&'fourText'" :style="labelColor">{{label}}</p>
    <input
      :class="btnText?'haveSendCode':''"
      :type="type"
      :name="name"
      v-model="ModeVal"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="change(ModeVal,name)"
      @focus="change(ModeVal,name)"
    >
    <button v-if="btnText" class="sendCode" @click="sendCode(1)" :disabled="btnDisabled">{{btnText}}</button>
  </div>
</template>

<script>
import $ from "jquery";
import { lStore } from "../../../common/func";
export default {
  props: {
    label: {
      type: String
    },
    labelWidth: {
      type: Number
    },
    type: {
      type: String,
      default: "text"
    },
    Val: {
      type: [String, Number],
      default: ""
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelColor: {
      type: String,
      default: ""
    },
    btnText: {
      type: String,
      default: ""
    },
    btnDisabled: {
      type: Boolean,
      default: false
    },
    maxLeng: {
      type: [Number, String]
    }
  },
  data() {
    return {
      ModeVal: this.Val
    };
  },
  watch: {
    Val: function(val) {
      this.ModeVal = val;
    }
  },
  components: {},
  mounted() {
    // var wHeight = window.innerHeight; //获取初始可视窗口高度
    // window.addEventListener("resize", () => {
    //   //监测窗口大小的变化事件
    //   var hh = window.innerHeight; //当前可视窗口高度
    //   var viewTop = $(window).scrollTop(); //可视窗口高度顶部距离网页顶部的距离
    //   if (wHeight > hh) {
    //     //可以作为虚拟键盘弹出事件
    //     alert.log("键盘弹出事件");
    //     this.$changeInput(this.ModeVal);
    //   } else {
    //     //可以作为虚拟键盘关闭事件
    //     this.$changeInput("");
    //     alert.log("键盘关闭事件");
    //   }
    //   wHeight = hh;
    // });
  },
  methods: {
    change(val, name) {
      if (this.maxLeng) {
        this.ModeVal = this.subStr(val, this.maxLeng);
        this.$emit("Change", this.subStr(val, this.maxLeng), name);
      } else {
        this.$emit("Change", val, name);
      }
      // lStore.set("inputText", this.ModeVal);
      this.$changeInput(this.ModeVal);
    },
    sendCode(code) {
      this.$emit("sendCode", code);
    },
    GetByteLen(val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/gi) != null) {
          len += 2;
        } else {
          len += 1;
        }
      }
      return len;
    },
    subStr(val, legth) {
      var len = 0,
        str = "";
      legth = parseInt(legth);
      if (this.GetByteLen(val) > legth) {
        for (var i = 0; i < val.length; i++) {
          var a = val.charAt(i);
          str += a;
          if (a.match(/[^\x00-\xff]/gi) != null) {
            len += 2;
          } else {
            len += 1;
          }
          if (len == legth) {
            return str;
          } else if (len == legth + 1) {
            return str.substring(0, str.length - 1);
          }
        }
      } else {
        return val;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.inpGroup {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  width: 100%;
  height: 0.479401rem;
  font-size: 0.194757rem;
  margin-top: 0.2397rem;
  overflow: hidden;
  .label {
    height: 0.479401rem;
    line-height: 0.479401rem;
    padding: 0 0.089887rem;
    color: #acb3e2;
    min-width:0.749064rem;
    &:after {
      content: '';
      display: inline-block;
      width: 100%;
    }
  }
  .fourText{
    min-width:0.973783rem;
  }
  .sendCode {
    color: #2b2f57;
    background: url('~assets/Images/PersonalPage/alert_sendCode_bg.png') 0 0 / 100% 100% no-repeat !important;
    font-size: 0.209738rem;
    &:disabled {
      color: #2b2f57;
    }
    height: 0.47191rem;
    margin-top: -0.007491rem;
    width: 1.52809rem;
  }
  input {
    flex: 1;
    padding: 0 0.089887rem;
    border-radius: 0.059925rem;
    background-color: #363e76;
    margin-top: -0.014981rem;
    height: 100%;
    color: #fff;
    border: none;
    &::placeholder {
    color: #888fc5;
    }
  }
  .haveSendCode {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
