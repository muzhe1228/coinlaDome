import { WayInfo, WayWinInfo } from "../model/WayInfo";

/**
 *  路子面板纵列Item
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class WayBoardItem extends cc.Component {

    onLoad() {
        this.drawOutline();
    }

    // 渲染路子
    public renderWay(wayInfo: WayInfo) {
        for (let i = 0; i < this.node.children.length; i++) {
            let block = this.node.children[i];
            let centerLabel = block.getComponentInChildren(cc.Label);
            let winSprite = block.getComponentInChildren(cc.Sprite);
            switch (i) {
                case 0:
                    centerLabel.string = wayInfo.getBankerNiu();
                    winSprite.node.active = wayInfo.bankerAllWin();
                    break;
                case 1:
                    centerLabel.string = wayInfo.getXian1Niu();
                    winSprite.node.active = wayInfo.xian1Win();
                    break;
                case 2:
                    centerLabel.string = wayInfo.getXian2Niu();
                    winSprite.node.active = wayInfo.xian2Win();
                    break;
                case 3:
                    centerLabel.string = wayInfo.getXian3Niu();
                    winSprite.node.active = wayInfo.xian3Win();
                    break;
            }
        }
    }

    // 渲染位置的获胜数
    public renderWayWins(winInfo: WayWinInfo) {
        for (let i = 0; i < this.node.children.length; i++) {
            let block = this.node.children[i];
            let centerLabel = block.getComponentInChildren(cc.Label);
            switch (i) {
                case 0:
                    centerLabel.string = winInfo.getTotalRounds().toString();
                    break;
                case 1:
                    centerLabel.string = winInfo.getXian1Wins().toString();
                    break;
                case 2:
                    centerLabel.string = winInfo.getXian2Wins().toString();
                    break;
                case 3:
                    centerLabel.string = winInfo.getXian3Wins().toString();
                    break;
            }
        }
    }

    // 绘制边框线
    private drawOutline() {
        let itemIndex = this.node.getSiblingIndex();

        // 计算区块节点四个端点的坐标用于画线
        let block = this.node.children[0];
        let topLeftPos = cc.v2(-block.width * block.anchorX, block.height * block.anchorY);
        let topRightPos = cc.v2(block.width * block.anchorX, block.height * block.anchorY);
        let btmLeftPos = cc.v2(-block.width * block.anchorX, -block.height * block.anchorY);
        let btmRightPos = cc.v2(block.width * block.anchorX, -block.height * block.anchorY);

        for (let blockIndex = 0; blockIndex < this.node.children.length; blockIndex++) {
            let block = this.node.children[blockIndex];
            if (!block.getComponent(cc.Graphics)) {
                let ctx = block.addComponent(cc.Graphics);

                // 第二列带背景需要用深色边线
                let colorHex = itemIndex != 1 ? "#374D75" : "1E2643";
                ctx.strokeColor.fromHEX(colorHex);
                ctx.lineWidth = 2;

                // 上边线
                if (blockIndex != 0) {
                    ctx.moveTo(topLeftPos.x, topLeftPos.y);
                    ctx.lineTo(topRightPos.x, topRightPos.y);
                }
                // 右边线
                if (itemIndex != 7) {
                    ctx.moveTo(topRightPos.x, topRightPos.y);
                    ctx.lineTo(btmRightPos.x, btmRightPos.y);
                }
                // 下边线
                if (blockIndex != 3) {
                    ctx.moveTo(btmRightPos.x, btmRightPos.y);
                    ctx.lineTo(btmLeftPos.x, btmLeftPos.y);
                }
                // 左边线
                if (itemIndex != 0) {
                    ctx.moveTo(btmLeftPos.x, btmLeftPos.y);
                    ctx.lineTo(topLeftPos.x, topLeftPos.y);
                }
                ctx.stroke();
            }
        }
    }

}
