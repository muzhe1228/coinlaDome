import axios from "axios";
import $ from "jquery";
import store from "../../Store";
import { encryption, DecryptData, lStore } from "../func";
import ENV from "./ENV";
import router from "../../router";

const ajax = function(options, flag) {
  // console.log(Store.commit("SET_USERINFO", {}));
  let baseApi = ENV.getENV().httpApi,
    params = options.data ? options.data.params : "";
  if (flag) {
    params = encryption(options.data.params);
  }
  return new Promise((resolve, reject) => {
    (flag
      ? axios({
          headers: {
            "Content-Type": "application/json"
          },
          url: options.url,
          method: "post",
          baseURL: baseApi,
          timeout: 5000,
          data: params
        })
      : axios({
          headers: {
            "Content-Type": "application/json"
          },
          url: options.url,
          method: "post",
          baseURL: baseApi,
          timeout: 5000,
          params: params
        })
    )
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          let res = response.data;
          //解密
          if (flag) {
            res = DecryptData(res);
          }
          if (res.code === 0) {
            resolve(res);
          } else if (res.code === 500) {
            this.$toast("网络异常，请稍后再试");
          } else {
            resolve(res);
            if (res.code > 0) {
              this.$toast(res.message);
            } else {
              console.log("接口错误信息", res);
            }
          }
        } else {
          this.$toast(`${response.data}`);
          reject(response.data);
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          if (err.response.data.code === 10010002) {
            console.log('此接口由于token过期而显示登录页面，接口为：'+options.url)
            store.commit("SET_USERINFO", "");
            store.commit("SET_TOKEN", "");
            store.commit("SET_ISSHOWLOGIN", true);
            store.commit("SET_PKNUM", 0);
            lStore.remove("userInfo");
            lStore.remove("Token");
            router.push("/index");
          } else if (err.response.data.code === 10010003) {
            console.log('此接口由于token过期而显示登录页面，接口为：'+options.url)
            store.commit("SET_USERINFO", "");
            store.commit("SET_TOKEN", "");
            store.commit("SET_ISSHOWLOGIN", true);
            store.commit("SET_PKNUM", 0);
            this.$toast(err.response.data.message);
            lStore.remove("userInfo");
            lStore.remove("Token");
            router.push("/index");
          } else if (err.response.data.code === 500) {
            this.$toast("网络异常，请稍后再试");
          } else if (err.response.data.code > 0) {
            this.$toast(`${err.response.data.message}`, 4000);
          } else {
            console.log("接口错误信息", err.response.data.message);
          }
        } else {
          this.$toast("网络异常，请稍后再试");
        }
        reject(err.response);
      });
  });
};

export default ajax;
