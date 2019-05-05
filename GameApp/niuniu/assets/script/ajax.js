import { encryption, DecryptData } from "./funcComm";

/**
 * 新版接口
 * @example 使用 var Http = require('Http')
 * @example      new Http().Get(url, cb)//url链接 回调函数
 * @example      new Http().Post(url, param, cb)//url链接 param参数(json对象) 回调函数
 */
class CusHttp {
  constructor() {
    this._http;
    this._callback;
    this.flag;

    // this._event = CusEvent.getInstance();
  }
  /**
   *
   * @param actual
   */
  cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }

  /**
   * JSON对象转换为QueryString
   * @param jsonObj
   */
  toQueryString(jsonObj) {
    if (!jsonObj) return "";
    var jsonString = this.cleanArray(
      Object.keys(jsonObj).map(key => {
        if (jsonObj[key] === undefined) return "";
        return encodeURIComponent(key) + "=" + encodeURIComponent(jsonObj[key]);
      })
    ).join("&");

    return jsonString;
  }

  /**
   * Get 请求
   * @param {*} Url
   * @param {*} cb
   */
  Get(Url, cb) {
    cc.info(Url);
    let http = cc.loader.getXMLHttpRequest();
    http.open("GET", Url, true);
    http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    this._callback = cb;
    http.onreadystatechange = this._result.bind(this);
    http.timeout = 10000;
    http.send();
    this._http = http;
  }
  /**
   * Post请求
   * @param {*}flag,是否加密
   */

  Post(Url, params, cb, flag) {
    this.flag = flag;
    data = JSON.stringify(data); //以前不懂要怎么传，是缺少这一步
    let http = cc.loader.getXMLHttpRequest(),
      contentType = "application/x-www-form-urlencoded",
      data = this.toQueryString(params);
    http.open("POST", Url, true);
    if (!flag) {
      contentType = "application/json";
      data = JSON.stringify(encryption(params));
    }
    http.setRequestHeader("Content-Type", contentType);
    this._callback = cb;
    http.onreadystatechange = this._result.bind(this);
    http.timeout = 5000; //超时5秒
    http.send(data);
    this._http = http;
  }
  /**
   * 获取结果给_callback
   */
  _result() {
    if (this._http.readyState == 4) {
      if (this._http.status >= 200 && this._http.status < 207) {
        let data = JSON.parse(this._http.responseText);
        if (this._callback) {
          this.flag
            ? this._callback(data, this._http)
            : this._callback(DecryptData(data), this._http);
        }
      } else {
        cc.log("请求失败");
      }
    }
  }
}
export default CusHttp;
