import Window from "../view/Window";

// 等待开奖界面控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class WaitResultController extends cc.Component {

    @property(Window)
    private window: Window = null;

    @property(cc.Label)
    private hourNumber: cc.Label = null;

    @property(cc.Label)
    private minuteNumber: cc.Label = null;

    @property(cc.Label)
    private secondNumber: cc.Label = null;

    @property(cc.Label)
    private millisecondNumber: cc.Label = null;

    onLoad () {
        this.window.node.on("window-init", this.onWindowInit, this)
    }

    public show (tm: number) {
        this.window.open();
        this.setTime(tm);
    }

    public hide () {
        this.window.close();
    }

    private setTime (tm: number) {
        let date = new Date(tm);
        this.hourNumber.string = ("00" + date.getHours()).slice(-2);
        this.minuteNumber.string = ("00" + date.getMinutes()).slice(-2);
        this.secondNumber.string = ("00" + date.getSeconds()).slice(-2);
        this.millisecondNumber.string = ("000" + date.getMilliseconds()).slice(-3);
    }

    private onWindowInit () {
        this.window.setListenBackTouch(false);
        this.window.backMaskNode.addComponent(cc.BlockInputEvents);
    }

}
