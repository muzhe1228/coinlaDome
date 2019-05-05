<template>
  <div class="chatWrap" @click="showMsgList">
    <div class="chatList">
      <div class="ListWrap" v-if="isShowList">
        <ScrollH :scrollToEndFlag="true" :data="list">
          <ul class="List">
            <li
              class="single"
              v-for="(item,index) in list"
              :key="index"
              :class="item.userId == userId&&'active'"
            >
              <p class="nick">
                [
                <span>{{item.userName}}</span>]&nbsp;&nbsp;
              </p>
              <p class="details">{{item.content}}</p>
            </li>
          </ul>
        </ScrollH>
      </div>
      <transition name="slide">
        <label @click="show" v-show="!isShow" class="chatIcon" for="msg">
          <img src="~assets/Images/Hxjc/@3x/chatIcon.png" alt>
        </label>
      </transition>
    </div>
    <transition name="slide">
      <div class="InpGroup" v-show="isShow" ref="inpGroup">
        <img
          class="left-keyboard"
          src="~assets/Images/Hxjc/@3x/icon_keyboard@3x.png"
          alt
          @click="closeSelf"
        >
        <input
          type="text"
          id="msg"
          ref="inp"
          v-model="msg"
          @keydown.enter="sendMsg(msg)"
          maxlength="20"
          @input="changeText(msg)"
          @focus="changeText(msg)"
        >
        <img @click.stop="sendMsg(msg)" src="~assets/Images/Hxjc/@3x/btnChat.png" alt>
      </div>
    </transition>
    <!-- <Socket :url="`${ENV.socketChat}/${roomType}/${roomId}`" :onMessage="ChatSocket"/> -->
  </div>
</template>

<script>
import ScrollH from "components/ScrollH";
import Socket from "components/Socket";
import ENV from "common/Api/ENV";
import { mapGetters } from "vuex";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    roomId: {
      type: [String, Number],
      required: true
    },
    roomType: {
      type: [String, Number],
      required: true
    },
    Url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      list: [],
      msg: "",
      ENV: ENV.getENV(),
      isShowList: false,
      showTimer: null,
      
    };
  },
  computed: {
    ...mapGetters({ userId: "getUserId" })
  },
  mounted() {
    document.addEventListener("click", this.eventClose);
    // this.getBenJu();
    this.$EventListener.on("hxjcChatMsgSocket", this.receiveSocketMessage);
  },
  destroyed() {
    document.removeEventListener("click", this.eventClose);
    this.$EventListener.off("hxjcChatMsgSocket", this.receiveSocketMessage);
  },
  components: { ScrollH, Socket },
  methods: {
    changeText(msg) {
      // lStore.set("inputText", this.msg);
      this.$changeInput(msg);
    },
    receiveSocketMessage(data) {
      this.ChatSocket(data);
    },
    ChatSocket(data) {
      this.list = [...this.list, data];
      this.isShowList = true;
      this.showTimer = setTimeout(() => {
        if (!this.isShow) {
          this.isShowList = false;
        }
      }, 5000);
    },
    //关闭本页面
    closeSelf() {
      this.$emit("showMsgInp", false);
    },
    //send发送消息
    sendMsg(msg) {
      if (!msg) {
        this.$toast("请输入内容");
        return;
      }
      this.$ajax(
        {
          url: this.Url,
          data: {
            params: {
              content: msg,
              roomId: this.roomId,
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.msg = "";
    },
    show() {
      // this.isShow = true;
      this.$emit("showMsgInp", true);
      let _this = this;
      setTimeout(() => {
        _this.$refs.inp.focus();
      }, 200);
    },
    showMsgList() {
      this.isShowList = true;
    },
    eventClose(event) {
      if (this.isShow) {
        let sp = this.$refs.inpGroup;
        if (sp) {
          if (!sp.contains(event.target)) {
            this.$emit("showMsgInp", false);
            this.showTimer = setTimeout(() => {
              this.isShowList = false;
            }, 5000);
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.chatWrap {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 12;
  width: 100%;
  .slide-leave-active, .slide-enter-active {
    // 动画离开过程：0.5s
    transition: all 0.8s ease-out;
  }
  .slide-enter, .slide-leave-active {
    // 动画之前的位置
    transform: translateY(100%);
    opacity: 0.6;
  }
  .InpGroup {
    height: 0.674157rem;
    width: 100%;
    margin: auto;
    padding-top: 0.104869rem;
    // width: 8.029963rem;
    background-color: #0e1b20;
    display: flex;
    justify-content: center;
    z-index :12;
    input {
      width: 6.621723rem;
      height: 0.479401rem;
      background-color: #010304;
      border-radius: 0.059925rem;
      color: #a9f2f8;
      padding-left: 0.11985rem;
    }
    img {
      margin-left: 0.089888rem;
      width: 1.243446rem;
      height: 0.479401rem;
    }
    .left-keyboard {
      margin-top: 0.044944rem;
      width: 0.374532rem;
      height: 0.374532rem;
      margin-right: 0.179775rem;
    }
  }
  .chatList {
    position: absolute;
    bottom: 0.674157rem;
    left: 0.179775rem;
    width: 4.494382rem;
    .ListWrap {
      height: 1.198502rem;
      .single {
        line-height: 0.299625rem;
        display: flex;
        color: #a9f2f8;
        text-shadow: 0 0.029963rem 0.029963rem #042bc3;
        &.active {
          color: #eeddad;
        }
        .nick {
          display: flex;
          align-items: center;
          width: 1.273408rem;
          height: 0.299625rem;
          line-height: 0.299625rem;
          justify-content: space-between;
          span {
            text-align: center;
            line-height: 0.299625rem;
            display: block;
            width: 90%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .details {
          width: 3.220974rem;
          word-break: break-all;
        }
      }
    }
    .chatIcon {
      margin-left: 0.149813rem;
      img {
        width: 0.284644rem;
      }
    }
    .inpGroup {
      height: 0.674157rem;
      width: 100%;
    }
  }
}
</style>

