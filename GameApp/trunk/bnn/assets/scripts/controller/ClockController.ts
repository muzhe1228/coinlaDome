import BaseComponent from "../utils/BaseComponent";

// 计时器

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClockController extends BaseComponent {

    @property(cc.Label)
    private timeLabel: cc.Label = null;

    @property(cc.Sprite)
    private background: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    private clockAtlas: cc.SpriteAtlas = null;

    @property(Number)
    private defaultTime: number = 20;

    private time: number = 0;

    private spriteFrames: cc.SpriteFrame[] = [null, null, null, null];

    onLoad() {
        this.preloadResSpriteFrames();
        this.resetTime();
    }

    // 设置倒计时
    public setCountdown(t: number) {
        this.timeLabel.node.opacity = 255;
        this.time = Math.max(0, Math.ceil(t));
        let endTime = Date.now() + this.time * 1000;

        // 取消计时器
        this.unscheduleAllCallbacks();

        // 链式计时器，每过一秒回调一次，计算与终止时间的间隔
        let nextTime = () => {
            this.scheduleOnce(() => {
                this.time = Math.max(0,
                    Math.ceil((endTime - Date.now()) / 1000));
                this.showTime();
                if (this.time > 0)
                    nextTime();
            }, 1);
        };
        nextTime();

        // 立即显示一次
        this.showTime();
    }

    // 重置时钟
    public resetTime() {
        this.time = this.defaultTime;
        this.showTime();
    }

    // 展示当前的时间
    private showTime() {
        let audioUrl: string;

        if (this.time <= 5) {
            this.timeLabel.node.color = cc.Color.RED;
            // play audio
            if (this.time === 0) {
                audioUrl = "audio/clock/ding";
            } else {
                audioUrl = "audio/clock/" + this.time.toString();
            }
            this.playEffect(audioUrl);
        } else {
            this.timeLabel.node.color = cc.Color.WHITE;
        }

        if (this.time <= 9) {
            this.timeLabel.string = "0" + this.time;
        } else {
            this.timeLabel.string = this.time.toString();
        }

        // 背景轮盘动态转动
        if (this.spriteFrames.indexOf(null) != -1)
            return;
        if (this.time === 0) {
            this.background.spriteFrame = this.spriteFrames[0];
        } else {
            this.background.spriteFrame = this.spriteFrames[this.time % 4];
        }
    }

    private preloadResSpriteFrames() {
        for (let i = 1; i <= 4; i++) {
            this.spriteFrames[i - 1] = this.clockAtlas.getSpriteFrame(
                "clock_" + i.toString())
        }
    }

}
