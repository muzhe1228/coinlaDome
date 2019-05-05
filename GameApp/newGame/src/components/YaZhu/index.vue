<template>
  <div class="ChipWrap">
    <div class="liuG">
      <img class="guang" src="~assets/Images/Hxjc/@3x/LiuG@3x.png" alt>
    </div>
    <ScrollH>
      <ul>
        <li
          v-for="item in List"
          :key="item.betsId"
          :class="chipCheck === item.bets&&'active'"
          @click="handleChip(item.bets)"
        >
          <p>
            <img class="Chip" :src="item.logo" alt>
            <img class="CM" src="~assets/Images/Hxjc/@3x/CM@3x.png" alt>
          </p>
        </li>
      </ul>
    </ScrollH>
  </div>
</template>

<script>
import ScrollH from "components/ScrollH";
import chip10 from "Images/Hxjc/@3x/10@3x.png";
import chip50 from "Images/Hxjc/@3x/50@3x.png";
import chip100 from "Images/Hxjc/@3x/100@3x.png";
import chip200 from "Images/Hxjc/@3x/200@3x.png";
import chip500 from "Images/Hxjc/@3x/500@3x.png";
import chip1000 from "Images/Hxjc/@3x/1000@3x.png";
export default {
  // props: ["chipCheck"],
  props: {
    roomId: {
      type: [String, Number],
      required: true
    },
    chipCheck: {
      type: [String,Number],
      default: "chipCheck"
    }
  },
  data() {
    return {
      List:[]
    };
  },
  components: { ScrollH },
  mounted(){
    this.RequestCoinList();
  },
  methods: {
    handleChip(code) {
      // this.chip = code;
      this.$emit("Chip", code);
    },
    checkChip(code) {
      switch (code) {
        case 10:
          return chip10;
        case 50:
          return chip50;
        case 100:
          return chip100;
        case 200:
          return chip200;
        case 500:
          return chip500;
        case 1000:
          return chip1000;
        default:
          return;
      }
    },
    //获取可下注的价额列表
    RequestCoinList() {
      console.log('房间ID',this.roomId)
      console.log('调用筹码列表接口')
      this.$ajax(
        {
          url: "/hjs/hashJingcai/findBetsList",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              roomId: this.roomId
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log(res.data);
            this.List = res.data;
            this.$lStore.set("ChipList",res.data);
          }
        })
        .catch(err => {
          console.log('错误',err);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.ChipWrap {
  height: 100%;
  position: relative;
  .liuG {
    position: absolute;
    left: -0.029963rem;
    top: 0;
    width: 0.029963rem;
    height: 100%;
    background-color: #203a42;
    overflow: hidden;
    .guang {
      width: 0.029963rem;
      position: absolute;
      left: 0;
      animation: moveGuang 2.8s linear infinite;
    }
  }
  ul {
    li {
      width: 100%;
      height: 1.003745rem;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(12, 32, 40, 0.6);
          border-radius: 50%;
          transition: all 0.4s ease-out;
        }
        .Chip {
          width: 0.70412rem;
          transition: all 0.4s ease-out;
        }
        .CM {
          position: absolute;
          left: -0.194757rem;
          top: -0.164794rem;
          width: 1.093633rem;
          display: none;
        }
      }
      &.active {
        .Chip {
          transform: scale(1.06, 1.06);
        }
        .CM {
          display: block;
          animation: Rotate 2.8s linear infinite;
        }
        p {
          &:after {
            opacity: 0;
          }
        }
      }
    }
  }
}
@keyframes Rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes moveGuang {
  0% {
    top: -2.247191rem;
  }
  100% {
    top: 100%;
  }
}
</style>
