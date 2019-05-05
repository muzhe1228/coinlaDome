import BaseComponent from "../utils/BaseComponent";

// 提示框控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class AlertController extends cc.Component {

    @property(cc.Sprite)
    background: cc.Sprite = null;

    @property(cc.Label)
    text: cc.Label = null;

    onLoad () {
        BaseComponent.alert = this.alert.bind(this);
        this.node.opacity = 0;
    }

    public alert (text: string, showDelay: number = 2) {
        this.node.stopAllActions();
        this.text.string = text;
        this.background.node.width = text.length * 26 + 100;
        // 延迟淡出
        let actions = cc.sequence(
            cc.fadeIn(0.2),
            cc.delayTime(showDelay),
            cc.fadeOut(0.5)
        );
        this.node.runAction(actions);
    }

}
