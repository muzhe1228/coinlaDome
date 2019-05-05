import { connect } from "react-redux";
import axios from "axios";
import ENV from "../APi";
import { Toast } from "antd-mobile";
import { encryption, DecryptData } from "common";
import { lStore } from "common";
import Store from "../../store";
import { actionCreators } from "components/Header/store";

class Axios {
  // flag = true 加密  flag = false 不加密
  static ajax(options, flag) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "none";
    }

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
            timeout: 50000,
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
          if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById("ajaxLoading");
            loading.style.display = "none";
          }
          if (response.status === 200) {
            let res = response.data;
            //解密
            if (flag) {
              res = DecryptData(res);
            }
            if (res.code === 0) {
              resolve(res);
            } else if (res.code === 500) {
              Toast.fail('网络异常，请稍后再试');
            } else {
              resolve(res);
              if (res.code > 0) {
                Toast.fail(res.message, 1);
              } else {
                console.log("接口错误信息", res);
              }
            }
          } else {
            Toast.fail(`${response.data}`, 1);
            reject(response.data);
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data.code === 10010002) {
              Store.dispatch(actionCreators.setShowLogin(0));
              Store.dispatch(actionCreators.setUserInfo({}));
              lStore.remove("Token");
            } else if (err.response.data.code === 500) {
              Toast.fail('网络异常，请稍后再试');
            } else if (err.response.data.code > 0) {
              Toast.fail(`${err.response.data.message}`, 1);
            } else {
              console.log("接口错误信息", err.response.data.message);
            }
          }
          reject(err);
          if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById("ajaxLoading");
            loading.style.display = "none";
          }
        });
    });
  }
}
const mapState = state => ({
  HeaderInfo: state.getIn(["header", "HeaderInfo"]),
  isScreen: state.getIn(["header", "isScreen"])
});
export default connect(
  mapState,
  null
)(Axios);
