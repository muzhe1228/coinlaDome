// 适配宽度组件

const {ccclass, property} = cc._decorator;


@ccclass
export default class FitWidth extends cc.Component {

    // 左右外边距
    @property(Number)
    public leftMinMargin: number = 0;

    @property(Number)
    public rightMinMargin: number = 0;

    // 是否保持宽高比
    @property(cc.Boolean)
    public keepAspectRatio: boolean = false;

    // 原始宽度
    private widthOrigin: number = null;

    // 宽高比
    private aspectRatio: number = null;

    onLoad() {
        this.widthOrigin = this.node.width;
        this.aspectRatio = this.node.width / this.node.height;
        if (this.node.parent.name == "Canvas") {
            this.updateWidth();
        } else {
            // 监听父节点尺寸出现变化
            this.node.parent.on(cc.Node.EventType.SIZE_CHANGED, this.updateWidth, this);
        }
    }

    // 更新宽度
    public updateWidth() {
        let parentWidth = this.node.parent.width;
        // 父节点宽度减去外边距后的可容纳宽度
        let containWidth = parentWidth - this.leftMinMargin - this.rightMinMargin;
        if (containWidth > 0) {
            // 更新的宽度取可容纳宽度和原始宽度中的最小值
            this.node.width = Math.min(containWidth, this.widthOrigin);
            if (this.keepAspectRatio) {
                this.node.height = this.node.width / this.aspectRatio;
            }
        }
    }

}
