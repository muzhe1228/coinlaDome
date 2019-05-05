/**
 *  扩展Mask遮罩组件，可以产生特殊形状的遮罩层
 *  支持圆角矩形、左右圆形的长条
 *  使用：和原生Mask一样添加到节点中选择Type和对应参数即可
 */

const { ccclass, property } = cc._decorator;

export enum ExtType { ROUND_RECT, ROUND_BAR }


@ccclass
export default class ExtMask extends cc.Mask {

    @property({
        override: true, type: cc.Enum(ExtType),
        tooltip: "遮罩类型：ROUND_RECT: 圆角矩形；ROUND_BAR：左右圆形的长条"
    })
    private _type: ExtType = ExtType.ROUND_RECT;

    @property({ override: true, type: cc.Enum(ExtType) })
    // @ts-ignore
    private set type(t: ExtType) {
        this._type = t;
        this.typeChanged();
        this._updateGraphics();
    }

    // @ts-ignore
    private get type(): ExtType {
        return this._type
    }

    @property({ type: cc.Float, tooltip: "矩形的圆角半径" })
    private _radius: number = 0;

    @property({ type: cc.Float, visible: true })
    private set radius(n: number) {
        this._radius = n;
        this._updateGraphics();
    }

    private get radius(): number {
        return this._radius
    }

    private _updateGraphics() {
        // @ts-ignore
        let graphics: cc.Graphics = this._graphics;
        if (!graphics) {
            return;
        }
        graphics.clear(false);
        // 定位节点的左下角作为起点
        let width = this.node.width;
        let height = this.node.height;
        let x = -width * this.node.anchorX;
        let y = -height * this.node.anchorY;

        if (this.type == ExtType.ROUND_RECT) {
            graphics.roundRect(x, y, width, height, this.radius);
            graphics.fill();
        } else if (this.type == ExtType.ROUND_BAR) {
            let radius = height / 2;
            graphics.circle(x + radius, y + radius, radius);
            graphics.circle(x + width - radius, y + radius, radius);
            graphics.rect(x + radius, y, width - radius * 2, height);
            graphics.fill();
        }
    }

    private typeChanged() {
        // @ts-ignore
        cc.Class.attr(this, "radius", {
            visible: this.type == ExtType.ROUND_RECT,
        });
    }

    // 以下是隐藏cc.Mask原本的属性
    @property({ override: true, visible: false })
    private _segements: number = 0;

    @property({ override: true, visible: false })
    private set segements(value: any) {
    }

    private get segements() {
        return this._segements
    }

    @property({ override: true, visible: false })
    private _spriteFrame: number = 0;

    @property({ override: true, visible: false })
    private set spriteFrame(value: any) {
    }

    private get spriteFrame() {
        return this._spriteFrame
    }

    @property({ override: true, visible: false })
    private _alphaThreshold: number = 0;

    @property({ override: true, visible: false })
    private set alphaThreshold(value: any) {
    }

    private get alphaThreshold() {
        return this._alphaThreshold
    }

    @property({ override: true, visible: false })
    private _srcBlendFactor: number = 0;

    @property({ override: true, visible: false })
    private set srcBlendFactor(value: any) {
    }

    private get srcBlendFactor() {
        return this._srcBlendFactor
    }

    @property({ override: true, visible: false })
    private _dstBlendFactor: number = 0;

    @property({ override: true, visible: false })
    private set dstBlendFactor(value: any) {
    }

    private get dstBlendFactor() {
        return this._dstBlendFactor
    }

}
