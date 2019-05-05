import ScrollNumber from "../view/ScrollNumber";
import BankerProfitInfo from "../model/BankerProfitInfo";

// 收益信息控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class ProfitController extends cc.Component {

    @property(cc.Node)
    private roundProfit: cc.Node = null;

    @property(ScrollNumber)
    private roundScrollNumber: ScrollNumber = null;

    @property(cc.Node)
    private roundPk: cc.Node = null;

    private readonly COLOR_WIN = new cc.Color(86, 255, 142);
    private readonly COLOR_LOSS = new cc.Color(255, 72, 72);

    @property(cc.Node)
    private bankerProfit: cc.Node = null;

    @property(ScrollNumber)
    private bankerScrollNumber: ScrollNumber = null;

    @property(cc.Label)
    private bankerMaxWinNumber: cc.Label = null;

    @property(cc.Label)
    private bankerText: cc.Label = null;

    public renderRoundProfit(profit: number) {
        this.roundProfit.active = true;
        if (profit > 0) {
            this.roundScrollNumber.setColor(this.COLOR_WIN);
            this.roundPk.color = this.COLOR_WIN;
        } else {
            this.roundScrollNumber.setColor(this.COLOR_LOSS);
            this.roundPk.color = this.COLOR_LOSS;
        }
        this.roundScrollNumber.setNumber(profit);
    }

    public resetRoundProfit() {
        if (!this.roundProfit.active)
            return;
        this.roundScrollNumber.setNumber(0);
        this.roundProfit.active = false;
    }

    public renderBankerProfit(bankerProfit: BankerProfitInfo) {
        this.bankerProfit.active = true;

        // 当单局最高赢大于0时才展示
        let maxWin = bankerProfit.getMaxWin();
        if (maxWin > 0) {
            this.bankerMaxWinNumber.node.parent.active = true;
            this.bankerMaxWinNumber.string = maxWin.toString() + ' PK'
        } else {
            this.bankerMaxWinNumber.node.parent.active = false;
        }

        // 总收益
        this.bankerScrollNumber.setNumber(
            bankerProfit.getProfitTotal());

        // 底部文字提示
        let isFullRounds = bankerProfit.isFullRounds();
        this.bankerText.string = isFullRounds ? '明细请在屏幕左侧查看我的投注'
            : '您的坐庄本金已低于本房间最低上庄金额 请重新竞庄';
    }

    public resetBankerProfit() {
        if (!this.bankerProfit.active)
            return;
        this.bankerScrollNumber.setNumber(0);
        this.bankerProfit.active = false;
    }
}
