// 开关控制器

import BaseComponent from "../utils/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SwitchController extends BaseComponent {

    @property(cc.Node)
    protected slider: cc.Node = null;

    @property(cc.Boolean)
    private state: boolean = true;

    onLoad () {
        this.setState(this.state, false);
        this.node.on(cc.Node.EventType.TOUCH_END, this.switch, this)
    }

    onDestroy () {
        super.onDestroy();
        this.slider.off(cc.Node.EventType.TOUCH_END);
    }

    // 切换开关状态
    public switch () {
        // 如果动画还未结束则不切换
        if (this.slider.getNumberOfRunningActions()) return;
        this.state = !this.state;
        this.setState(this.state);
        // 向父节点发送事件
        this.state ? this.node.dispatchEvent(
            new cc.Event.EventCustom('switch-open', true))
            : this.node.dispatchEvent(
                new cc.Event.EventCustom('switch-close', true));
        this.playRemoteEffect("sounds/界面交互点击.mp3");
    }

    // 设置状态，可指定是否使用动画
    public setState (state: boolean, action: boolean = true) {
        this.state = state;
        let space = (this.node.height - this.slider.height) / 2;
        let xPos = (this.node.width / 2 - space) / 2;
        if (! state) xPos = -xPos;
        if (! action) {
            this.slider.setPosition(xPos, 0);
        } else {
            let moveTo = cc.moveTo(0.2, xPos, 0).easing(cc.easeIn(5));
            this.slider.runAction(moveTo);
        }
    }

    public getState () {
        return this.state;
    }

}
