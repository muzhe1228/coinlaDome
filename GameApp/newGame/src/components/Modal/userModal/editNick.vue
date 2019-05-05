<template>
  <comModal ref="comm" :styls="styls" titleName="修改用户名">
    <div class="wrapper">
      <Inp
        class="nameInput"
        label="用户名"
        name="nickName"
        :Val="nickName"
        maxLeng="12"
        type="text"
        @Change="InpChange"
      ></Inp>
      <span class="getRandomName" @click="GetRadomName">切换</span>
      <Btn class="saveBtn" text="确定" @click.native="editHanle()"/>
    </div>
  </comModal>
</template>

<script>
import comModal from "../comModal";
import Inp from "../loginReg/Inp";
import Btn from "../loginReg/Btn";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    nick: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      styls: { height: "2.606742rem" },
      nickName: this.nick
    };
  },
  computed: {
    ...mapState(["token", "userInfo"])
  },
  mounted() {
    console.log(this.nick);
    // console.log(this.$refs.comm);
  },
  components: { comModal, Inp, Btn },
  methods: {
    InpChange(val, name) {
      this[name] = val;
    },
    show() {
      this.$refs.comm.show();
    },
    show() {
      this.$refs.comm.show();
    },
    GetRadomName() {
      this.$clickAudio();
      this.$ajax({
        url: "/uac/user/getRandomName",
        data: {
          params: {
            token: this.token
          }
        }
      })
        .then(res => {
          if (res.code === 0) {
            console.log(res.data);
            this.nickName = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editHanle() {
      if (this.userInfo.nick === this.nickName) {
        this.$toast("两次用户名不能一样！");
        return;
      }
      this.$ajax(
        {
          url: "/uac/user/updateNickName",
          data: {
            params: {
              token: this.token,
              nickName: this.nickName
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            this.$toast("修改成功");
            this.newGetUserInfo();
            this.$refs.comm.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions(["newGetUserInfo"])
  }
};
</script>

<style scoped lang="stylus">
.wrapper {
  position: relative;
  padding: 0 0.179775rem;
  .getRandomName {
    position: absolute;
    right: 0.269663rem;
    top: 0px;
    height: 0.479401rem;
    line-height: 0.479401rem;
    font-size: 0.194757rem;
  }
  .nameInput {
    margin-top:0.359551rem;
  }
  .saveBtn {
    margin-top:0.224719rem;
  }
}
</style>
