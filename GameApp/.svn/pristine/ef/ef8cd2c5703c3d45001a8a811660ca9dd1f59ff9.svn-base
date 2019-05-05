import ScrollNumber from "../view/ScrollNumber";
import FlyChip from "../view/FlyChip";
import ChipAreaController from "./ChipAreaController";
import {UserBetPositionItem} from "../model/UserBetInfo";
import CardsAndResultComponent from "../utils/CardsAndResultComponent";

// 下注区域控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetAreaController extends CardsAndResultComponent {

    @property(ScrollNumber)
    private totalBetScroll: ScrollNumber = null;

    @property(cc.Node)
    private totalPkNode: cc.Node = null;

    // 筹码随机选择该区域
    @property(cc.Node)
    private betSpriteArea: cc.Node = null;

    // 点击下注node
    @property(cc.Node)
    public chipArea: cc.Node = null;

    @property(cc.Node)
    private myBetNode: cc.Node = null;

    @property(ScrollNumber)
    private myBetScroll: ScrollNumber = null;

    @property(cc.Button)
    public cleanMyBet: cc.Button = null;

    @property(cc.Node)
    private betBackground: cc.Node = null;

    @property(cc.Label)
    private pkLabel: cc.Label = null;

    @property(cc.Sprite)
    private numberSprite: cc.Sprite = null;

    @property(cc.Prefab)
    private flyChip: cc.Prefab = null;

    // 赢的动画
    @property(cc.Animation)
    private winAnim: cc.Animation = null;

    // 我已经下注的pk值
    private myBetValue: number = 0;

    // 我准备下注的pk值
    private myWantBetValue: number = 0;
    private myWantBetChips: number[] = [];

    // 下注区所有人投注的总价值
    private totalBetValue: number = 0;

    private readonly COLOR_BET = new cc.Color(243, 215, 130);

    // 是否允许下注, 自己是庄或者不是下注阶段 不允许下注
    private canBet: boolean = false;

    private betCheckCallback: (wantBet: number) => boolean = null;

    onLoad() {
        this.cleanMyBet.node.on(cc.Node.EventType.TOUCH_END, this.cleanWantedBetValue, this);
        // 注册事件监听
        this.chipArea.on(cc.Node.EventType.TOUCH_END, this.onTouchChipArea, this);

        this.registerReuseableNode("FlyChip", this.flyChip);
    }

    onDestroy() {
        super.onDestroy();
        // 注销事件监听
        this.chipArea.off(cc.Node.EventType.TOUCH_END);
        // this.cleanMyBet.node.off("click");
        this.chipArea.off("message-click");
        // this.cleanMyBet.node.off("message-click");
    }

    // 点击事件回调
    public onTouchChipArea(event) {
        let betValue = ChipAreaController.selectedChipValue;
        if (this.canBet) {
            let result = true;
            if (this.betCheckCallback != null) {
                result = this.betCheckCallback(betValue);
            }
            if (result) {
                this.playRemoteEffect("sounds/界面交互点击.mp3");
                this.renderMyBet(ChipAreaController.selectedChipValue);
            }
        }
    }

    public setBetCheckCallback(func: (wantBet: number) => boolean) {
        this.betCheckCallback = func;
    }

    // 渲染下注
    public renderBet(betPositionItem: UserBetPositionItem,
                     chipWorldPosition: cc.Vec2,
                     isMyself: boolean = false,
                     chips: number[] = []) {
        this.totalPkNode.active = true;
        let totalBets = betPositionItem.getTotalBets();
        this.totalBetScroll.setNumber(totalBets);
        this.totalBetValue = totalBets;

        // 渲染筹码飞行动画
        if (isMyself) {
            if (this.myWantBetChips.length > 0) {
                // 通过自己下注的筹码信息来渲染
                for (let chip of this.myWantBetChips) {
                    this.renderBetAction(chip, chipWorldPosition);
                }
            } else {
                // 首次加载没有记录下注信息时使用分解筹码方式渲染
                for (let chip of chips) {
                    this.renderBetAction(chip, chipWorldPosition);
                }
            }
        } else {
            for (let chip of chips) {
                this.renderBetAction(chip, chipWorldPosition);
            }
        }

        // play audio
        this.playRemoteEffect("sounds/飞筹码.mp3");

        if (isMyself && betPositionItem.getMyBets() > 0) {
            //清空待下注信息
            this.myWantBetValue = 0;
            this.myWantBetChips = [];
            this.cleanMyBet.node.active = false;
            this.betBackground.active = false;

            // 更新我已经下注的pk值
            this.myBetValue = betPositionItem.getMyBets();
            this.myBetNode.active = true;
            this.myBetScroll.setNumber(this.myBetValue);
            this.myBetScroll.setColor(this.COLOR_BET);
            this.pkLabel.node.color = this.COLOR_BET;
        }
    }

    // 渲染结算飞筹码
    public renderBetToOnePosition(worldPositionBanker: cc.Vec2) {
        if (!this.betSpriteArea.childrenCount)
            return;
        let localPosition = this.betSpriteArea.convertToNodeSpaceAR(worldPositionBanker);
        for (let chipNode of this.betSpriteArea.children) {
            chipNode.runAction(cc.sequence(
                cc.delayTime(Math.random() / 5),
                cc.moveTo(0.5, localPosition).easing(cc.easeIn(2)),
                cc.fadeTo(0.15, 0)
            ));
        }
        this.playRemoteEffect("sounds/飞筹码.mp3");
    }

    public renderBetToTwoPosition(worldPositionPlayers: cc.Vec2, worldPositionMyself: cc.Vec2) {
        if (!this.betSpriteArea.childrenCount)
            return;

        let percent = 1;
        if (this.myBetValue > 0) {
            // 一半筹码飞像玩家列表，一半飞向自己
            percent = 0.5;
        }

        let counts = this.betSpriteArea.childrenCount;
        let partPlayers = Math.floor(counts * percent);

        let localPositionPlayers = this.betSpriteArea.convertToNodeSpaceAR(worldPositionPlayers);
        let localPositionMyself = this.betSpriteArea.convertToNodeSpaceAR(worldPositionMyself);

        for (let i = 0; i < counts; i++) {
            let chipNode = this.betSpriteArea.children[i];
            if (i < partPlayers) {
                chipNode.runAction(cc.sequence(
                    // 加入随机延迟，使所有筹码不是同时移动
                    cc.delayTime(Math.random() / 5),
                    cc.moveTo(0.5, localPositionPlayers).easing(cc.easeIn(2)),
                    cc.fadeTo(0.15, 0)
                ));
            } else {
                chipNode.runAction(cc.sequence(
                    cc.delayTime(Math.random() / 5),
                    cc.moveTo(0.5, localPositionMyself).easing(cc.easeIn(2)),
                    cc.fadeTo(0.15, 0)
                ));
            }
        }
        this.playRemoteEffect("sounds/飞筹码.mp3");
    }

    // 渲染我下注的pk
    public renderMyBet(betValue: number) {
        this.myBetNode.active = true;
        this.myWantBetValue += betValue;
        this.myWantBetChips.push(betValue);
        this.myBetScroll.setNumber(this.myWantBetValue);
        this.myBetScroll.setColor(cc.Color.WHITE);
        this.pkLabel.node.color = cc.Color.WHITE;
        this.cleanMyBet.node.active = true;
        this.betBackground.active = true;
    }

    // 还原下注
    public resetBet() {
        this.totalPkNode.active = true;
        this.totalBetScroll.setNumber(0);
        this.totalBetValue = 0;
        //this.betSpriteArea.removeAllChildren();
        this.releaseAllChildren("FlyChip", this.betSpriteArea);

        this.myWantBetValue = 0;
        this.myWantBetChips = [];
        this.myBetValue = 0;
        this.myBetNode.active = false;
        this.cleanMyBet.node.active = false;

        this.stopWinAnim();
    }

    // 我的预下注值
    public getMyWantBetValue(): number {
        return this.myWantBetValue;
    }

    // 下注区已经下注的总值
    public getTotalBetValue() {
        return this.totalBetValue;
    }

    // 设置是否可以下注
    public setCanBet(b: boolean) {
        this.canBet = b;
        if (!b) {
            this.cleanWantedBetValue();
        }
    }

    public getCanBet() {
        return this.canBet;
    }

    public setAreaNumber(n: number) {
        this.loadResSprite('2x/bg/area_' + n.toString(), this.numberSprite);
    }

    // 清空下注
    public cleanWantedBetValue() {
        this.myWantBetValue = 0;
        this.myWantBetChips = [];
        this.cleanMyBet.node.active = false;
        if (this.myBetValue > 0) {
            this.myBetNode.active = true;
            this.betBackground.active = false;
            // 渲染已经下注的pk值
            this.myBetScroll.setNumber(this.myBetValue);
            this.myBetScroll.setColor(this.COLOR_BET);
            this.pkLabel.node.color = this.COLOR_BET;
        } else {
            // 如果之前没有下注，则隐藏此节点
            this.myBetNode.active = false;
        }
    }

    // 获取随机一个位置
    private getRandomPosition(): cc.Vec2 {
        let width = this.betSpriteArea.width;
        let height = this.betSpriteArea.height;
        let posX = (Math.random() - 0.5) * width;
        let posY = (Math.random() - 0.5) * height;
        return new cc.Vec2(posX, posY);
    }

    // 筹码飞行动画
    public renderBetAction(chipValue: number, chipWorldPosition: cc.Vec2) {
        let dstPosition = this.getRandomPosition();
        // step1. 先计算筹码世界空间下到筹码区局部空间的坐标
        let localChipPosition = this.betSpriteArea.convertToNodeSpaceAR(chipWorldPosition);

        let flyChip = this.getReusableNode("FlyChip");

        flyChip.getComponent(FlyChip).setChip(chipValue);
        flyChip.opacity = 0;

        // step2. 添加筹码
        this.betSpriteArea.addChild(flyChip);
        // step3. 设置局部空间坐标
        flyChip.position = localChipPosition;
        // step4. 局部空间下执行动作
        flyChip.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveTo(0.5, dstPosition).easing(cc.easeOut(2.0)),
                    cc.fadeTo(0.15, 255)
                ),
                cc.callFunc(() => {
                    flyChip.position = dstPosition;
                })
            )
        );
    }

    public playWinAnim() {
        this.winAnim.node.active = true;
        this.winAnim.play();
    }

    public stopWinAnim() {
        this.winAnim.stop();
        this.winAnim.node.active = false;
    }

}
