import WebsocketUtils from "../network/WebsocketUtils";
import ScrollNumber from "../view/ScrollNumber";
import UserInfo from "../model/UserInfo";
import { CommonConsts } from "../utils/CommonConsts";
import RoomBlock from "../view/RoomBlock";
import NoticeController from "./NoticeController";
import { paySetting, roomType } from "../model/roomType";
import BaseComponent from "../utils/BaseComponent";
import IWebSocketDelegate from "../network/IWebSocketDelegate";
import { Room } from "../model/Room";
import NoticeInfo from "../model/NoticeInfo";
import AppManager from "../manager/AppManager";
import SceneManager from "../manager/SceneManager";
import { CurrencyType } from "../model/CurrencyType";
import UserPkInfo from "../model/UserPkInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoomList extends BaseComponent
    implements IWebSocketDelegate {
    @property(cc.Node)
    private topWrap: cc.Node = null;

    @property(cc.Node)
    private botWrap: cc.Node = null;

    @property(cc.Button)
    private backButton: cc.Button = null;

    @property(cc.Button)
    private fastGameButton: cc.Button = null;
    //用户头像
    @property(cc.Sprite)
    userAvater: cc.Sprite = null;
    //
    @property(cc.Label)
    userName: cc.Label = null;

    @property(ScrollNumber)
    private balance: ScrollNumber = null;

    //  公告
    @property(NoticeController)
    private notice: NoticeController = null;

    //room
    @property(cc.Prefab)
    private roomBlock: cc.Prefab = null;

    private selfPk: number = 0;

    private roomList: any = [];

    websocket: WebsocketUtils = null;

    //  LIFE-CYCLE CALLBACKS:

    onLoad() {
        //  用于App原生平台调用，监听锁屏等切换至后台事件
        window["setGameVisible"] = SceneManager.setVisible.bind(SceneManager);

        this.backButton.node.on(
            cc.Node.EventType.TOUCH_END,
            this.backGame,
            this
        );
        this.fastGameButton.node.on(
            cc.Node.EventType.TOUCH_END,
            this.fastStartGame,
            this
        );
        this.requestUserPkInfo();
        this.prepareWebsocket();
        this.initRoomData();

        cc.director.preloadScene("game");
    }

    onDestroy() {
        super.onDestroy();
        this.websocket.close();
    }
    // 获取用户Pk信息
    public requestUserPkInfo() {
        this.httpUtils.post(
            "/uas/userAssets/findPkBalance",
            {
                token: this.getToken(),
                currencyType: CurrencyType.PK
            },
            true,
            this.requestUserPkInfoCallback.bind(this)
        );
    }

    public requestUserPkInfoCallback(res) {
        let pkInfo = new UserPkInfo(res.data);
        this.selfPk = pkInfo.getAvailableBalance();
        this.balance.setNumber(pkInfo.getAvailableBalance());
    }
    // 获取用户信息
    public requestUserInfo() {
        this.httpUtils.post(
            "/uac/user/selectUserInfo",
            { token: this.getToken() },
            true,
            this.requestUserInfoCallback.bind(this)
        );
    }

    public requestUserInfoCallback(res) {
        this.renderUserInfo(new UserInfo(res.data));
    }

    public renderUserInfo(userInfo: UserInfo) {
        this.loadRemoteSprite(userInfo.getHeadUrlPath(), this.userAvater);
        this.userName.string = userInfo.getNickname();
        for (let i = 0; i < this.roomList.length; i++) {
            let Photo = this.node.getComponentsInChildren(RoomBlock)[i].Photo;
            this.loadRemoteSprite(userInfo.getHeadUrlPath(), Photo);
        }
    }

    private initRoomData() {
        for (let i = 0; i < 3; i++) {
            let roomPre = cc.instantiate(this.roomBlock);
            let roomBlockJs = roomPre.getComponent(RoomBlock);
            roomBlockJs.setSrc(i);
            this.topWrap.addChild(roomPre);
        }
        for (let i = 0; i < 3; i++) {
            var roomPre = cc.instantiate(this.roomBlock);
            let roomBlockJs = roomPre.getComponent(RoomBlock);
            roomBlockJs.setSrc(i);
            this.botWrap.addChild(roomPre);
        }
        this.roomList = this.node.getComponentsInChildren(RoomBlock);
        this.requestUserInfo();
        this.requestTenList();
        this.requestPingList();
    }

    // 获取十倍牛牛列表
    private requestTenList() {
        this.httpUtils.post(
            "/hns/niuniu/selectTenMultipleRoomList",
            {
                token: this.getToken(),
                page: 0,
                size: 3
            },
            true,
            res => {
                this.setRoomData(res.data.list);
            }
        );
    }

    // 获取平倍牛牛列表
    private requestPingList() {
        this.httpUtils.post(
            "/hns/niuniu/selectFlatMultipleRoomList",
            {
                token: this.getToken(),
                page: 0,
                size: 3
            },
            true,
            res => {
                this.setRoomData(res.data.list);
            }
        );
    }

    // 房间填充数据
    private setRoomData(dataList: any) {
        let arr = [99, 3, 4, 5, 0, 1, 2];
        cc.log(dataList)
        dataList.forEach(item => {
            let indexNum = arr[item.roomId];
            this.roomList[indexNum].setData(item)
            this.roomList[indexNum].node.on(
                cc.Node.EventType.TOUCH_END,
                this.clickRoom.bind(this, item),
                this
            );
        });
    }

    /**
     * 解析url参数并且连接websocket
     */
    private prepareWebsocket(): boolean {
        this.websocket = new WebsocketUtils(CommonConsts.socketBaseUrl, this);
        let b = this.websocket.open();
        if (!b) {
            console.log("连接游戏服务器失败!");
            // todo...
        }
        return b;
    }

    onSocketOpen?(socket: WebSocket, event: Event): void {
        let json = {
            userId: this.getUserId(),
            gameType: 0,
            type: 0,
            roomId: 0
        };
        // 请求 WebSocket 房间信息
        this.websocket.sendRawData(JSON.stringify(json));
    }

    onSocketError(socket: WebSocket, event: Event): void {
        //  this.alert("网络环境异常，正在重连...");
    }

    onSocketMessage?(socket: WebSocket, event: MessageEvent): void {
        if (event.data[0] != "{") return;
        let msgJson = JSON.parse(event.data);
        let socketType = msgJson.socketType;

        switch (socketType) {
            case 13: // 房间状态
                // TODO 使用Model对象传递数据
                this.handleSocketRoom(msgJson);
                break;
            case 1: // 公告
                let noticeInfo = new NoticeInfo(msgJson);
                this.onSocketNotice(noticeInfo);
        }
    }

    // 返回
    public backGame() {
        this.playRemoteEffect("sounds/界面交互点击.mp3");
        AppManager.gotoHomePage();
    }

    // 点击房间
    public clickRoom(data: any) {
        console.log(this.selfPk);

        if (data.roomStatus == 6) {
            this.alert("本房间暂未开放，敬请期待");
        } else {
            if (data.minBets <= this.selfPk && data.maxBets > this.selfPk) {
                this.setRoomInfo(data);
                this.playRemoteEffect("sounds/界面交互点击.mp3");
                cc.director.loadScene("game");
            } else {
                if (this.selfPk >= data.maxBets) {
                    this.alert("您的pk已超过该房间限制，请前往更高级房间！");
                } else {
                    this.alert(
                        "您的pk低于该房间限制，请选择更低级房间或者充值！"
                    );
                }
            }
        }
    }

    // 快速开始
    public fastStartGame() {
        this.httpUtils.post(
            "/hns/niuniu/selectRoom",
            {
                token: this.getToken()
            },
            true,
            res => {
                this.setRoomInfo(res.data);
                this.playRemoteEffect("sounds/界面交互点击.mp3");
                cc.director.loadScene("game");
            }
        );
    }

    private setRoomInfo(data) {
        BaseComponent.roomInfo = new Room(
            data.roomId,
            roomType[data.roomType],
            paySetting[data.paySetting]
        );
    }

    private handleSocketRoom(data: any) {
        switch (data.roomId) {
            case 1:
                this.roomList[3].setPeople(data);
                break;
            case 2:
                this.roomList[4].setPeople(data);
                break;
            case 3:
                this.roomList[5].setPeople(data);
                break;
            case 4:
                this.roomList[0].setPeople(data);
                break;
            case 5:
                this.roomList[1].setPeople(data);
                break;
            case 6:
                this.roomList[2].setPeople(data);
                break;
        }
    }

    // 公告
    private onSocketNotice(noticeInfo: NoticeInfo) {
        this.notice.renderNotice(noticeInfo);
    }
}
