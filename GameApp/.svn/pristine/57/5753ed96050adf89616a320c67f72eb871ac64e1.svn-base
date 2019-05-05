// 滚动数字

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberColumn extends cc.Component {

    @property(cc.Integer)
    private initNumber: number = 0;    // 初始显示的数字

    @property(cc.Float)
    private showDuration: number = 0.5;

    @property(cc.Layout)
    private layout: cc.Layout = null;

    @property(cc.Boolean)
    private isCountDown: boolean = false;

    public showNumber: number = 0;   // 当前显示的数字

    private numbers: cc.Label[] = [];

    private numbersPosY: number[] = []; // Label的position y值

    private labelHeight: number = 0;    // 每个Label的高度

    onLoad() {
        this.initNumbers();
        this.setNumber(this.initNumber, true);
    }

    // 初始化数字
    private initNumbers() {
        this.numbers = this.layout.getComponentsInChildren(cc.Label);

        // 计算相邻数字之间的高度距离
        this.labelHeight = this.numbers[0].lineHeight;

        // 通过高度和最底部0的Y坐标，计算当前展示的是哪个数字
        let bottom0Y = this.numbers[this.numbers.length - 1].node.y;
        this.showNumber = Math.floor(Math.abs(<number>bottom0Y) / this.labelHeight);

        // 计算显示每个数字需要移动的位置
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbersPosY[i] = (i - this.showNumber) * this.labelHeight;
        }
    }

    // 设置number值
    public setNumber(num: number, force: boolean = false) {
        // 如还未初始化，则设置为初始数字
        if (!this._isOnLoadCalled) {
            this.initNumber = num;
            return;
        }
        // 判断新数值是否和之前一样，可以强制滚动
        if (num == this.showNumber && !force) {
            return;
        }

        // 计算需要显示的数字的index
        let showIndex: number;
        let numCount = this.numbers.length - 1;
        if (num >= numCount || num < 0) {
            num = 0;
        }
        // 注意有两个位置的0, 由于是往下滚动,所以计算位置0的时候是以 bottom 0, top 0用于过渡,
        showIndex = this.isCountDown ? num : numCount - num;
        let destPosY = this.numbersPosY[showIndex];

        this.renderNumber(destPosY);

        this.showNumber = num;
    }

    public setColor(color: cc.Color) {
        for (let label of this.numbers) {
            label.node.color = color;
        }
    }

    // number 渲染动画
    // 这里动画最好用moveTo， 通过开始计算好位置偏差，直接移动到指定位置，避免使用moveBy需要大量的状态变量，
    // 避免在动画为执行完时再次执行出现一些奇怪的bug
    private renderNumber(destPosY: number) {

        // 停止之前动画
        this.layout.node.stopAllActions();

        // 计算移动
        let currPosY = this.layout.node.y;

        // 如果目标位置小于当前位置,则直接向下移动到当前位置即可
        if (destPosY < currPosY) {
            this.layout.node.runAction(
                cc.moveTo(this.showDuration, cc.v2(0, destPosY))
            );
        } else {
            // 先移动到最上层0的位置，然后在调整layout的y,继续后续移动
            // step1. 计算移动到top 0的距离
            let top0Y = this.numbersPosY[0];
            let height1 = Math.abs(currPosY - top0Y);

            // step2. 计算目标位置和bottom 0的距离
            let bottom0Y = this.numbersPosY[this.numbersPosY.length - 1];
            let height2 = Math.abs(bottom0Y - destPosY);

            // step3. 计算两阶段动画时间
            let duration1 = (height1 * this.showDuration) / (height1 + height2);
            let duration2 = this.showDuration - duration1;

            // step4. 执行动画
            this.layout.node.runAction(
                cc.sequence(
                    cc.delayTime(0.01),
                    cc.moveTo(duration1, cc.v2(0, top0Y)),      // 第一阶段动画
                    cc.moveTo(0, cc.v2(0, bottom0Y)),           // 切换到bottom 0
                    cc.moveTo(duration2, cc.v2(0, destPosY))    // 第二阶段动画
                )
            );
        }
    }
}
