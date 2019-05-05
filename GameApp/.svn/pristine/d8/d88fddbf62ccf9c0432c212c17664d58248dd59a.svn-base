import PlayerOther from "../view/PlayerOther";
import ScrollNumber from "../view/ScrollNumber";
import PlayerHeader from "../model/PlayerHeader";
import BaseComponent from "../utils/BaseComponent";

/**
 * 其他用户头像区域
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayersController extends BaseComponent {

    @property(ScrollNumber)
    private scrollNumber: ScrollNumber = null;

    @property(cc.Node)
    private headersNode: cc.Node = null;

    @property(cc.Prefab)
    private playerOther: cc.Prefab = null;

    private headerNodeList: cc.Node[] = [];
    private headerRadius: number = 32;
    private _maxHeaderCount: number = 6;

    onLoad() {
        this.registerReuseableNode("PlayerOther", this.playerOther);
        this.headersNode.removeAllChildren();
    }

    public get maxHeaderCount() {
        return this._maxHeaderCount;
    }

    public set maxHeaderCount(value: number) {
        let sub = this._maxHeaderCount - value;
        while (sub-- > 0) {
            this.removeHeaderWithAction()
        }
        this._maxHeaderCount = value;
    }

    public render(playerHeader: PlayerHeader) {
        this.scrollNumber.node.parent.active = true;
        this.scrollNumber.setNumber(playerHeader.getPlayerNum());

        // 头像列表
        if (playerHeader.GetType() == 0) {
            this.renderListWithAction(playerHeader);
        } 
        // 单个头像
        else if (playerHeader.GetType() == 1) {
            // add head
            this.renderHeaderWithAction(playerHeader);
        }
    }

    // 获取随机一个头像位置并转化成世界坐标
    public getRandomHeaderWorldPosition(): cc.Vec2 {
        let pos;
        if (this.headersNode.childrenCount == 0) {
            pos = new cc.Vec2(0, 0);
        } else {
            let children = this.headersNode.children;
            pos = children[Math.floor(Math.random() * children.length)].position;
        }
        return this.headersNode.convertToWorldSpaceAR(pos);
    }

    // 渲染头像列表
    private renderListWithAction(data: PlayerHeader) {
        for (let i = 0; i < data.getPlayerHeadList().length; i++) {
            let headItem = data.getPlayerHeadList()[i];

            let playerHeader = this.getReusableNode("PlayerOther");

            playerHeader.getComponent(PlayerOther).setHeaderWithImageUrl(
                headItem.getHeadUrlPath());

            this.addHeaderWithAction(playerHeader);
        }
    }

    // 渲染单个头像
    private renderHeaderWithAction(data: PlayerHeader) {
        let playerHeader = this.getReusableNode("PlayerOther");
        // 加载头像后回调动画
        playerHeader.getComponent(PlayerOther).setHeaderWithImageUrl(
            data.getHeadUrlPath(), () => {
                this.addHeaderWithAction(playerHeader);
            }
        );
    }

    // 添加头像动画
    private addHeaderWithAction(playerHeader: cc.Node) {
        // 如果已经超过最大值, 则同时删除第一个
        if (this.headerNodeList.length >= this.maxHeaderCount) {
            this.removeHeaderWithAction();
        }
        playerHeader.active = true;
        // 设定head 动画的起始位置
        playerHeader.setPosition(-(this.headerNodeList.length + 2) * this.headerRadius, 0);
        playerHeader.opacity = 0;

        playerHeader.runAction(
            cc.spawn(
                cc.moveBy(0.5, cc.v2(this.headerRadius, 0)),
                cc.fadeTo(0.5, 255)
            )
        );

        this.headerNodeList.push(playerHeader);
        this.headersNode.addChild(playerHeader);
    }

    // 删除头像动画
    private removeHeaderWithAction() {
        let finish = cc.callFunc((target) => {
            if (target instanceof cc.Node) {
                // 回收池
                this.releaseNode("PlayerOther", this.headersNode.children[0]);
            }
        }, this);

        for (let i = 0; i < this.headerNodeList.length; i++) {
            if (i == 0) {
                let action = cc.sequence(
                    cc.spawn(
                        cc.moveBy(0.5, cc.v2(this.headerRadius, 0)),
                        cc.fadeTo(0.5, 0)
                    ),
                    finish
                );
                this.headerNodeList[i].runAction(action);
            } else {
                this.headerNodeList[i].runAction(
                    cc.moveBy(0.5, cc.v2(this.headerRadius, 0)));
            }
        }

        // 列表及时清除数据
        this.headerNodeList.shift();
    }
}
