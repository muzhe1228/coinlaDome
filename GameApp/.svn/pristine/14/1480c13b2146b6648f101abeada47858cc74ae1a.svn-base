import Card from "../view/Card";
import BaseComponent from "../utils/BaseComponent";

// 扑克发牌器

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardDealerController extends BaseComponent {

    @property(cc.Prefab)
    private cardPrefab: cc.Prefab = null;

    private drawCards: cc.Node[] = [];

    private originPos: cc.Vec2 = null;

    private topCardPos: cc.Vec2 = null;

    private cardScale: number = null;

    onLoad() {
        this.registerReuseableNode("Card", this.cardPrefab);
        this.originPos = this.node.position;
        let card = this.getComponentInChildren(Card).node;
        this.topCardPos = card.position;
        this.cardScale = card.scale;
    }

    // 从牌库中取出一张牌
    public drawCard(): Card {
        let card = this.getReusableNode("Card");
        let cardView = card.getComponent(Card);
        cardView.reset();
        this.node.addChild(card, -1, "Card");
        card.position = this.topCardPos;
        card.scale = this.cardScale;
        this.drawCards.push(card);
        return cardView
    }

    // 收牌
    public recoveryCards() {
        for (let card of this.drawCards) {
            cc.director.getActionManager().removeAllActionsFromTarget(
                card, true);
            this.releaseNode("Card", card)
        }
        this.drawCards = [];
    }

    // 展示和收起的移动动作
    public moveAction(show: boolean, isFast: boolean, callback: () => void = ()=>{}) {
        let duration = isFast ? 0 : 0.2;
        let height = this.node.height * this.node.scaleY;
        let y = show ? this.originPos.y + height : this.originPos.y;
        this.node.runAction(
            cc.sequence(
                cc.moveTo(duration, 0 , y),
                cc.callFunc(() => {
                    this.node.y = y;
                    callback()
                })
            )
        )
    }

}
