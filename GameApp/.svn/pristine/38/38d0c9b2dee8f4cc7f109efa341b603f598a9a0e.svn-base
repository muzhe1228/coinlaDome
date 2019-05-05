import Window from "./Window";
import BaseComponent from "../utils/BaseComponent";

/**
 *  弹窗按钮
 *  用于关联弹窗，使点击按钮后可以打开或关闭弹窗，并播放交互音效
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class WindowButton extends BaseComponent {

    @property(cc.Button)
    protected button: cc.Button = null;

    @property(Window)
    protected window: Window = null;

    // 手动指定弹框节点路径，用于当弹窗节点在预制体之外时使用
    @property(cc.String)
    protected windowPath: string = '';

    onLoad() {
        // 查找弹窗节点
        if (! this.window) this.window = cc.find(this.windowPath).getComponent(Window);
        this.button.node.on(cc.Node.EventType.TOUCH_END, this.onTouchCallback, this);
    }

    // 点击按钮的回调，打开或关闭弹窗，需要弹窗脚本有switch方法来实现开关
    protected onTouchCallback (button) {
        this.playRemoteEffect("sounds/界面交互点击.mp3");
        this.window.switch();
    }

}
