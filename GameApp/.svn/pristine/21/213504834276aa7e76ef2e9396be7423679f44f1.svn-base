import Card from "../view/Card";
import BaseComponent from "../utils/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardGroupController extends BaseComponent {

    @property(cc.Node)
    private cardContainer: cc.Node = null;

    // 牌对象
    private cards: Card[] = [];
    private cardsNode: cc.Node[] = [];

    private readonly MAX_CARD_COUNT = 5;

    onLoad() {
        // 主要是为了计算每个牌的位置
        let imme_cards = this.cardContainer.getComponentsInChildren(Card);
        for (let i = 0; i < this.MAX_CARD_COUNT; i++) {
            this.cardsNode[i] = imme_cards[i].node;
        }
        this.cardContainer.removeAllChildren();
        this.cardContainer.active = true;
    }

    // 收到扑克
    public obtainCard(card: Card, isFast: boolean, callback: () => void = ()=>{}) {
        this.node.active = true;

        // 扑克超过最大数量则不接收
        if (this.cardContainer.childrenCount >= this.MAX_CARD_COUNT) {
            return;
        }

        let dstCard = this.cardsNode[this.cards.length];

        let dstPosition = dstCard.position;
        let dstScale = dstCard.scale;
        // step1. 本地坐标先转化成世界坐标
        let worldPosition = this.cardContainer.convertToWorldSpaceAR(dstPosition);
        // step2. 再将此世界坐标转化成牌的局部空间坐标
        let localPosition = card.node.parent.convertToNodeSpaceAR(worldPosition);
        // step3. 在牌的局部空间坐标执行动画
        let duration = isFast ? 0 : 0.3;
        card.node.runAction(
            cc.sequence(cc.spawn(
                cc.callFunc(card.reset.bind(card)),
                cc.moveTo(duration, localPosition).easing(cc.easeOut(2.0)),
                cc.scaleTo(duration, dstScale),
            ), cc.callFunc(() => {
                card.node.setParent(null);
                card.node.setPosition(0, 0);
                this.cardContainer.addChild(card.node);
                callback();
            }))
        );

        // add to list
        this.cards.push(card);
    }

    // 翻牌
    public flopCards(cardsValue: string, flopIndexes: number[], isFast: boolean, callback?: () => void) {
        if (this.cards.length != this.MAX_CARD_COUNT || cardsValue.length != this.MAX_CARD_COUNT) {
            return;
        }

        let interval = isFast ? 0 : 1;
        let delay = 0;

        for (let index of flopIndexes) {
            this.scheduleOnce(() => {
                this.cards[index].flop(cardsValue.charAt(index));

            }, delay);
            delay += interval
        }
        if (callback) {
            this.scheduleOnce(callback, delay);
        }
    }

    // 清除牌数据
    public cleanCards() {
        this.unscheduleAllCallbacks();
        this.cards = [];
    }
}
