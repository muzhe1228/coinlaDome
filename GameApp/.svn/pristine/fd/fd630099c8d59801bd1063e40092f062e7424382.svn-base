import BaseComponent from "../utils/BaseComponent";
import BetAreaController from "./BetAreaController";
import { GameResult } from "../model/GameResult";

// 下注区域组控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetAreaGroupController extends BaseComponent {

    public betAreaList: BetAreaController[] = [];

    onLoad() {
        this.betAreaList = this.node.getComponentsInChildren(BetAreaController);

        for (let i = 0; i < this.betAreaList.length; i++) {
            // 闲123的数字背景
            this.betAreaList[i].setAreaNumber(i + 1);
            // 判断下注限制的回调
            this.betAreaList[i].setBetCheckCallback(this.checkWantBetLimit.bind(this))
        }
    }

    // 请求下注
    public requestBet(callback?: (res) => void) {
        let areaIds: number[] = [];
        let betValues: number[] = [];
        for (let i = 0; i < this.betAreaList.length; i++) {
            let betAreaController = this.betAreaList[i];
            let value = betAreaController.getMyWantBetValue();
            if (value > 0) {
                areaIds.push(i + 1);
                betValues.push(value);
            }
        }
        if (!areaIds.length) {
            this.alert("您还没有放置筹码");
            return;
        }
        this._requestBet(areaIds, betValues, callback);
    }

    private _requestBet(areaIds: number[], betValues: number[], callback?: (res) => void) {
        this.httpUtils.post(
            "/hns/niuniu/bottomPour",
            {
                token: this.getToken(),
                roomId: this.getRoomId(),
                positionId: areaIds.join(","),
                currencyNumber: betValues.join(",")
            },
            true,
            res => callback(res),
            true
        );
    }

    // 可点击下注
    public setCanBet(b: boolean) {
        for (let area of this.betAreaList) {
            area.setCanBet(b);
        }
    }

    // 赢的动画
    public playWinAnim(gameResult: GameResult) {
        let hasWin = false;
        let isBanker = this.bankerIsSelf();
        if (gameResult.xian1Win() != isBanker) {
            this.betAreaList[0].playWinAnim();
            hasWin = true;
        }
        if (gameResult.xian2Win() != isBanker) {
            this.betAreaList[1].playWinAnim();
            hasWin = true;
        }
        if (gameResult.xian3Win() != isBanker) {
            this.betAreaList[2].playWinAnim();
            hasWin = true;
        }
        if (hasWin) {
            this.playRemoteEffect("sounds/喝彩.mp3")
        }
    }

    // 重置下注数据，清空发牌，去除牌结果
    public resetAllArea() {
        for (let area of this.betAreaList) {
            area.resetBet();
            area.cleanCardsAndResult();
        }
    }

    // 去除牌结果
    public cleanCardsAndResult() {
        for (let area of this.betAreaList) {
            area.cleanCardsAndResult();
        }
    }

    // 检查是否超出下注限制
    private checkWantBetLimit(wantBet: number): boolean {
        // 本次点击的预下注与之前的预下注总和
        let myWantBet = wantBet;

        // 所有下注总额
        let totalBet = 0;

        for (let area of this.betAreaList) {
            myWantBet += area.getMyWantBetValue();
            totalBet += area.getTotalBetValue();
        }

        // 通过最大赔率计算冻结金额
        let maxOdd = BaseComponent.roomInfo &&
        BaseComponent.roomInfo.getRoomOdd().indexOf("十倍") != -1 ? 10 : 5;

        // 判断对应的冻结金额是否超出了自己的余额
        if (maxOdd * myWantBet > this.getUserBalance()) {
            this.alert("预下注对应的冻结金额超出了您的余额");
            return false
        }

        // 判断所有下注总额+我的预下注，对应的冻结金额是否超出庄家本金
        if (maxOdd * (totalBet + myWantBet) > BaseComponent.bankerInfo.getBankerBalance()) {
            this.alert("预下注金额超出了庄家赔付上限");
            return false
        }
        return true
    }

}
