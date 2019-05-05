<template>
  <div class="wrapper">
    <LeftNav/>
    <div class="wrap">
      <div class="avatar" @click="ClickHead">
        <input type="file" name="head" class="HeadInput" @change="GetPicture" accept="image/*">
        <img v-if="userInfo.head" :src="userInfo.head" alt id="headImg">
        <img v-else src="~assets/Images/PersonalPage/default_headimage@3x.png" alt id="headImg">
      </div>
      <p class="nickName">
        <Inp
          label="昵称"
          labelColor="color:#acb3e2"
          disabled
          name="nick"
          :Val="userInfo.nick"
          type="text"
          @Change="InpChange"
          class="inp"
        />
        <img src="~assets/Images/PersonalPage/icon_revise@3x.png" @click="showEdit">
      </p>
      <!-- <uploadImg></uploadImg> -->
      <p class="account">
        <Inp
          label="账号"
          labelColor="color:#acb3e2"
          disabled
          name="mobile"
          :Val="HiddenPhoneNum(userInfo.mobile)"
          type="text"
          @Change="InpChange"
          class="inp"
        />
      </p>

      <p class="loginOut" @click="LoginOut">退出登录</p>
    </div>
    <editNick ref="editNick" :nick="userInfo.nick"></editNick>
  </div>
</template>

<script>
import LeftNav from "components/LeftNav";
import Inp from "components/Modal/loginReg/Inp";
import editNick from "components/Modal/userModal/editNick";
import axios from "axios";
import ENV from "common/Api/ENV";
import store from "../../Store";
import uploadImg from "components/uploadImg";
import { mapState, mapActions } from "vuex";
import Exif from "exif-js";
import { isPhone,isEmail } from "common/func"
export default {
  data() {
    return {
      nick: "",
      mobile: "",
      ENV: ENV.getENV(),
      headerImage: "",
      picValue: ""
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  components: { LeftNav, Inp, editNick,uploadImg },
  mounted() {
    // this.GetPictureSeverURL();
  },
  methods: {
    changeText(va){
      this.$changeInput(va);
    },
    ClickHead() {
      this.$clickAudio();
    },
    InpChange(val, name) {
      this[name] = val;
    },
    showEdit() {
      // if (isIos()) {
      //   window.webkit.messageHandlers.NativeMethod.postMessage("backHome://"+window.location.href);
      // } else {
      //   window.openApp.backHome(window.location.href);
      // }
      this.$refs.editNick.show();
    },

    // base64转文件
    dataURItoBlob: function(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },

    // //获取图片
    // GetPicture(event) {
    //   console.log(event.target.files);
    //   let image = event.target.files[0];

    //   let form = new FormData();
    //   form.append("file", image);
    //   var newsrc = this.getObjectURL(image);
    //   document.getElementById("headImg").src = newsrc;
    //   this.UpLoadFile(form);
    //   },

    //获取图片地址
    getObjectURL(file) {
      var url = null;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //上传图片
    UpLoadFile(file) {
      axios({
        url: "/uac/upload/uploadImages",
        method: "post",
        baseURL: this.ENV.httpApi,
        timeout: 50000,
        data: file
      })
        .then(res => {
          console.log(res.data.data);
          if (res.data.code == 0) {
            this.UploadHeadImage(res.data.data);
          } else {
            this.$toast(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast("上传图片失败");
        });
    },
    //将头像地址上传到服务器
    UploadHeadImage(url) {
      this.$ajax(
        {
          url: "/uac/user/updateHead",
          data: {
            params: {
              token: this.$lStore.get("Token"),
              head: url
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            console.log(res.data);
            this.$toast("修改头像成功");
            this.newGetUserInfo();
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
    //退出登录
    LoginOut() {
      this.$clickAudio();
      this.$ajax(
        {
          url: "/uac/user/outLogin",
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
            this.$lStore.remove("Token");

            store.commit("SET_USERINFO", "");
            store.commit("SET_TOKEN", "");
            store.commit("SET_PKNUM", 0);
            store.commit("SET_ALLPKNUM", 0);
            this.$router.push('/index');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取图片
    GetPicture(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var newsrc = this.getObjectURL(e.target.files[0]);
      document.getElementById("headImg").src = newsrc;

      this.picValue = files[0];
      this.imgPreview(this.picValue);
    },

    imgPreview(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage = data;
              self.postImg();
            };
          }
        };
      }
    },
    postImg() {
      //这里写接口
      let form = new FormData();
      form.append("file", this.dataURItoBlob(this.headerImage));
      this.UpLoadFile(form);
    },
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },

    ...mapActions(["newGetUserInfo"])
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  .wrap {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.539326rem;
    .avatar {
      width: 2.097378rem;
      height: 2.097378rem;
      border-radius: 1.198502rem;
      overflow: hidden;
      // border: 0.299626rem solid transparent;
      position: relative;
      background: url('../../assets/Images/PersonalPage/userinfo_bg_head@3x.png') 0 0 / 100% 100% no-repeat !important;
      .HeadInput {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        opacity: 0;
        z-index: 2;
      }
      img {
        width: 80%;
        height: 80%;
        border-radius: 50%;
        position: absolute;
        left: 10%;
        top: 10%;
      }
    }
    .nickName {
      position: relative;
      img {
        position: absolute;
        width: 0.2397rem;
        right: 0.179775rem;
        bottom: 17%;
        color: #fff;
      }
    }
    .nickName,.account{
      width :3.655431rem;
    }
    .loginOut {
      margin-top: 0.269663rem;
      color: #a1a8d6;
      // text-shadow :#02093b 0.5px 1.5px;
      font-size: 0.209738rem;
      text-decoration: underline;
    }
    .inp{
      background :#363e76;
      border-radius:0.059925rem;
    }
  }
}
</style>
