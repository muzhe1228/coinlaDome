// 根据父节点变化更新Widget

const {ccclass, property} = cc._decorator;


@ccclass
export default class SizeUpdateWidget extends cc.Component {

    onLoad() {
        this.node.parent.on(cc.Node.EventType.SIZE_CHANGED,
            this.node.getComponent(cc.Widget).updateAlignment, this);
    }

}