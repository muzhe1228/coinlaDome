import BaseComponent from "./BaseComponent";
import CardGroupController from "../controller/CardGroupController";
import CardGroupResult from "../view/CardGroupResult";
import Card from "../view/Card";

// cards & niu result compoents

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardsAndResultComponent extends BaseComponent {

    @property(CardGroupController)
    protected cardGroup: CardGroupController = null;

    @property(CardGroupResult)
    protected cardResult: CardGroupResult = null;

    // 渲染发牌
    public renderSendCard(card: Card, isFast: boolean, callback: () => void = ()=>{}) {
        this.cardGroup.obtainCard(card, isFast, callback);
    }

    // 渲染翻牌
    public renderCards(cards: string, flopIndexes: number[], isFast: boolean, callback?: () => void) {
        this.cardGroup.flopCards(cards, flopIndexes, isFast, callback);
    }

    // 渲染牛牛结果
    public renderCardResult(sprite: cc.Sprite, result: string, isFast: boolean) {
        this.cardResult.obtainResultSprite(sprite, result, isFast);
    }

    // 清空牌和牛牛结果
    public cleanCardsAndResult() {
        this.cardGroup.cleanCards();
        this.cardResult.clearResult();
    }

}