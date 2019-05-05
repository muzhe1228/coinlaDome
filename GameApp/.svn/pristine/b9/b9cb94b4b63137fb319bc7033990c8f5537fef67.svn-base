import BaseComponent from "../utils/BaseComponent";

// 牛几结果派发器

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardResultDealerController extends BaseComponent {

    @property(cc.Prefab)
    private sprite: cc.Prefab = null;

    private drawResults: cc.Node[] = [];

    onLoad() {
        this.registerReuseableNode("CardResult", this.sprite);
    }

    public drawCardResult(): cc.Sprite {
        let sprite = this.getReusableNode("CardResult");
        this.node.addChild(sprite, undefined, "CardResult");
        sprite.setPosition(0, 0);
        this.drawResults.push(sprite);
        return sprite.getComponent(cc.Sprite);
    }

    public recoveryCardResult() {
        for (let card of this.drawResults) {
            cc.director.getActionManager().removeAllActionsFromTarget(
                card, true);
            this.releaseNode("CardResult", card)
        }
        this.drawResults = [];
    }
}
