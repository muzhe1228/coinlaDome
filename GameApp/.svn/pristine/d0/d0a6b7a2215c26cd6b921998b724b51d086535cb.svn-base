import BidWindowController from "./BidWindowController";
import ScrollNumber from "../view/ScrollNumber";
import BankerInfo from "../model/BankerInfo";
import Window from "../view/Window";
import BidBankerInfo from "../model/BidBankerInfo";
import BaseComponent from "../utils/BaseComponent";

// 竞庄控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class BidBankerController extends BaseComponent {

    @property(cc.Node)
    private buttonNode: cc.Node = null;

    @property(BidWindowController)
    private windowController: BidWindowController = null;

    @property(Window)
    private window: Window = null;

    @property(ScrollNumber)
    private priceScroll: ScrollNumber = null;

    @property(cc.Node)
    private buttonSwitchPoint: cc.Node = null;

    private buttonSwitchPos: cc.Vec2 = null;

    private buttonOriginPos: cc.Vec2 = null;

    private blockInput: cc.BlockInputEvents = null;

    private price: number;

    private isFocus: boolean = false;

    onLoad() {
        this.window.node.on(
            "window-open", this.onOpenWindow, this);
        this.buttonNode.opacity = 0;
        this.buttonOriginPos = this.buttonNode.position;
        this.buttonSwitchPos = this.buttonSwitchPoint.position;

        // 场景尺寸变化时，按钮位置重新适配
        this.node.on(cc.Node.EventType.SIZE_CHANGED,
            () => {
                this.buttonNode.getComponent(cc.Widget).updateAlignment();
                this.buttonOriginPos = this.buttonNode.position;
                this.buttonSwitchPoint.getComponent(cc.Widget).updateAlignment();
                this.buttonSwitchPos = this.buttonSwitchPoint.position;
            }, this);
    }

    public showButton() {
        if (!this.isFocus)
            this.buttonNode.opacity = 255;
    }

    public renderBidding(bidInfo: BidBankerInfo) {
        let price = bidInfo.getBidPrice();
        if (!price) {
            return
        }
        if (!this.buttonNode.opacity)
            this.showButton();
        this.price = price;
        this.priceScroll.setNumber(price);
        this.windowController.setPrice(price);
        this.windowController.setCandidate(
            bidInfo.getBidderNick(), bidInfo.getBidderHeadUrl());
    }

    public renderBanker(bankerIsSelf: boolean, bankerInfo: BankerInfo) {
        this.switchPosition(bankerIsSelf);
        if (!this.isFocus) {
            this.windowController.switchHeader(false);
            this.windowController.setRound(
                bankerInfo.getMaxRound() - bankerInfo.getBankerRound() + 1);
        }
    }

    // 开启竞庄弹窗，隐藏按钮，并强制不能取消
    public openFocus() {
        this.isFocus = true;
        this.window.open();
        this.window.setListenBackTouch(false);
        this.windowController.switchHeader(true);
        this.blockInput = this.window.backMaskNode.addComponent(cc.BlockInputEvents);
        this.buttonNode.opacity = 0;
        this.resetTime();
    }

    // 关闭竞庄弹窗，显示按钮
    public closeFocus() {
        if (this.blockInput) {
            this.window.setListenBackTouch(true);
            this.window.backMaskNode.removeComponent(this.blockInput);
        }
        this.window.close();
        this.buttonNode.opacity = 255;
        this.isFocus = false;
    }

    // 设置弹窗中的竞庄倒计时
    public setCountdown(t: number) {
        this.windowController.setCountdown(t);
    }

    // 重置时钟
    public resetTime() {
        this.windowController.resetTime();
    }

    // 根据庄是否是自己，切换竞庄按钮的位置
    private switchPosition(bankerIsSelf: boolean) {
        let pos = bankerIsSelf ? this.buttonSwitchPos : this.buttonOriginPos;
        let buttonParent = this.buttonNode;
        buttonParent.stopAllActions();
        let moveTo = cc.moveTo(0.5, pos).easing(cc.easeIn(3));
        buttonParent.runAction(moveTo);
    }

    private onOpenWindow() {
        if (this.price) {
            this.windowController.setPrice(this.price)
        }
    }

}
