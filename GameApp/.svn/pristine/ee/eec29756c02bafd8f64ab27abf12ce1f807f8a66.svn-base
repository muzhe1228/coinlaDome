<template>
  <transition name="dialog">
    <div class="dialog">
      <div class="modal" @click.stop>
        <div class="modal-head">
          <img class="title_img" src="~assets/Images/signnew/sign_title@3x.png">
        </div>

        <div class="modal-content">
          <div class="progress_div">
            <p class="pro_tip">累计签到奖励</p>

            <div class="top_progress">
              <div class="pro_img" ref="progressAmit">
                <div class="progressGroup" v-bind:style="{transform:progressClass(numTemp/7)}">
                  <p class="main_progress"></p>
                </div>
              </div>
              <div class="pro_bets">
                <div class="pro_commen2">
                  <img class="progress_coins2" src="~assets/Images/signnew/coin_pro@3x.png">
                  <p class="progress_pk2">{{sginList[1]["pkNum"]}}PK</p>
                  <p class="progress_days2">2天</p>
                </div>
                <div class="pro_commen3">
                  <img class="progress_coins3" src="~assets/Images/signnew/coin_pro@3x.png">
                  <p class="progress_pk3">{{sginList[4]["pkNum"]}}PK</p>
                  <p class="progress_days3">5天</p>
                </div>
                <div class="pro_commen4">
                  <img class="progress_coins4" src="~assets/Images/signnew/box_small@3x.png">
                  <p class="progress_pk4">{{sginList[6]["pkNum"]}}PK</p>
                  <p class="progress_days4">7天</p>
                </div>
              </div>
            </div>
          </div>

          <div class="middle_date">
            <ul class="date_top">
              <li class="day_one_three" v-for="(item,index) in dateList1" :key="item.id">
                <div class="item_div">
                  <div class="item_sign">
                    <p class="day_title">{{item.daysNumber}}</p>
                    <div class="day_content">
                      <img
                        v-if="index == 5 | index== 6"
                        class="coins_img_box"
                        src="~assets/Images/signnew/box_big@3x.png"
                      >
                      <img v-else class="coins_img" src="~assets/Images/signnew/coins@3x.png">
                      <div class="pk_num_div">
                        <img class="pk_num_img" src="~assets/Images/signnew/coin_pk@3x.png">
                        <p class="pk_num">{{item.pkNum}}</p>
                      </div>
                    </div>
                  </div>
                  <div v-if="item.id < numTemp" class="sign_done">
                    <img class="sign_done_img" src="~assets/Images/signnew/sign_done@3x.png">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-bottom">
          <div class="bottom_btn">
            <img class="sign_img" src="~assets/Images/signnew/btn_sign@3x.png" @click.stop="toSign">
          </div>
        </div>
      </div>
      <div v-if="showSuccess" class="dialog_success">
        <div class="dialog_success_content">
          <img class="dialog_success_title" src="~assets/Images/signnew/sign_head@3x.png">
          <div class="dialog_success_award_pk">
            <div class="coin_bg">
              <img class="success_coins" src="~assets/Images/signnew/coins@3x.png">
            </div>
            <p class="success_number">+{{signSuccessPkNum}}PK</p>
          </div>
        </div>
        <img
          class="dialog_success_ok"
          src="~assets/Images/signnew/btn_sure@3x.png"
          @click.stop="closeMyself()"
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      enableClose: false,
      numTemp: 0,
      dateList1: [],
      // dateList2: [],
      // sevenDay: {},
      signSuccessPkNum: 0,
      showSuccess: false
    };
  },
  props: {
    signNum: {
      type: Number
    },
    sginList: {
      type: Array
    }
  },
  components: {},
  mounted() {
    this.numTemp = this.signNum;
    //循环遍历对象
    for (var i = 0; i < this.sginList.length; i++) {
      //往数组里压入遍历好的对象
      this.dateList1.push({
        id: i,
        daysNumber: this.sginList[i]["daysNumber"],
        pkNum: this.sginList[i]["pkNum"]
      });
    }
  },
  methods: {
    closeMyself() {
      this.showSuccess = false;
      if (this.enableClose) {
        this.$emit("close");
      }
    },
    selectDay(item) {},
    toSign() {
      this.$clickAudio();
      this.$ajax(
        {
          url: "/acs/activityCenter/saveEverydayLogin",
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
            this.numTemp = this.numTemp + 1;
            this.signSuccessPkNum = res.data;
            this.showSuccess = true;
            this.enableClose = true;
          }
        })
        .catch(err => {
          if (err.data.code === 10010002 || err.data.code === 10010003) {
            this.enableClose = true;
            this.closeMyself();
          }
          console.log(err);
        });
    },
    progressClass() {
      let X = (this.numTemp / 7) * 100;
      if (X > 1) {
        return `translateX(${X - 100}%)`;
      } else {
        return `translateX(-96%)`;
      }
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
    width: 7.191011rem;
    // height: 3.835206rem;
    border-radius: 0.059925rem;
    animation: Scale 0.8s ease;
    position: relative;
    z-index: 3;
    &-head {
      height: 0.539326rem;
      width: 100%;
      display: flex;
      position: relative;
      justify-content: center;
      background: url('../../assets/Images/signnew/top@3x.png') 0 0 / 100% 100% no-repeat;
      .title_img {
        position: absolute;
        height: 0.569288rem;
        top: -0.224719rem;
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0.164794rem;
      background-color: #26264a;
      // height: 2.951311rem;
      width: 100%;
      position: relative;
      .progress_div {
        display: flex;
        color: #c6bff3;
        height: 0.749064rem;
        width: 100%;
        align-items: center;
        background-color: #3c3c6e;
        border: 1px solid #3c3c6e;
        border-radius: 0.059925rem;
        padding: 0 0.11985rem;
        margin-top: 0.374532rem;
        .pro_tip {
          font-size: 0.209738rem;
          line-height: 0.719101rem;
        }
        .top_progress {
          width: 4.853933rem;
          margin-left: 0.149813rem;
          flex-direction: column;
          height: 0.82397rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          .pro_img {
            position: relative;
            height: 0.179775rem;
            width: 100%;
            background-color: #29224c;
            border-radius: 0.374531rem;
            border-color: #29224c;
            overflow: hidden;
            z-index: 1;
            .progressGroup {
              overflow: hidden;
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              transform: translateX(-100%);
              transition: all 2s ease;
              display: flex;
              align-items: center;
              .main_progress {
                width: 100%;
                height: 0.149813rem;
                background-color: #a9b1ee;
                border-radius: 0.374531rem;
                border-color: #a9b1ee;
              }
            }
            /* 鼠标滑过 */
            .image-light:hover:after {
              -webkit-transition: left 1s ease-in-out;
              /* 过渡 */
              transition: left 1s ease-in-out;
              left: 500px;
              /* 结束位置 */
            }
          }
          .pro_bets {
            height: 1.078652rem;
            width: 100%;
            position: absolute;
            left: 0;
            top: -0.209738rem;
            z-index: 2;
            display: flex;
            align-items: center;
            .pro_commen2 {
              display: flex;
              flex-direction: column;
              font-size: 0.179775rem;
              height: 0.749064rem;
              justify-content: center;
              align-items: center;
              .progress_coins2 {
                height: 0.524345rem;
                width: 0.449439rem;
                position: absolute;
                left: 1.378277rem;
              }
              .progress_pk2 {
                position: absolute;
                left: 1.378277rem;
                top: 0.014982rem;
                color: #fbce85;
              }
              .progress_days2 {
                position: absolute;
                bottom: 0.149813rem;
                left: 1.423221rem;
              }
            }
            .pro_commen3 {
              display: flex;
              flex-direction: column;
              font-size: 0.179775rem;
              height: 0.749064rem;
              justify-content: center;
              align-items: center;
              .progress_coins3 {
                height: 0.524345rem;
                width: 0.449439rem;
                position: absolute;
                left: 3.445693rem;
              }
              .progress_pk3 {
                position: absolute;
                top: 0.014982rem;
                left: 3.445693rem;
                color: #fbce85;
              }
              .progress_days3 {
                position: absolute;
                bottom: 0.149813rem;
                left: 3.475656rem;
              }
            }
            .pro_commen4 {
              display: flex;
              flex-direction: column;
              font-size: 0.179775rem;
              height: 0.749064rem;
              justify-content: center;
              align-items: center;
              .progress_coins4 {
                width: 0.524345rem;
                height: 0.524345rem;
                position: absolute;
                right: 0;
              }
              .progress_pk4 {
                position: absolute;
                top: 0.014982rem;
                right: 0.029963rem;
                color: #fbce85;
              }
              .progress_days4 {
                position: absolute;
                bottom: 0.149813rem;
                right: 0.104869rem;
              }
            }
          }
        }
      }
      .middle_date {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.827715rem;
        width: 100%;
        margin-top: 0.044943rem;
        position: relative;
        .item_div {
          width: 0.898876rem;
          height: 1.677903rem;
          position: relative;
          .sign_done {
            width: 0.928839rem;
            height: 1.677903rem;
            align-items: center;
            justify-content: center;
            display: flex;
            background-color: #26264a95;
            border: 0.014981rem solid #26264a95;
            border-radius: 0.059925rem;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            .sign_done_img {
              width: 0.479401rem;
              height: 0.479401rem;
            }
          }
          .item_sign {
            display: flex;
            flex-direction: column;
            width: 0.928839rem;
            height: 1.677903rem;
            align-items: center;
            position: relative;
            z-index: 1;
            background: url('../../assets/Images/signnew/day@3x.png') 0 0 / 100% 100% no-repeat;
            .day_title {
              height: 0.269663rem;
              width: 100%;
              color: #c6bff3;
              font-size: 0.179775rem;
              // background-color: #434B9C;
              // border-top: 0.014981rem solid #434B9C;
              // border-top-left-radius: 0.059925rem;
              // border-top-right-radius: 0.059925rem;
              text-align: center;
              // font-weight: bold;
              // text-shadow: 0.014981rem 0.014981rem #bf8464;
              position: absolute;
              top: 0.029963rem;
            }
            .day_content {
              flex: 1;
              position: relative;
              justify-content: center;
              display: flex;
              flex-direction: column;
              // background-color: #f8e2cd;
              align-items: center;
              width: 100%;
              // border-bottom: 0.014981rem solid #f8e2cd;
              // border-bottom-left-radius: 0.059925rem;
              // border-bottom-right-radius: 0.059925rem;
              .coins_img {
                width: 0.823971rem;
                height: 0.823971rem;
              }
              .coins_img_box {
                width: 0.823971rem;
                height: 0.823971rem;
              }
              .pk_num_div {
                display: flex;
                background-color: #434b9c;
                border: 1px solid #434b9c;
                border-radius: 0.11985rem;
                padding: 0.029962rem;
                position: absolute;
                bottom: 0.059925rem;
                align-items: center;
                width: 90%;
                height: 0.2397rem;
                .pk_num_img {
                  width: 0.179775rem;
                  height: 0.179775rem;
                }
                .pk_num {
                  margin-left: 0.059925rem;
                  color: #fbce85;
                  font-size: 0.179775rem;
                  line-height: 0.2397rem;
                }
              }
            }
          }
        }
        .date_top {
          display: flex;
          justify-content: space-between;
          flex: 1;
          .day_one_three {
            display: flex;
          }
        }
      }
    }
    &-bottom {
      .bottom_btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.089888rem 0;
        background: url('../../assets/Images/signnew/bottom@3x.png') 0 0 / 100% 100% no-repeat;
        .sign_img {
          width: 1.558052rem;
          height: 0.599251rem;
        }
      }
    }
  }
  .dialog_success {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .dialog_success_content {
      background: url('../../assets/Images/signnew/bg_sign_success@3x.png') 0 0 / 100% 100% no-repeat;
      width: 5.872659rem;
      color: #975a36;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      justify-content: center;
      .dialog_success_title {
        position: absolute;
        width: 2.247191rem;
        top: -0.599251rem;
      }
      .dialog_success_award_pk {
        display: flex;
        // height: 0.479401rem;
        // width: 1.977528rem;
        justify-content: center;
        align-items: center;
        padding-top: 0.299625rem;
        padding-bottom: 0.299625rem;
        .coin_bg {
          background: url('../../assets/Images/signnew/bg_coin@3x.png') 0 0 / 100% 100% no-repeat;
          height: 0.749064rem;
          width: 0.749064rem;
          margin: 0.149813rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .success_coins {
            width: 0.674157rem;
            height: 0.674157rem;
          }
        }
        .success_number {
          margin-left: 0.074906rem;
          font-size: 0.299626rem;
          color: #fccf4e;
          font-weight: bold;
          text-shadow: 0.014981rem 0.014981rem #2f2579;
        }
      }
    }
    .dialog_success_ok {
      width: 1.558052rem;
      height: 0.599251rem;
      margin-top: 0.11985rem;
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
