// 手动指定 zIndex 的组件

const {ccclass, property} = cc._decorator;


@ccclass
export default class SetZIndex extends cc.Component {

    @property(Number)
    private zIndex: number = 0;

    onLoad() {
        if (this.zIndex != 0) {
            this.node.zIndex = this.zIndex;
        }
    }

}