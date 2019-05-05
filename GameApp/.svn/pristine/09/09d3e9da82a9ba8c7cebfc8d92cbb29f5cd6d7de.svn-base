<template>
  <div class="content">
    <div class="show-info">
      <div class="Cropper_wrap">
        <vueCropper
          ref="cropper2"
          :img="example2.img "
          :outputSize="example2.size"
          :info="example2.info"
          :canScale="example2.canScale"
          :autoCrop="example2.autoCrop"
          :autoCropWidth="example2.autoCropWidth"
          :autoCropHeight="example2.autoCropHeight"
          :fixedBox="example2.fixedBox"
        ></vueCropper>
      </div>
      <label class="btn" for="upload2">上传</label>
      <input
        type="file"
        id="upload2"
        style="position:absolute; clip:rect(0 0 0 0);"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event,2)"
      >
      <button @click="finish2()" class="btn">裁剪</button>
    </div>
  </div>
</template>
 
<script>
import { VueCropper } from "vue-cropper";
//记得导入code文件
import codes from "./code";
export default {
  data: function() {
    return {
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
      form: {
        head: ""
      },
      example2: {
        //img的路径自行修改
        img: "",
        info: true,
        size: 0.6,
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: "188px",
        autoCropHeight: "188px",
        // 真实的输出宽高
        infoTrue: true,
        fixedBox: true
      }
    };
  },
  methods: {
    //点击裁剪，这一步是可以拿到处理后的地址
    finish2() {
      this.$refs.cropper2.getCropData(data => {
        this.modelSrc = data;
        this.model = false;
        //裁剪后的图片显示
        this.example2.img = this.modelSrc;

        console.log(this.modelSrc);
      });
    },

    uploadImg(e, num) {
      //上传图片
      this.example2.img = "";
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$toast("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        data = e.target.result;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blobcs
      reader.readAsArrayBuffer(file);
    }
  },
  components: {
    VueCropper,
    codes
  }
};
</script>
 
<style>
.content {
  margin: auto;
  width: 100%;
  height: 100vh;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}


.Cropper_wrap {
  height: 60vh;
}
.cropper-box-canvas img {
  max-width: 100%;
}
.cropper-crop-box {
  border-radius: 50%;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@media screen and (max-width: 1000px) {
  .content {
    max-width: 90%;
    margin: auto;
  }

  .test {
    height: 400px;
  }
}
</style>