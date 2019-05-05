import BaseComponent from "../utils/BaseComponent";
import {GameResult} from "../model/GameResult";
import {GameType} from "../model/GameType";

// 全局推送控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class PushController extends BaseComponent {

    @property(cc.Node)
    private bar: cc.Node = null;

    @property(cc.RichText)
    private richText: cc.RichText = null;

    private showCount: number = 0;

    private holdPosX: number = 0;

    onLoad() {
        this.holdPosX = this.bar.x;
        this.bar.getComponentInChildren(cc.Button).node.on(
            cc.Node.EventType.TOUCH_END, this.hideBar.bind(this), this);
    }

    // 渲染全局游戏结果的推送
    public renderResult(resultInfo: GameResult) {
        let gameName: string = null;
        if (resultInfo.getGameType() == GameType.GuessNumber) {
            gameName = "猜尾数";
        } else if (resultInfo.getGameType() == GameType.Treasure) {
            gameName = "夺币";
        } else {
            return;
        }
        let profit = resultInfo.getRoundProfit().toString();
        this.addPushQueue(
            "<color=#ACB3E2>恭喜您在</color> " +
            "<color=#ffffff>" + gameName + "</color> " +
            "<color=#ACB3E2>中获得</color> " +
            "<color=#FFE069>" + profit + "</color>"
        );
    }

    // 渲染转账信息推送
    public renderTransfer(message: string) {
        this.addPushQueue(message)
    }

    // 把修改Labels的回调添加到推送队列中，消息会按顺序间隔推送
    private addPushQueue(richString: string) {
        this.scheduleOnce(() => {
            this.richText.string = richString;
            this.showBar();
        }, this.showCount * 3.5);
        this.scheduleOnce(() => {
            this.hideBar();
            this.showCount--;
        }, this.showCount * 3.5 + 3);
        this.showCount++;
    }

    // 弹出动画
    private showBar() {
        this.bar.active = true;
        this.bar.runAction(cc.moveTo(0.2, 0, 0))
    }

    // 收起动画
    private hideBar() {
        let moveTo = cc.sequence(
            cc.moveTo(0.2, this.holdPosX, 0),
            cc.callFunc(() => { this.bar.active = false; })
        );
        this.bar.runAction(moveTo);
    }

}
