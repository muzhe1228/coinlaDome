/**
 *  背部遮罩层
 *  尺寸会自适应Canvas
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackMask extends cc.Component {

    onLoad() {
        this.node.getComponent(cc.Widget).target = cc.find("/Canvas");
    }

}