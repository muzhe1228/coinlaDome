
/**
 *  弹窗
 *  带有打开和关闭的动画
 *  能自动生成背部遮罩，点击遮罩会关闭弹窗
 *  初始化后会将遮罩增加到层级中，位置是当前节点同级的下层
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class Window extends cc.Component {

    // 背部遮罩的不透明度
    @property(cc.Float)
    protected maskOpacity: number = 130;

    // 淡入淡出的动画时间
    @property(cc.Float)
    protected fadeTime: number = 0.1;

    @property(cc.Prefab)
    protected backMaskPrefab: cc.Prefab = null;

    public backMaskNode: cc.Node = null;

    onLoad() {
        this.initBackMask();
        this.node.addComponent(cc.BlockInputEvents);
        // 点击遮罩则回调关闭弹窗
        this.setListenBackTouch(true);
        this.node.dispatchEvent(
            new cc.Event.EventCustom("window-init", true))
    }

    onDestroy() {
        this.setListenBackTouch(false);
    }

    public switch() {
        this.node.active ? this.close() : this.open();
    }

    // 开启弹窗
    public open() {
        if (this.node.active) {
            return;
        }
        this.node.opacity = 0;
        this.node.scale = 0.7;
        this.node.active = true;
        this.backMaskNode.active = true;
        let fadeIn = cc.fadeIn(this.fadeTime);
        let scale = cc.scaleTo(this.fadeTime, 1, 1);
        this.node.runAction(cc.spawn(fadeIn, scale));
        this.node.dispatchEvent(
            new cc.Event.EventCustom("window-open", true))
    }

    // 关闭弹窗
    public close() {
        if (!this.node.active) {
            return;
        }
        this.backMaskNode.active = false;
        let fadeOut = cc.fadeOut(this.fadeTime);
        let scale = cc.scaleTo(this.fadeTime, 0.7, 0.7);
        this.node.runAction(cc.sequence(
            cc.spawn(fadeOut, scale),
            cc.callFunc(() => {
                this.node.active = false
            })
        ));
        this.node.dispatchEvent(
            new cc.Event.EventCustom("window-close", true))
    }

    public setListenBackTouch(bool: boolean) {
        bool ? this.backMaskNode.on(cc.Node.EventType.TOUCH_END, this.onTouchBackMask, this)
            : this.backMaskNode.off(cc.Node.EventType.TOUCH_END);
    }

    protected onTouchBackMask() {
        this.close();
    }

    // 生成背部遮罩层
    protected initBackMask() {
        this.backMaskNode = cc.instantiate(this.backMaskPrefab);
        this.backMaskNode.opacity = this.maskOpacity;
        this.backMaskNode.active = false;
        let zIndex = this.node.zIndex - 1;
        this.node.parent.addChild(this.backMaskNode, zIndex);
    }

}
