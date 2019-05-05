<template>
  <div class="wrapper">
    <LeftNav/>
    <div class="wrap">
      <div class="contentDiv">
        <ScrollH :data="msgList" pullup @scrollToEnd="getMsgList">
          <ul
            class="wrap_info"
            v-for="item in msgList"
            :key="item.messageId"
            @click="showDetail(item)"
          >
            <li class="wrap_info_l">
              <!-- <p class="avatar">
                <img src="~assets/Images/test/a4.jpg" alt>
              </p>-->
              <p class="size">
                <span class="title">{{item.title}}</span>
                <span class="intor">{{ReplaceBR(item.content)}}</span>
              </p>
            </li>
            <li class="wrap_info_r">
              <p v-if="!item.isRead" class="sdot"></p>
              <p class="time">{{item.createDate | dateFormat("MM-dd hh:mm")}}</p>
              <p class="Icon">
                <i class="iconfont">&#xe621;</i>
              </p>
            </li>
          </ul>
        </ScrollH>
      </div>
    </div>
    <MsgDetail v-if="show" @close="close" :Detail="Detail"></MsgDetail>
  </div>
</template>

<script>
import LeftNav from "components/LeftNav";
import ScrollH from "components/ScrollH";
import MsgDetail from "components/Modal/userModal/msgDetail";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      msgList: [],
      Detail: {},
      show: false,
      page: 1,
      size: 20,
      canLoadData: true //是否能加载数据
    };
  },
  mounted() {
    this.getMsgList();
  },
  components: { LeftNav, ScrollH, MsgDetail },
  methods: {
    showDetail(data) {
      this.$clickAudio();
      this.Detail = data;
      this.show = true;

      //本地改变已读状态
      var index = this.GetIndexAtArray(this.msgList, data);
      var object = data;
      object.isRead = 1;
      var array = this.msgList;
      array.splice(index, 1, object);
      //服务器改变已读状态
      this.ChangeRead(data.messageId);
    },
    close() {
      this.$clickAudio();
      this.show = false;
    },

    GetIndexAtArray(arrays, obj) {
      var i = arrays.length;
      while (i--) {
        if (arrays[i] === obj) {
          return i;
        }
      }
      return false;
    },

    ChangeRead(id) {
      this.$ajax(
        {
          url: "/mcs/message/updateMessageStatus",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              ids: id
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            this.LookForUnRead();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询红点
    LookForUnRead() {
      this.$ajax(
        {
          url: "/mcs/message/selectMessageRedDot",
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
            this.updateMessageUnRead(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //加载数据
    getMsgList(page) {
      
      let _this = this;
      if (!this.canLoadData) {
        return;
      }
      this.canLoadData = false;
      this.$ajax(
        {
          url: "/mcs/message/selectMessageList",
          data: {
            params: {
              token: _this.$lStore.get("Token"),
              size: _this.size,
              page: _this.page
            }
          }
        },
        true
      )
        .then(res => {
          _this.canLoadData = true;
          if (res.code === 0) {
            console.log(res.data.list);
            if (res.data.list.length === 0 && _this.page === 1) {
              _this.msgList = [];
              _this.$toast("暂无数据");
            } else if (res.data.list.length > 0) {
              _this.msgList = _this.msgList.concat(res.data.list);
              _this.page = _this.page + 1;
            } else {
              _this.$toast("已加载全部数据");
            }
          }
        })
        .catch(err => {
          _this.canLoadData = true;
          console.log(err);
        });
    },
    ReplaceBR(string) {
      return string.replace(/<br\/>/g, "");
    },
    ...mapActions(["updateMessageUnRead"])
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.wrapper {
  height: calc(100% - 0.599251rem);
  width: 100%;
  display: flex;
  .wrap {
    flex: 1;
    padding: 0.149813rem;
    height: 100%;
    width: 100%;
    .contentDiv {
      height: 100%;
      width: 100%;
      border-radius: 0.059925rem;
      overflow: hidden;
      .wrap_info {
        &:nth-child(odd) {
          background-color: #303769;
        }
        &:nth-child(even) {
          background-color: #363e76;
        }
        &:last-child {
          border-bottom-left-radius: 0.059925rem;
          border-bottom-right-radius: 0.059925rem;
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.359551rem;
        height: 0.898876rem;
        width: 100%;
        .wrap_info_l {
          display: flex;
          align-items: center;
          .size {
            display: flex;
            flex-direction: column;
            .title {
              font-size: 0.209738rem;
              color: #fff;
              line-height: 0.299625rem;
            }
            .intor {
              font-size: 0.179775rem;
              color: #acb3e2;
              line-height: 0.299625rem;
            }
          }
        }
        .wrap_info_r {
          display: flex;
          align-items: center;
          .sdot {
            background-color: #f93434;
            width: 0.089888rem;
            height: 0.089888rem;
            border-radius: 50%;
            margin-right: 0.11985rem;
          }
          .time {
            color: #fff;
            font-size: 0.209738rem;
            margin-right: 0.11985rem;
          }
          .Icon {
            font-size: 0.209738rem;
            .iconfont {
              color: #acb3e2;
            }
          }
        }
      }
    }
  }
}
</style>