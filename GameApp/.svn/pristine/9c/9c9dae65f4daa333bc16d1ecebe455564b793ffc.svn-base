// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    PkNode: cc.Node = null;

    @property(cc.Label)
    RotiaNum: cc.Label = null;

    @property(cc.Label)
    PkNum: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.drawLine();
    }
    //填充数据  添加点击方法
    public setState(data: any) {
        this.RotiaNum.string = data.ann;
        this.PkNum.string = data.num;
    }

    private drawLine() {
        this.PkNode.addComponent(cc.Graphics);
        let ctx = this.PkNode.getComponent(cc.Graphics);
        ctx.strokeColor.fromHEX("#85A0E4");
        ctx.lineWidth = 1;
        let width = this.PkNode.width,
            height = this.PkNode.height;
        console.log(ctx);
        ctx.moveTo(-width / 2, height / 2);
        ctx.lineTo(width / 2, height / 2);
        ctx.stroke();
    }

    // update (dt) {}
}
