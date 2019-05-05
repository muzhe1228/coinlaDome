<template>
  <transition name="dialog">
    <!-- @click="closeMyself()" -->
    <div class="dialog">
      <div class="modal" @click.stop>
        <img
          v-if="!isOpen"
          src="~assets/Images/signnew/red_bag_default@3x.png"
          @click.stop="openRedBag()"
        >
        <img v-else :src="ActImg" @click.stop="closeMyself()">
      </div>
    </div>
  </transition>
</template>

<script>
import Red_50_1 from "Images/signnew/redbag/red_50_1@3x.png";
import Red_50_2 from "Images/signnew/redbag/red_50_2@3x.png";
import Red_50_3 from "Images/signnew/redbag/red_50_3@3x.png";
import Red_50_4 from "Images/signnew/redbag/red_50_4@3x.png";
import Red_50_5 from "Images/signnew/redbag/red_50_5@3x.png";
import Red_50_6 from "Images/signnew/redbag/red_50_6@3x.png";
import Red_50_7 from "Images/signnew/redbag/red_50_7@3x.png";
import Red_50_8 from "Images/signnew/redbag/red_50_8@3x.png";

import Red_1000_1 from "Images/signnew/redbag/red_1000_1@3x.png";
import Red_1000_2 from "Images/signnew/redbag/red_1000_2@3x.png";
import Red_1000_3 from "Images/signnew/redbag/red_1000_3@3x.png";
import Red_1000_4 from "Images/signnew/redbag/red_1000_4@3x.png";
import Red_1000_5 from "Images/signnew/redbag/red_1000_5@3x.png";
import Red_1000_6 from "Images/signnew/redbag/red_1000_6@3x.png";
import Red_1000_7 from "Images/signnew/redbag/red_1000_7@3x.png";
import Red_1000_8 from "Images/signnew/redbag/red_1000_8@3x.png";

export default {
  data() {
    return {
      isClick: true,
      isOpen: false,
      ActImg: null,
      i: 0,
      Img: [],
      gifTimer: null
    };
  },
  props: {
    pkNumber: {
      type: Number
    }
  },
  components: {},
  mounted() {
    if (this.pkNumber == 1000) {
      this.Img = [
        Red_1000_1,
        Red_1000_2,
        Red_1000_3,
        Red_1000_4,
        Red_1000_5,
        Red_1000_6,
        Red_1000_7,
        Red_1000_8
      ];
    } else {
      this.Img = [
        Red_50_1,
        Red_50_2,
        Red_50_3,
        Red_50_4,
        Red_50_5,
        Red_50_6,
        Red_50_7,
        Red_50_8
      ];
    }
  },
  destroyed() {
    clearTimeout(this.gifTimer);
  },
  methods: {
    chImg() {
      let size = this.Img.length;
      this.ActImg = this.Img[this.i];
      this.i = this.i + 1;
      if (this.i >= size) {
        clearTimeout(this.gifTimer);
        return;
      }
      this.gifTimer = setTimeout(() => {
        this.chImg();
      }, 60);
    },
    openRedBag() {
      if (this.isClick) {
        this.isClick = false;
        this.$clickAudio();
        this.getReward();
      }
    },
    //领红包
    getReward(item) {
      this.$ajax(
        {
          url: "/acs/activityCenter/saveRegisterAward",
          data: {
            params: {
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            this.isOpen = true;
            this.chImg();
          }
          setTimeout(() => {
            this.isClick = true;
          }, 300);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => {
            this.isClick = true;
          }, 300);
        });
    },
    closeMyself() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
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
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  .modal {
    width: 2.996255rem;
    height: 3.835206rem;
    border-radius: 0.059925rem;
    animation: Scale 0.8s ease;
    position: relative;
    img {
      width: 100%;
    }
  }
}
@keyframes Scale {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}
</style>
