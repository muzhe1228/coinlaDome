import ScrollNumber from "../view/ScrollNumber";
import { CurrencyType } from "../model/CurrencyType";
import BaseComponent from "../utils/BaseComponent";

// 竞庄弹窗控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class BidWindowController extends BaseComponent {

    @property(cc.Node)
    private clockNode: cc.Node = null;

    @property(ScrollNumber)
    private clockScroll: ScrollNumber = null;

    @property(Number)
    private defaultTime: number = 10;

    @property(cc.Node)
    private roundNode: cc.Node = null;

    @property(cc.Label)
    private roundNumber: cc.Label = null;

    @property(ScrollNumber)
    private priceScroll: ScrollNumber = null;

    @property(cc.Button)
    private leftButton: cc.Button = null;

    @property(cc.Button)
    private rightButton: cc.Button = null;

    @property(cc.Label)
    private candidateNick: cc.Label = null;

    @property(cc.Sprite)
    private candidateHead: cc.Sprite = null;

    private leftMultipleId: number = null;

    private rightMultipleId: number = null;

    private _clickable: boolean = true;

    // 倒计时
    private time: number = 0;

    // 当前竞庄价格
    private bidPrice: number = 0;

    onLoad() {
        this.setCanBidding(false);
        this.requestMultipleId(
            this.setCanBidding.bind(this, true)
        );
    }

    onEnable() {
        this.setPrice(this.bidPrice);
    }

    public getCanBidding() {
        return this._clickable;
    }

    // 设置竞价按钮是否可点击
    public setCanBidding(bool: boolean) {
        this._clickable = bool;

        if (bool) {
            let cb = (multipleId) => {
                this.setCanBidding(false);
                this.playRemoteEffect("sounds/界面交互点击.mp3");
                // 如果没有ID则先请求ID接口，再请求竞庄接口
                multipleId ? this.requestBiding(multipleId)
                    : () => {
                        this.requestMultipleId(
                            () => {
                                this.requestBiding(multipleId)
                            })
                    }
            };
            this.leftButton.node.on(cc.Node.EventType.TOUCH_END,
                () => {
                    cb(this.leftMultipleId)
                }, this);
            this.rightButton.node.on(cc.Node.EventType.TOUCH_END,
                () => {
                    cb(this.rightMultipleId)
                }, this);
            this.leftButton.interactable = this.rightButton.interactable = true;
            this.leftButton.node.opacity = this.rightButton.node.opacity = 255;
        } else {
            this.leftButton.interactable = this.rightButton.interactable = false;
            this.leftButton.node.opacity = this.rightButton.node.opacity = 130;
            this.leftButton.node.off(cc.Node.EventType.TOUCH_END);
            this.rightButton.node.off(cc.Node.EventType.TOUCH_END);
        }
    }

    // 请求出价接口
    public requestBiding(multipleId: number) {
        this.httpUtils.post(
            "/hns/niuniu/competeBanker",
            {
                "token": this.getToken(),
                "roomId": this.getRoomId(),
                "multipleId": multipleId,
                "currencyType": CurrencyType.PK
            },
            true,
            this.requestBidingCallback.bind(this),
            true
        );
    }

    private requestBidingCallback(res: any) {
        this.setCanBidding(true);
        if (res.code == 0) {
            this.playRemoteEffect("sounds/飞筹码.mp3");
        }
    }

    private requestMultipleId(callback?: () => void) {
        this.httpUtils.post(
            "/hns/niuniu/findMultipleList",
            {
                "token": this.getToken(),
                "roomId": 3,
            },
            true,
            res => this.requestMultipleIdCallback(res, callback)
        );
    }

    private requestMultipleIdCallback(res: any, callback?: () => void) {
        let list = res.data;
        list.sort((a, b) => {
            return a.multiple - b.multiple
        });
        this.leftMultipleId = list[0].multipleId;
        this.rightMultipleId = list[1].multipleId;
        if (callback) {
            callback();
        }
    }

    // 设置倒计时
    public setCountdown(t: number) {
        this.time = Math.max(0, Math.ceil(t));
        let endTime = Date.now() + this.time * 1000;

        // 取消计时器
        this.unscheduleAllCallbacks();

        // 链式计时器，每过一秒回调一次，计算与终止时间的间隔
        let nextTime = () => {
            this.scheduleOnce(() => {
                this.time = Math.max(0,
                    Math.ceil((endTime - Date.now()) / 1000));
                this.showTime();
                if (this.time > 0)
                    nextTime();
            }, 1);
        };
        nextTime();

        // 立即显示一次
        this.showTime();
    }

    // 重置时钟
    public resetTime() {
        this.time = this.defaultTime;
        this.showTime();
    }

    private showTime() {
        let timeString = "";
        if (this.time >= 60) {
            let min = Math.floor(this.time / 60).toString();
            if (min.length == 1) min = "0" + min;
            timeString = min;
        } else {
            timeString = "00"
        }
        let sec = (this.time % 60).toString();
        if (sec.length == 1) sec = "0" + sec;
        timeString = timeString + ":" + sec;
        this.clockScroll.setNumber(timeString);
    }

    // 设置最高出价
    public setPrice(price: number) {
        this.bidPrice = price;
        if (!this.priceScroll.node.active) {
            return;
        }
        this.priceScroll.setNumber(price);
        this.leftButton.getComponentInChildren(
            ScrollNumber).setNumber(price * 1.1);
        this.rightButton.getComponentInChildren(
            ScrollNumber).setNumber(price * 2);
    }

    // 设置竞庄候选人
    public setCandidate(nick: string, headUrl: string) {
        this.candidateNick.string = nick || "暂无竞庄";
        if (headUrl) {
            this.loadRemoteSprite(headUrl, this.candidateHead)
        }
    }

    public setRound(num: number | string) {
        this.roundNumber.string = num.toString();
    }

    public switchHeader(showClock: boolean) {
        if (showClock) {
            this.clockNode.active = true;
            this.roundNode.active = false;
        } else {
            this.clockNode.active = false;
            this.roundNode.active = true;
        }
    }

}
