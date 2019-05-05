import BaseComponent from "../utils/BaseComponent";

// 筹码

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chip extends BaseComponent {

    // 筹码精灵
    @property(cc.Sprite)
    private chipSprite: cc.Sprite = null;

    // 筹码选中效果精灵
    @property(cc.Sprite)
    private effectSprite: cc.Sprite = null;

    // 筹码值
    @property(cc.Integer)
    public chipValue: number = 0;

    // 筹码图集
    @property(cc.SpriteAtlas)
    private chipAtlas: cc.SpriteAtlas = null;

    // 筹码索引
    private chipIndex: number = 0;

    // 事件监听
    private eventHandlers: cc.Component.EventHandler[] = [];

    // 是否选中
    private isSelect: boolean = false;

    onLoad () {
        this.setChipValue(this.chipValue);

        // 注册事件监听
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);

        // 默认图片颜色变暗
        this.chipSprite.node.color = cc.color(120, 120, 120);
        // 默认不显示 effect sprite
        this.effectSprite.node.active = false;
    }

    onDestroy () {
        super.onDestroy();
        // 注销事件监听
        this.node.off(cc.Node.EventType.TOUCH_END);
        for (let handler of this.eventHandlers) {
            this.removeEventListener(handler);
        }
    }

    // 点击事件回调
    public onTouch (event) {
        this.playRemoteEffect("sounds/点击筹码.mp3");
        if (!this.isSelect) {
            this.setSelected(true);

            for (let i = 0; i < this.eventHandlers.length; i++) {
                // 发射事件, 传递筹码索引和筹码值
                this.eventHandlers[i].emit([this.chipIndex, this.chipValue]);
            }
        }
    }

    // 添加事件监听
    public addEventListener(listener: cc.Component.EventHandler) {
        this.eventHandlers.push(listener);
    }

    // 移除事件监听
    public removeEventListener(listener: cc.Component.EventHandler) {
        let index = this.eventHandlers.indexOf(listener);
        if (index > -1) {
            this.eventHandlers.splice(index, 1);
        }
    }
    
    public setSelected (b: boolean) {

        if (this.isSelect == b) {
            // ignore
            return;
        }

        this.isSelect = b;

        if (b) {
            this.chipSprite.node.runAction(
                cc.spawn(
                    cc.tintTo(0.15, 255, 255, 255).easing(cc.easeOut(2.0)),
                    cc.scaleTo(0.15, 1.05)
                )
            );

            this.effectSprite.node.active = true;
            this.effectSprite.node.runAction(cc.repeatForever(cc.rotateBy(3, 360)));

        } else {
            this.chipSprite.node.runAction(
                cc.spawn(
                    cc.tintTo(0.15, 120, 120, 120).easing(cc.easeOut(2.0)),
                    cc.scaleTo(0.15, 1.0)
                )
            );

            this.effectSprite.node.stopAllActions();
            this.effectSprite.node.active = false;
        }
    }

    public getChipValue () : number {
        return this.chipValue;
    }

    public setChipValue (value: number) {
        this.chipValue = value;
        this.chipSprite.spriteFrame = this.chipAtlas.getSpriteFrame(
            "chip_" + value.toString());
    }

    public setChipIndex(index: number) {
        this.chipIndex = index;
    }
}
