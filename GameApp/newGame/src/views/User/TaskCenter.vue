<template>
  <div class="wrapper">
    <LeftNav/>
    <div class="wrap">
      <!-- 限时任务 -->
      <div class="task_div">
        <p class="title">限时任务</p>
        <ul>
          <li v-for="(item) in task" :key="item.atId">
            <div class="li-div">
              <div class="center-l">
                <img class="iconGlup" :src="getPic(item)" alt>
                <p class="Size">
                  <span class="Size-title">{{item.activeName}}</span>
                  <span class="Size-info">{{getInfoStr(item)}}</span>
                </p>
              </div>
              <div class="center-r">
                <transition name="testfade">
                  <p v-if="showSignSuccess === 1 && item.atId === 2" class="sign_success">领取成功 +{{signPkNum}}PK</p>
                </transition>
                <div
                  :class="addName(item.atId, item.status)"
                  @click="handToActive(item)"
                >{{typeSize(item.status, item.atId)}}</div>
              </div>
            </div>
            <div class="line"></div>
          </li>
        </ul>
      </div>
      <!-- 新手任务 -->
      <div class="task_div">
        <p class="title">新手任务</p>
        <ul>
          <li v-for="(item) in task1" :key="item.atId">
            <div class="li-div">
              <div class="center-l">
                <img class="iconGlup" :src="getPic(item)" alt>
                <p class="Size">
                  <span class="Size-title">{{item.activeName}}</span>
                  <span class="Size-info">{{getInfoStr(item)}}</span>
                </p>
              </div>

              <div class="center-r">
                <div
                  :class="addName(item.atId, item.status)"
                  @click="handToActive(item)"
                >{{typeSize(item.status, item.atId)}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from "components/LeftNav";
import iconLogin from "../../assets/Images/icon_personal_login.png";
import iconInvite from "../../assets/Images/icon_personal_friend.png";
import iconRegister from "../../assets/Images/icon_personal_regist.png";

export default {
  data() {
    return {
      task: [],
      task1: [],
      showSignSuccess: 0,
      signPkNum: 0
    };
  },

  mounted() {
    this.getTaskList();
  },

  components: { LeftNav },
  methods: {
    getTaskList() {
      this.$ajax(
        {
          url: "/acs/activityCenter/selectActivityList",
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
            console.log(res.data);
            const tmpTask = [];
            const tmpTask1 = [];
            res.data.map(item => {
              return item.activeType.code === 3
                ? tmpTask.push(item)
                : tmpTask1.push(item);
            });
            this.task = tmpTask;
            this.task1 = tmpTask1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //领取登录奖励
    saveEverydayLogin() {
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
            console.log(res.data);
            //领取成功之后弹窗
            this.showSignSuccess = 1;
            this.signPkNum = res.data;
            setInterval(() => {
              this.showSignSuccess = 0;
            }, 500);
            this.getTaskList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handToActive(ItemData) {
      this.$clickAudio();
      if (ItemData.atId === 2) {
        //去领取
        if (ItemData.status === 1) {
          this.saveEverydayLogin();
        }
      } else if (ItemData.atId === 3) {
        //去邀请
        this.toPage("/invite");
      }
    },

    //跳转邀请
    toPage(url) {
      this.$router.push(url);
    },

    getPic(ItemData) {
      if (ItemData.atId === 2) {
        //每日登录
        return iconLogin;
      } else if (ItemData.atId === 3) {
        //邀请好友
        return iconInvite;
      } else if (ItemData.atId === 1) {
        //注册
        return iconRegister;
      }
    },

    getInfoStr(itemData) {
      let activeDetail = itemData.activeDetail;
      console.log("activeDetail:" + activeDetail);
      if (activeDetail.indexOf("*") > -1) {
        return itemData.activeDetail.replace("*", itemData.awardNumber) + "PK";
      } else {
        return itemData.activeDetail;
      }
    },

    typeSize(status, taskId) {
      if (status === 0) {
        return taskId === 2 ? "已领取" : "已完成";
      } else if (status === 1) {
        if (taskId === 2) {
          return "领取";
        } else if (taskId === 1) {
          return "未发送";
        } else {
          return "去邀请";
        }
      } else if (status === 2) {
        return "进行中";
      } else if (status === 3) {
        return "去参与";
      }
    },

    addName(taskId, status) {
      console.log("status:" + status + "--taskId:" + taskId);
      if (taskId === 1) {
        return "";
      } else {
        return status ? "notOver" : "";
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  .testfade-enter-active, .testfade-leave-active {
    // 动画离开过程：0.5s
    transition: all 0.2s;
  }
  .testfade-enter {
    transform: translateY(100%);
  }
  .testfade-leave-active {
    transform: translateY(-100%);
    opacity: 0;
  }
  .wrap {
    flex: 1;
    .task_div {
      padding-top: 0.209738rem;
      padding-bottom: 0.209738rem;
      margin: 0 0.266667rem;
      .title {
        width: 100%;
        background-color: #303769;
        border-radius: 0.089888rem 0.089888rem 0 0;
        color: #acb3e2;
        line-height: 0.599251rem;
        padding: 0 0.209738rem;
        font-size: 0.209738rem;
      }
      ul {
        li {
          background :#363e76;
          .li-div {
            height: 1.078652rem;
            width: 100%;
            background-color: #363e76;
            padding: 0.2397rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .center-l {
              display: flex;
              .iconGlup {
                padding-right: 0.2397rem;
                height: 0.586667rem;
              }
              .Size {
                display: flex;
                flex-direction: column;
                line-height: 0.2397rem;
                justify-content: space-between;
                .Size-title {
                  color: $colorY1;
                  font-size: 0.209738rem;
                }
                .Size-info {
                  color: #acb3e2;
                  font-size: 0.194757rem;
                }
              }
            }
            .center-r {
              height: 0.449438rem;
              width: 1.168539rem;
              line-height: 0.449438rem;
              // border-radius: 0.179775rem;
              font-size: 0.209738rem;
              color: #acb3e2;
              text-align: center;
              position: relative;
              background: url('../../assets/Images/task_center_down.png') 0 0 / 100% 100% no-repeat;
              .sign_success {
                font-size: 0.209738rem;
                color: #ffe069;
                position: absolute;
                top: -0.314606rem;
                right: 0;
                width: 1.872659rem;
              }
              .notOver {
                color: #7f500e;
                background: url('../../assets/Images/task_center_undown.png') 0 0 / 100% 100% no-repeat;
              }
            }
          }
          .line{
            width :95%;
            height :0.014981rem;
            margin-left :2.5%;
            padding-right :2.5%;
            background-color :#282d57;
          }
          &:last-child{
            .line{
              display:none;
            }
          }
        }
      }
    }
  }
}
</style>
