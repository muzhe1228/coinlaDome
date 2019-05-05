<template>
  <div class="room">
    <div class="room_wrap">
      <div class="room_top">
        <roomLeft class="left active" name="十"/>
        <div class="right">
          <router-link
            v-for="item in tenList"
            :key="item.roomId"
            :to="`/my_bets?roomId=${item.roomId}`"
            target="_blank"
            class="toUrl"
          >
            <Room class="Item" :data="item"/>
          </router-link>
        </div>
      </div>
      <div class="room_bot">
        <roomLeft class="left"/>
        <div class="right">
          <router-link
            v-for="item in pingList"
            :key="item.roomId"
            :to="`/my_bets?roomId=${item.roomId}`"
            target="_blank"
            class="toUrl"
          >
            <Room class="active" :data="item"/>
          </router-link>
        </div>
      </div>
    </div>
    <div class="room_footer">
      <MsgSlider class="notice"></MsgSlider>
      <p class="footerBtn animated" @click="fastStart">快速开始</p>
    </div>
  </div>
</template>

<script>
import roomLeft from "components/NnRoom/RoomLeft";
import Room from "components/NnRoom/room";
import MsgSlider from "components/MsgSlider";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tenList: [],
      pingList: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this._initPage();
  },
  destroyed() {
    this.$EventListener.off("hxnnList", this.receiveSocketMessage);
    this.$EventListener.fire("sendMsgSocket", {
      userId: this.userInfo.userId,
      gameType: -1,
      roomId: -1,
      type: 0
    });
  },
  components: { roomLeft, Room, MsgSlider },
  methods: {
    _initPage() {
      this.sendSocket();
      this.$EventListener.on("hxnnList", this.receiveSocketMessage);
      this.getTenList();
      this.getPingList();
    },
    receiveSocketMessage(data) {
      if (data.socketType == 13) {
        //   {roomId: 房间id, peopleNumber: 人数, roomStatus: 房间状态, socketType: 13}
        if (data.roomId < 4) {
          this.handleSocketData(data, "pingList");
        } else {
          this.handleSocketData(data, "tenList");
        }
        console.log(data);
      }
    },
    //socket 数据处理
    handleSocketData(socketData, arrName) {
      let newPing = this[arrName].concat(),
        newItem = {};
      newPing.forEach((item, index) => {
        if (item.roomId == socketData.roomId) {
          item.peopleNumber = socketData.peopleNumber;
          item.roomStatus = socketData.roomStatus;
          newItem = item;
          this[arrName][index] = newPing;
        }
      });
    },
    //快速开始游戏
    fastStart() {
      this.$ajax(
        {
          url: "/hns/niuniu/selectRoom",
          data: {
            params: {
              token: this.$lStore.get("Token")
            }
          }
        },
        true
      ).then(res => {
        window.open(`/my_bets?roomId=${res.data.roomId}`);
      });
    },
    //获取十倍牛牛列表
    getTenList() {
      this.$ajax(
        {
          url: "/hns/niuniu/selectTenMultipleRoomList",
          data: {
            params: {
              page: 0,
              size: 3
            }
          }
        },
        true
      ).then(res => {
        this.tenList = res.data.list;
      });
    },
    //获取平倍牛牛列表
    getPingList() {
      this.$ajax(
        {
          url: "/hns/niuniu/selectFlatMultipleRoomList",
          data: {
            params: {
              page: 0,
              size: 3
            }
          }
        },
        true
      ).then(res => {
        this.pingList = res.data.list;
      });
    },
    sendSocket() {
      this.$EventListener.fire("sendMsgSocket", {
        userId: this.userInfo.userId,
        gameType: 0,
        roomId: 1,
        type: 0
      });
    }
  }
};
</script>

<style scoped lang="less">
.room {
  width: 100%;
  height: 100%;
  padding: 0 0.329588rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &_wrap {
    height: calc(~"100% - 0.898876rem");
  }
  &_top,
  &_bot {
    width: 10.187266rem;
    height: calc(~"50% - 0.449438rem");
    display: flex;
    justify-content: space-between;
    margin: 0.299625rem auto 0 auto;
  }
  .left {
    margin-right: 0.299625rem;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    .toUrl {
      display: block;
      width: calc(~"33.3% - 0.194757rem");
    }
  }
  &_footer {
    width: 10.187266rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.749064rem;
    .notice {
      flex: 1;
    }
    .footerBtn {
      margin-left: 0.599251rem;
      margin-right: 0.224719rem;
      width: 1.52809rem;
      height: 0.419476rem;
      line-height: 0.419476rem;
      border-radius: 0.209738rem;
      text-align: center;
      color: #fff;
      background-color: #ddaa36;
      font-size: 0.224719rem;
      transform-origin: center center;
      animation: wobble 3s 2s infinite;
    }
  }
}
</style>
