import CryptoJSFunc from "../utils/CryptoJSFunc";
import { CommonConsts } from "../utils/CommonConsts";

/**
 * 新版接口
 * @example 使用 var Http = require('Http')
 * @example      new Http().Get(url, cb)//url链接 回调函数
 * @example      new Http().Post(url, param, cb)//url链接 param参数(json对象) 回调函数
 */
export default class HttpUtils {

    private readonly onSuccessCallback: (http: XMLHttpRequest, data: any) => void = () => {};

    private readonly onErrorCallback: (http: XMLHttpRequest, data: any) => void = () => {};

    private readonly onTimeoutCallback: (url: string) => void = () => {};

    public constructor(onSuccess?: (http: XMLHttpRequest, data: any) => void,
                       onError?: (http: XMLHttpRequest, data: any) => void,
                       onTimeout?: (url: string) => void) {
        this.onSuccessCallback = onSuccess;
        this.onErrorCallback = onError;
        this.onTimeoutCallback = onTimeout;
    }

    /**
     * @param actual
     */
    private static cleanArray(actual): any[] {
        let newArray = [];
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
    private toQueryString(jsonObj): string {
        if (!jsonObj) return "";
        return HttpUtils.cleanArray(
            Object.keys(jsonObj).map(key => {
                if (jsonObj[key] === undefined) return "";
                return encodeURIComponent(key) + "=" + encodeURIComponent(jsonObj[key]);
            })
        ).join("&");
    }

    /**
     * Get 请求
     * @param url 请求URL
     * @param callback  请求回调
     * @param callbackOnError 请求返回错误时，是否回调函数
     */
    public get(
        url: string,
        callback: Function = ()=>{},
        callbackOnError: boolean = false
    ) {
        url = url.startsWith("http")
            ? url
            : url.startsWith("/")
                ? CommonConsts.apiBaseUrl + url
                : CommonConsts.apiBaseUrl + "/" + url;
        let http = cc.loader.getXMLHttpRequest();
        http.open(CommonConsts.HttpMethod_GET, url, true);
        http.setRequestHeader(
            CommonConsts.ContentType,
            CommonConsts.ContentType_TEXT
        );
        http.onload = this.onLoad.bind(
            this,
            http,
            false,
            callback,
            callbackOnError
        );
        http.ontimeout = this.onTimeout.bind(this, url);
        http.timeout = CommonConsts.HttpTimout;
        http.send();
    }

    /**
     * Post请求
     * @param url 请求URL
     * @param params 参数
     * @param encrypt 是否加密
     * @param callback 回调函数
     * @param callbackOnError 请求返回错误时，是否回调函数
     */
    public post(
        url: string,
        params: any,
        encrypt: boolean,
        callback: Function = ()=>{},
        callbackOnError: boolean = false
    ) {
        url = url.startsWith("http")
            ? url
            : url.startsWith("/")
                ? CommonConsts.apiBaseUrl + url
                : CommonConsts.apiBaseUrl + "/" + url;

        let http = cc.loader.getXMLHttpRequest(),
            contentType = CommonConsts.ContentType_FormData,
            data = this.toQueryString(params);
        if (encrypt) {
            contentType = CommonConsts.ContentType_JSON;
            data = JSON.stringify(CryptoJSFunc.encryption(params));
        }

        http.open(CommonConsts.HttpMethod_POST, url, true);
        http.setRequestHeader(CommonConsts.ContentType, contentType);
        http.onload = this.onLoad.bind(
            this,
            http,
            encrypt,
            callback,
            callbackOnError
        );
        http.ontimeout = this.onTimeout.bind(this, url);
        http.timeout = CommonConsts.HttpTimout;
        http.send(data);
    }

    /**
     * http请求回调
     * @param http
     * @param encrypt
     * @param callback
     * @param callbackOnError
     */
    private onLoad(
        http: XMLHttpRequest,
        encrypt: boolean,
        callback: Function,
        callbackOnError: boolean,
    ) {
        if (http.readyState == 4) {
            let data = JSON.parse(http.responseText);
            if (http.status >= 200 && http.status < 207) {
                if (callback) {
                    data = encrypt ? CryptoJSFunc.DecryptData(data) : data;
                }
                //判断接口调用是否正常，以 后端给的标志为准
                if(data.success){
                    this.onSuccessCallback(http, data);
                    callback(data);
                }else{
                    //后台给出的错误 统一回调处理
                    this.onErrorCallback(http, data);
                }
            } else {
                //网络请求异常
                cc.error(data.message);
                this.onErrorCallback(http, data);
                if (callbackOnError){
                    callback(data);
                }
            }
            cc.log('response: ', http.responseURL,  data);
        }
    }

    /**
     * 网络请求超时
     * @param url 
     */
    private onTimeout(url: string) {
        if (this.onTimeout){
            this.onTimeoutCallback(url)
        }
        cc.error("request timeout: " + url)
    }

}
