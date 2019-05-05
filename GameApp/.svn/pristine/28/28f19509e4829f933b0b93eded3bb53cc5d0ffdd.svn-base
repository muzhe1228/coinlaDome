// 系统提示控制器

import BaseComponent from "../utils/BaseComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TipController extends BaseComponent {

    // 开始下注精灵
    @property(cc.Node)
    public startBet: cc.Node = null;

    // 带有庄家名字的开始下注，用于刚上庄时提示闲家
    @property(cc.Node)
    public startBetWithBanker: cc.Node = null;

    // 带庄家名字的富文本
    @property(cc.RichText)
    public bankerName: cc.RichText = null;

    // 停止下注精灵
    @property(cc.Node)
    public stopBet: cc.Node = null;

    // 闲家开始下注，向庄家显示
    @property(cc.Node)
    public startBetForBanker: cc.Node = null;

    // 向庄家自己显示已经上庄成功
    @property(cc.Node)
    public becomeBanker: cc.Node = null;

    // 开始竞庄，下庄时向闲家显示
    @property(cc.Node)
    public bidBanker: cc.Node = null;

    // 庄家通杀通赔的总节点
    @property(cc.Node)
    private bankerAllNode: cc.Node = null;

    // 庄家通杀通赔 左边庄家Tip
    @property(cc.Sprite)
    private bankerAllLeft: cc.Sprite = null;

    // 庄家通杀通赔 右边通杀通赔Tip
    @property(cc.Sprite)
    private bankerAllRight: cc.Sprite = null;

    // 庄家通杀通赔的替换图片
    @property(cc.SpriteFrame)
    private bankerAllWin: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private bankerAllLose: cc.SpriteFrame = null;

    // 庄家通杀通赔 背景光环
    @property(cc.Sprite)
    private bankerAllHalo: cc.Sprite = null;

    // 庄家通杀通赔 背景旋转光芒
    @property(cc.Sprite)
    private bankerAllShine: cc.Sprite = null;

    // 左右Tips动画终止的坐标
    private bankerAllLeftPos: cc.Vec2 = null;
    private bankerAllRightPos: cc.Vec2 = null;

    // 庄家通杀通赔的音效
    private bankerAllWinAudio: cc.AudioClip = null;
    private bankerAllLoseAudio: cc.AudioClip = null;

    // 当前展示的Tip
    private currentShowTip: cc.Node = null;

    onLoad() {
        // 记录左右Tips现在的X坐标，作为动画终止的坐标
        this.bankerAllLeftPos = this.bankerAllLeft.node.position;
        this.bankerAllRightPos = this.bankerAllRight.node.position;
        this.loadRemoteAudioClip("sounds/庄家通杀.mp3",
            clip => {
                this.bankerAllWinAudio = clip
            });
        this.loadRemoteAudioClip("sounds/庄家通赔.mp3",
            clip => {
                this.bankerAllLoseAudio = clip
            });
    }

    // 显示 Tip 动画
    public showTip(node: cc.Node, exclusive = false) {
        // 先隐藏当前有显示的Tip
        if (this.currentShowTip) {
            this.hideTip(this.currentShowTip)
        }
        node.active = true;
        node.opacity = 0;
        node.scale = 0.2;
        // 弹出两秒后收起
        node.runAction(
            cc.sequence(
                cc.spawn(cc.fadeTo(0.2, 255), cc.scaleTo(0.2, 1.0)),
                cc.delayTime(2),
                cc.callFunc(this.hideTip.bind(this, node))
            )
        );
        // 如果没有排除，则记录当前显示的Tip
        if (!exclusive) {
            this.currentShowTip = node
        }
    }

    // 隐藏 Tip 动画
    public hideTip(node: cc.Node, action: boolean = true) {
        if (this.currentShowTip == node) {
            this.currentShowTip = null;
        }
        node.stopAllActions();
        if (action) {
            node.runAction(
                cc.sequence(
                    cc.spawn(cc.fadeTo(0.2, 0), cc.scaleTo(0.2, 0.2)),
                    cc.callFunc(() => {
                        node.active = false;
                        node.opacity = 255;
                        node.scale = 1;
                    })
                )
            );
        } else {
            node.active = false;
        }
    }

    public clearTip() {
        if (this.currentShowTip) {
            this.hideTip(this.currentShowTip, false);
        }
    }

    public setBankerName(name: string) {
        this.bankerName.string = "<i>玩家 " + name + " 上庄<i>";
    }

    public showBankerAllWinOrLoseTip(allWin: boolean) {
        // 先隐藏光芒
        this.bankerAllHalo.node.opacity = 0;
        this.bankerAllShine.node.opacity = 0;

        // 替换通杀或通赔的图片
        this.bankerAllRight.spriteFrame = allWin ? this.bankerAllWin : this.bankerAllLose;

        // 获取场景节点
        let canvas = cc.find('Canvas');
        // 将左右Tips移到场景范围之外
        let outPosX = canvas.width / 2 + 100;
        this.bankerAllLeft.node.x = -outPosX;
        this.bankerAllRight.node.x = outPosX;

        this.bankerAllNode.active = true;

        // 左右Tips向中间移动的动画
        let moveDuration = 0.3;
        let show = (node: cc.Node, pos: cc.Vec2) => {
            let moveTo = cc.moveTo(moveDuration, pos).easing(cc.easeBackOut());
            node.runAction(moveTo)
        };
        show(this.bankerAllLeft.node, this.bankerAllLeftPos);
        show(this.bankerAllRight.node, this.bankerAllRightPos);

        // 光环和光芒动画
        let fadeIn = cc.sequence(
            cc.scaleTo(0, 0.2),
            cc.delayTime(moveDuration * 0.9),
            cc.spawn(
                cc.fadeIn(0.1),
                cc.scaleTo(0.1, 1)
            )
        );

        // 音效
        this.scheduleOnce(() => {
            if (allWin) {
                this.playEffect(this.bankerAllWinAudio);
            } else {
                this.playEffect(this.bankerAllLoseAudio);
            }
        }, 0.2);

        this.bankerAllHalo.node.runAction(fadeIn.clone());
        this.bankerAllShine.node.runAction(
            cc.sequence(
                fadeIn.clone(),
                // 光芒旋转
                cc.rotateBy(5, 30).easing(cc.easeBounceOut())
            )
        );

        // 定时隐藏
        this.scheduleOnce(() => {
            this.bankerAllShine.node.stopAllActions();
            this.hideTip(this.bankerAllNode)
        }, 2);

        this.currentShowTip = this.bankerAllNode;
    }
}
