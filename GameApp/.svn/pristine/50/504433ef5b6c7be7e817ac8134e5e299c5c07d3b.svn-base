<template>
  <transition name="dialog">
    <div v-if="isShow" class="dialog" @click="close">
      <div class="modal" @click.stop :style="styls">
        <div class="modal-head">
          <p class="title">{{titleName}}</p>
          <!-- <p class="close animated" @click="close">
            <i class="iconfont">&#xe619;</i>
          </p> -->
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      required: true
    },
    styls: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  components: {},
  methods: {
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
  background-color: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal {
    background-color: #2e2e33;
    border-radius: 0.059925rem;
    animation: Scale 0.8s ease;
    color: #fff;
    font-size: 0.194757rem;
    padding: 0 0.2397rem;
    position: relative;
    &-head {
      height: 0.599251rem;
      width: 100%;
      border-bottom: 0.014981rem solid $bgMain;
      color: $colorMain;
      text-align: center;
      font-size: 0.209738rem;
      .title {
        line-height: 0.599251rem;
      }
      .close {
        position: absolute;
        right: 0.149813rem;
        top: -0.359551rem;
        cursor: pointer;
        /* animation: zoomIn 1s infinite alternate; */
        .iconfont {
          color: #fff;
          font-size: 0.2397rem;
        }
      }
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
