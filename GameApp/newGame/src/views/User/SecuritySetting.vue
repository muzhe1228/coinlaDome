<template>
  <div class="wrapper">
    <LeftNav/>
    <div class="superDiv">
      <div class="SecurityContent">
        <p class="title">验证设置</p>
        <div class="whiteContent">
          <span class="leftTitle">账号</span>
          <div class="right">
            <span class="value unclick">{{HiddenPhoneNum(data.mobile)}}</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="blackContent" @click="ClickSetting(1)">
          <span class="leftTitle">提现验证</span>
          <div class="right">
            <span class="value">已开启</span>
            <i class="iconfont">&#xe621;</i>
          </div>
        </div>
      </div>

      <div class="SecurityContent">
        <p class="title">密码设置</p>
        <div class="whiteContent" @click="ClickSetting(2)">
          <span class="leftTitle">登陆密码</span>
          <div class="right">
            <span class="value">修改</span>
            <i class="iconfont">&#xe621;</i>
          </div>
          <div class="line"></div>
        </div>
        <div class="blackContent" @click="ClickSetting(3)">
          <span class="leftTitle">资金密码</span>
          <div class="right">
            <span class="value">{{isAssetsPassword===1?"去设置":"修改"}}</span>
            <i class="iconfont">&#xe621;</i>
          </div>
        </div>
      </div>
    </div>

    <TiXianCodeAlert ref="SetTiXian" :mobile="data.mobile"></TiXianCodeAlert>
    <ResetLoginPasswordAlert ref="SetLoginPsd" :mobile="data.mobile"></ResetLoginPasswordAlert>
    <ResetMoneyPasswordAlert
      ref="SetMoneyPsd"
      :mobile="data.mobile"
      :PageType="data.isAssetsPassword"
      @reload="LoadSettingState"
    ></ResetMoneyPasswordAlert>
  </div>
</template>

<script>
import LeftNav from "components/LeftNav";
import TiXianCodeAlert from "./SafeSettingAlert/TiXianCodeAlert";
import ResetLoginPasswordAlert from "./SafeSettingAlert/ResetLoginPasswordAlert";
import ResetMoneyPasswordAlert from "./SafeSettingAlert/ResetMoneyPasswordAlert";
import { isPhone,isEmail } from "common/func"
export default {
  data() {
    return {
      isAssetsPassword: 1, // 0设置过资金密码 1没有设置过资金密码
      data: "" // 安全设置所请求到的数据
    };
  },
  created() {},
  mounted() {
    this.LoadSettingState();
    console.log(this.$lStore.get("Token"));
  },

  components: {
    LeftNav,
    ResetLoginPasswordAlert,
    TiXianCodeAlert,
    ResetMoneyPasswordAlert
  },
  methods: {
    //点击出现弹窗
    ClickSetting(value) {
      if (value == 1) {
        this.$refs.SetTiXian.show();
      } else if (value === 2) {
        this.$refs.SetLoginPsd.show();
      } else {
        this.$refs.SetMoneyPsd.show();
      }
    },
    //加载安全设置状态
    LoadSettingState() {
      this.$ajax(
        {
          url: "/uac/user/selectUserSetting",
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
            this.isAssetsPassword = res.data.isAssetsPassword;
            this.data = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //隐藏手机号
    HiddenPhoneNum(accountNumber) {
      if (accountNumber) {
        var reg;
        if (isPhone(accountNumber)){
          var reg = /^(\d{3})\d{4}(\d{4})$/;   //手机号变星号
        } else {
          var reg = /(.{2}).+(.{2}@.+)/g; //邮箱变星号
        }
        var tel = accountNumber;
        tel = tel.replace(reg, "$1****$2");
        return tel;
      }
    },
  }
};
</script>

<style scoped lang="stylus">
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  .superDiv {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    .SecurityContent {
      width: 100%;
      /* height:137px; */
      padding-left: 0.16rem;
      padding-right: 0.16rem;
      padding-top: 17.800022px;
      font-family: PingFang-SC-Medium;
      font-size: 0.209738rem;
      color: #ffffff;
      /* 区块标题 */
      .title {
        line-height: 0.533333rem;
        text-align: left;
        color: #acb3e2;
        background-color: #303769;
        padding-left: 0.213333rem;
        border-top-left-radius: 0.08rem;
        border-top-right-radius: 0.08rem;
      }
      /* 不带黑色蒙版的背景 */
      .whiteContent {
        height: 0.838951rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #363e76;
        position: relative;
        .leftTitle {
          padding-left: 0.213333rem;
        }
        .right {
          font-size: 0.209738rem;
          padding-right: 0.213333rem;
          span {
            padding-right: 0.133333rem;
          }
          i {
            font-size: 0.209738rem;
          }
          .unclick {
            color: #acb3e2;
          }
        }
        .line {
          position: absolute;
          bottom:0;
          left :2.5%;
          width: 95%;
          height: 0.014981rem;
          background-color: #282d57;
        }
      }
      /* 带黑色蒙版的背景 */
      .blackContent {
        justify-content: space-between;
        height: 0.838951rem;
        display: flex;
        align-items: center;
        background-color: #363e76;
        border-bottom-left-radius: 0.08rem;
        border-bottom-right-radius: 0.08rem;
        .leftTitle {
          padding-left: 0.213333rem;
        }
        .right {
          font-size: 0.209738rem;
          padding-right: 0.213333rem;
          span {
            padding-right: 0.133333rem;
          }
          i {
            font-size: 0.209738rem;
          }
          .unclick {
            color: #acb3e2;
          }
        }
      }
    }
  }
}
</style>
