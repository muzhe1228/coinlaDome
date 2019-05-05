import ScrollNumber from "../view/ScrollNumber";
import BankerInfo from "../model/BankerInfo";
import CardsAndResultComponent from "../utils/CardsAndResultComponent";

// 庄家信息

const {ccclass, property} = cc._decorator;

@ccclass
export default class BankerController extends CardsAndResultComponent {

    @property(cc.Label)
    private nick: cc.Label = null;

    @property(cc.Sprite)
    private head: cc.Sprite = null;

    @property(cc.Label)
    private round: cc.Label = null;

    @property(ScrollNumber)
    private scrollNumber: ScrollNumber = null;

    private isShow: boolean = false;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        
    }

    // update (dt) {}

    public getHeaderWorldPosition() : cc.Vec2 {
        let pos = this.head.node.position;
        return this.head.node.parent.convertToWorldSpaceAR(pos);
    }

    public render(bankerInfo: BankerInfo) {
        this.nick.string = bankerInfo.getNickname();
        this.loadRemoteSprite(bankerInfo.getHeadUrlPath(), this.head);
        this.round.string = "[" + bankerInfo.getBankerRound() + "/" + bankerInfo.getMaxRound() + "]";
        this.scrollNumber.setNumber(bankerInfo.getBankerBalance());

        // 执行动画
        this.showAction(true);
    }

    public close() {
        this.showAction(false);
    }

    private showAction(show: boolean) {
        if (this.isShow == show) {
            return;
        }
        this.isShow = show;
        if (show) {
            let action = cc.moveBy(0.5, cc.v2(0, -this.node.height))
                .easing(cc.easeBackOut());
            this.node.runAction(action);
        } else {
            let action = cc.moveBy(0.5, cc.v2(0, this.node.height))
                .easing(cc.easeBackIn());
            this.node.runAction(action);
        }
    }
}
