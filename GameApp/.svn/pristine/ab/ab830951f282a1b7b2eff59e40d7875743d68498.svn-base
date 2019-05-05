import BaseComponent from "../utils/BaseComponent";

//牛牛显示结果
const {ccclass, property} = cc._decorator;

@ccclass
export default class CardGroupResult extends BaseComponent {

    @property(cc.Sprite)
    private resultSprite: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    private niuAtlas: cc.SpriteAtlas = null;

    private resultNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.resultNode = this.resultSprite.node;
        this.node.removeAllChildren();
    }

    public obtainResultSprite(sprite: cc.Sprite, result: string, isFast: boolean) {
        this.node.active = true;
        let dstPosition = this.resultNode.position;
        let dstScale = this.resultNode.scale;
        sprite.node.opacity = 0;

        sprite.spriteFrame = this.niuAtlas.getSpriteFrame(result);
        sprite.node.setParent(null);
        this.node.addChild(sprite.node);
        sprite.node.position = dstPosition;
        sprite.node.scale = dstScale;
        sprite.node.runAction(cc.fadeTo(0.3, 255));

        if (!isFast) {
            let audioPath = "audio/niu/" + result;
            this.playEffect(audioPath);
        }
    }

    public clearResult() {
    }

}
