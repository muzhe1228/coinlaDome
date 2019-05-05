// 投注记录单元格

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    topLabel: cc.Label = null;

    @property(cc.Node)
    botLabel: cc.Node = null;
    
    @property(cc.Node)
    botLabelIcon: cc.Node = null;

    @property(cc.Label)
    botLabelSize: cc.Label = null;

    @property(cc.Label)
    outTopLabel: cc.Label = null;

    @property(cc.Node)
    outBotLabel: cc.Node = null;

    @property(cc.Node)
    outBotLabelIcon: cc.Node = null;

    @property(cc.Label)
    outBotLabelSize: cc.Label = null;

    private readonly GREEN = cc.color(0, 214, 151);
    private readonly RED = cc.color(253, 0, 0, 255);
    private readonly WRITE = cc.color(255, 255, 255, 255);

    public isOut: Boolean = false;

    onLoad () {
        // 居中
        this.outTopLabel.node.parent.y = this.node.height / 2;
    }
    public isblock(result:number){
        if(result == -1){
            this.outTopLabel.node.color = this.WRITE
            this.outBotLabelSize.node.color = this.WRITE
            this.topLabel.node.color = this.WRITE
            this.botLabelSize.node.color = this.WRITE
        }
    }
    //合并格子显示内容填充data：{bot，top，suffix，isColor}
    public setStateOut(data: any) {
        let defaultLabel = this.botLabel.parent,
            outLabel = this.outBotLabel.parent,
            suffix = "",
            Nodes;
        if (! isNaN(Number(data.bot))) {
            suffix = data.suffix || "";
        }
       
        if (this.isOut) {
            if(data.userType){
                this.botLabelIcon.active = true;
            }
            Nodes = this.botLabelSize.node;
            this.botLabelSize.string = data.bot + suffix;
            if (data.top) {
                this.topLabel.node.active = true;
                this.topLabel.string = data.top;
            }
        } else {
            if(data.userType){
                this.outBotLabelIcon.active = true;
            }
            Nodes = this.outBotLabelSize.node;
            defaultLabel.active = false;
            outLabel.active = true;
            this.outBotLabelSize.string = data.bot + suffix;
            if (data.top) {
                this.outTopLabel.node.active = true;
                this.outTopLabel.string = data.top;
            }
        }
        if (data.isColor) {
            if (Number(data.bot) > 0) {
                Nodes.color = this.GREEN;
            } else if (Number(data.bot) < 0) {
                Nodes.color = this.RED;
            }
        }
    }

    //单个不合并的格子 textBot: string, suffix?: string, isColor?: boolean
    public setState(data:any) {
        if (data.suffix && !isNaN(Number(data.bot))) {
            this.botLabelSize.string = data.bot + data.suffix;
            if (data.isColor) {
                let textColor = this.botLabelSize.node;
                if (Number(data.bot) > 0) {
                    textColor.color = this.GREEN;
                } else if (Number(data.bot) < 0) {
                    textColor.color = this.RED;
                }
            }
        } else {
            this.botLabelSize.string = data.bot;
        }
    }
}
