import BankerRecordInfo from "../model/BankerRecordInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BankerRecordBlock extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    content: cc.Label = null;

    private readonly WHITE = new cc.Color().fromHEX("#FFFFFF");

    private readonly RED = new cc.Color().fromHEX("#FF1D1D");

    private readonly GREEN = new cc.Color().fromHEX("#56FF8E");

    public render(info: BankerRecordInfo) {
        this.title.string = `第 ${info.getRound().toString()} 局`;
        if (!info.hasProfit()) {
            this.content.string = "未开始";
            this.content.node.color = this.WHITE;
        } else {
            let profit = info.getProfit();
            if (profit == 0) {
                this.content.string = profit.toString();
                this.content.node.color = this.WHITE;
            } else if (profit > 0) {
                this.content.string = "+" + profit.toString();
                this.content.node.color = this.GREEN;
            } else {
                this.content.string = profit.toString();
                this.content.node.color = this.RED;
            }
        }
    }
}
