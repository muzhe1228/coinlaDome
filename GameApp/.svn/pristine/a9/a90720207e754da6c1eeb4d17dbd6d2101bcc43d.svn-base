/**
 * 
                   _oo0oo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  0\  =  /0
                ___/`---'\___
              .' --|     |-- '.
             / --|||  :  |||-- \
            / _||||| -:- |||||- \
           |   | \--  -  --/ |   |
           | \_|  ''\---/''  |_/ |
           \  .-\__  '-'  ___/-. /
         ___'. .'  /--.--\  `. .'___
      ."" '<  `.___\_<|>_/___.' >' "".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `_.   \_ __\ /__ _/   .-` /  /
 =====`-.____`.___ \_____/___.-`___.-'=====
                   `=---=`
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         佛祖保佑     永无BUG
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
 * 
 */

import HttpUtils from "../network/HttpUtils";
import { Room } from "../model/Room";
import { User } from "../model/User";
import CommonFunc from "./CommonFunc";
import { CommonConsts } from "./CommonConsts";
import AudioManager from "../manager/AudioManager";
import SceneManager from "../manager/SceneManager";
import AppManager from "../manager/AppManager";
import BankerInfo from "../model/BankerInfo";


// 共用父类

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseComponent extends cc.Component {

    private static _userInfo: User;

    public static roomInfo: Room;

    public static bankerInfo: BankerInfo;

    public static userBalance: number = null;

    public static alert: (...args) => void = () => {
    };

    // http interface
    private static _httpUtils: HttpUtils;

    // node pool
    private nodePoolDict: { [name: string]: cc.NodePool } = {};
    private nodePoolIndexDict: { [name: string]: cc.Prefab } = {};

    // event 
    private static _eventTarget: cc.EventTarget;

    private scheduleIds: number[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {

    // }

    // start () {

    // }

    // update (dt) {}

    onDestroy() {
        this.jsUnScheduleAll();
        this.releasePools();
    }

    //#region 用户的全局参数获取

    public static get userInfo(): User {
        if (!this._userInfo) {
            let userId: number;
            let token: string;
            let userInfo = JSON.parse(window.parent.localStorage.getItem("userInfo"));
            if (userInfo) {
                userId = userInfo["userId"];
                token = window.parent.localStorage.getItem("Token");
            } else {
                let params = CommonFunc.parserUrlParams();
                userId = params["userId"];
                token = params["token"];
            }
            this._userInfo = new User(userId, token);
        }
        return this._userInfo;
    }

    public getUserId(): number {
        return BaseComponent.userInfo.userId;
    }

    public getToken(): string {
        return BaseComponent.userInfo.token;
    }

    public getRoomId(): number {
        if (!BaseComponent.roomInfo)
            return CommonFunc.parserUrlParams()["roomId"];
        return BaseComponent.roomInfo.roomId;
    }

    // 当前用户是否为庄家
    public bankerIsSelf(): boolean {
        return BaseComponent.bankerInfo.getUserId() == this.getUserId();
    }

    // 当前用户余额
    public getUserBalance() {
        return BaseComponent.userBalance;
    }

    public setUserBalance(value: number) {
        BaseComponent.userBalance = value;
    }

    //#endregion

    //#工具性方法

    // 警告半透明弹窗，需要搭配Alert节点
    protected alert(...args) {
        BaseComponent.alert(...args);
    }

    // 播放音效
    protected playEffect(audioClip: cc.AudioClip | string) {
        let play = (clip: cc.AudioClip) => {
            if (AudioManager.getEffectState() && SceneManager.getVisible()) {
                cc.audioEngine.playEffect(clip, false)
            }
        };
        if (audioClip instanceof cc.AudioClip) {
            play(audioClip);
        } else if (typeof audioClip == "string") {
            this.loadResAudioClip(audioClip, play)
        }
    }

    // 播放远程音效
    protected playRemoteEffect(relativeUrl: string) {
        this.loadRemoteAudioClip(relativeUrl, this.playEffect.bind(this))
    }

    // 读取远程音频并返回
    protected loadRemoteAudioClip(relativeUrl: string, callback: (clip: cc.AudioClip) => void) {
        let fullUrl = CommonConsts.resourceBaseUrl + relativeUrl;
        cc.loader.load(fullUrl, (err, clip) => {
            if (err) {
                // todo: handle error
                console.log(err);
            } else {
                callback(clip);
            }
        });
    }

    // 读取本地音频并返回
    protected loadResAudioClip(path: string, callback: (clip: cc.AudioClip) => void) {
        cc.loader.loadRes(path, cc.AudioClip, (err, clip) => {
            if (err) {
                // todo: handle error
                console.log(err);
            } else {
                callback(clip);
            }
        });
    }

    // 读取远程图片到指定Sprite
    protected loadRemoteSprite(relativeUrl: string, sprite: cc.Sprite, callback?: () => void) {
        // 远程图片需要增加避免跨域的后缀
        let splits = relativeUrl.split('.');
        let suffix = splits[splits.length - 1];
        if (suffix.length < 5) {
            relativeUrl += '?img=img.' + suffix;
        }
        let fullUrl = CommonConsts.resourceBaseUrl + relativeUrl;
        cc.loader.load(fullUrl, (err, tex) => {
            if (err) {
                // todo: handle error
                console.log(err);
            } else {
                sprite.spriteFrame = new cc.SpriteFrame(tex);
                if (callback) {
                    callback();
                }
            }
        });
    }

    // 读取本地资源图片到指定Sprite
    protected loadResSprite(path: string, sprite: cc.Sprite, callback?: () => void) {
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                // todo: handle error
                console.log(err);
            } else {
                sprite.spriteFrame = spriteFrame;
                if (callback) {
                    callback();
                }
            }
        });
    }

    // JS原生计时器
    protected jsSchedule(callback: () => void, interval?: number, repeat?: number, delay?: number, ...args: any[]) {
        for (let i = 0; i <= repeat; i++) {
            let id = setTimeout(
                () => {
                    callback();
                    // 计时器完成回调后删除计时器ID
                    let idx = this.scheduleIds.indexOf(id);
                    if (idx != -1) {
                        this.scheduleIds.splice(
                            this.scheduleIds.indexOf(id), 1);
                    }
                },
                (interval * i + delay) * 1000,
                args);
            this.scheduleIds.push(id);
        }
    }

    protected jsScheduleOnce(callback: () => void, delay?: number, ...args: any[]) {
        let id = setTimeout(() => {
                callback();
                // 计时器完成回调后删除计时器ID
                let idx = this.scheduleIds.indexOf(id);
                if (idx != -1) {
                    this.scheduleIds.splice(
                        this.scheduleIds.indexOf(id), 1);
                }
            },
            delay * 1000,
            args);
        this.scheduleIds.push(id);
    }

    protected jsUnScheduleAll() {
        for (let i = 0; i < this.scheduleIds.length; i++) {
            clearTimeout(this.scheduleIds.pop());
        }
    }

    //#endregion

    // 获取 HttpUtils 对象
    protected get httpUtils() {
        return BaseComponent._httpUtils || (BaseComponent._httpUtils = new HttpUtils(
                () => {
                },
                (http, data) => {
                    //未登陆或登陆超时
                    if (data.code === 10010002 || data.code === 10010003) {
                        this.alert(data.code === 10010003 ? data.message : "登录超时，请重新登录");

                        //需要返回首页重新登陆
                        setTimeout(() => {
                            AppManager.gotoHomePage();
                        }, 2000);
                    } else if (data.code > 0) {
                        this.alert(data.message);
                    } else if (data.code < 0) {
                        this.alert('服务器请求异常')
                    }
                },
                () => {
                    this.alert("网络环境异常")
                },
            )
        )
    }

    // 获取 EventTarget 对象
    protected get notificationCenter() {
        return BaseComponent._eventTarget || (BaseComponent._eventTarget = new cc.EventTarget())
    }

    // 投递消息
    protected postMessage(type: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        this.notificationCenter.emit(type, arg1, arg2, arg3, arg4, arg5);
    }

    // 接收消息
    protected receiveMessage(type: string, callback: () => void) {
        this.notificationCenter.on(type, callback);
    }

    //#endregion

    //#region node pool

    // 注册复用池
    protected registerReuseableNode(name: string, prefab: cc.Prefab) {
        this.nodePoolIndexDict[name] = prefab;
        this.nodePoolDict[name] = new cc.NodePool(name);
    }

    // 从重用池中获取对象
    protected getReusableNode(name: string): cc.Node {
        let prefab = this.nodePoolIndexDict[name];
        let nodePool = this.nodePoolDict[name];

        let node: cc.Node = null;
        if (nodePool.size() > 0) {
            node = nodePool.get();
        } else {
            node = cc.instantiate(prefab);
        }
        return node;
    }

    // 释放某个node 到回收池
    protected releaseNode(name: string, node: cc.Node) {
        let nodePool = this.nodePoolDict[name];
        nodePool.put(node);
    }

    // 释放某个node的全部子对象
    // 可以回收包含特定组件
    protected releaseAllChildren(name: string, node: cc.Node) {
        let nodePool = this.nodePoolDict[name];
        while (node.children.length > 0) {
            let subNode = node.children[0];
            nodePool.put(subNode);
        }
    }

    // 释放复用池
    protected releasePools() {
        this.nodePoolIndexDict = {};
        for (let key in this.nodePoolDict) {
            let pool = this.nodePoolDict[key];
            pool.clear();
        }
        this.nodePoolDict = {};
    }

    //#endregion

}
