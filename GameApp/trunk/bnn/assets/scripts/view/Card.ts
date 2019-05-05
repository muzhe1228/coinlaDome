// 扑克牌

const { ccclass, property } = cc._decorator;

@ccclass
export default class Card extends cc.Component {
    // 牌背
    @property(cc.Sprite)
    private cardBack: cc.Sprite = null;

    // 牌面的白底
    @property(cc.Sprite)
    private cardImg: cc.Sprite = null;

    // 点数Label
    @property(cc.Label)
    private cardPoint: cc.Label = null;

    // 数字点数使用牛头图案
    @property(cc.SpriteFrame)
    private blackNiu: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private redNiu: cc.SpriteFrame = null;

    // 字母点数使用的人形图案
    @property(cc.SpriteFrame)
    private aPoint: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private bPoint: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private cPoint: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private dPoint: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private ePoint: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private fPoint: cc.SpriteFrame = null;

    private readonly RED = cc.color(235, 102, 106, 255);

    private readonly BLACK = cc.color(31, 44, 47, 255);

    // 翻牌，动态加载指定点数的牌面，并回调翻牌动画
    public flop(char: string | number, isFast?: boolean) {
        char = char.toString();
        if (char.length > 1 || char.search("[0-9A-Fa-f]") === -1) {
            throw Error("参数字符串只允许0-9或A-F");
        }

        let point: string = null;
        let pointColor: cc.Color = null;

        // 字母使用人形图案
        if (char.search("[A-Fa-f]") === 0) {
            char = char.toLowerCase();
            // 使用字符串访问属性
            this.cardImg.spriteFrame = eval("this." + char + "Point");
            let chars = ["a", "b", "c", "d", "e", "f"];
            let points = ["J", "Q", "K"];
            let index = chars.indexOf(char);
            // a c e 是红色，其他是黑色
            pointColor = index % 2 == 0 ? this.RED : this.BLACK;
            // 将字母转换为扑克点数
            point = points[Math.floor(index / 2)];
        }

        // 数字使用牛头图案，偶数是红色，奇数是黑色
        else {
            let num = parseInt(char);
            if (num % 2 === 0) {
                this.cardImg.spriteFrame = this.redNiu;
                pointColor = this.RED;
            } else {
                this.cardImg.spriteFrame = this.blackNiu;
                pointColor = this.BLACK;
            }
            point = char != "0" ? char : "10";
        }

        this.cardPoint.string = point;
        this.cardPoint.node.color = pointColor;
        if (!isFast) {
            this.flopActions();
        } else {
            this.cardBack.node.active = false;
        }
    }

    // 还原牌
    public reset() {
        this.cardBack.node.active = true;
    }

    // 翻牌动画
    private flopActions() {
        let scaleX = this.node.scaleX;
        let scaleY = this.node.scaleY;

        let face = cc.callFunc(() => {
            this.cardBack.node.active = false;
            this.node.runAction(
                cc.sequence(cc.flipX(true), cc.scaleTo(0.25, scaleX, scaleY))
            );
        }, this);

        this.node.runAction(
            cc.spawn(
                cc.scaleTo(0.5, -scaleX, scaleY),
                cc.sequence(cc.delayTime(0.25), face)
            )
        );
    }
}
