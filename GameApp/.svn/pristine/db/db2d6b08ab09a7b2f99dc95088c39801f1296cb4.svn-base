import { WayInfo } from "../model/WayInfo";
import AbsListItem from "../ext/AbsListItem";

/**
 *  路子弹窗行Item
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class WayWindowItem extends AbsListItem {

    onLoad() {
        this.drawOutline();
    }

    public render(wayInfo: WayInfo) {
        for (let i = 0; i < this.node.children.length; i++) {
            let block = this.node.children[i];
            let labels = block.getComponentsInChildren(cc.Label);
            let topLabel = labels[0];
            let btmLabel = labels[1];
            let winSprite = btmLabel.node.getComponentInChildren(cc.Sprite);

            // 每一列单元格填充数据
            switch (i) {
                case 0:
                    btmLabel.string = wayInfo.getBlockId().toString();
                    break;
                case 1:
                    break;
                case 2:
                    topLabel.string = wayInfo.getBankerCards();
                    btmLabel.string = wayInfo.getBankerNiu();
                    winSprite.node.active = wayInfo.bankerAllWin();
                    break;
                case 3:
                    topLabel.string = wayInfo.getXian1Cards();
                    btmLabel.string = wayInfo.getXian1Niu();
                    winSprite.node.active = wayInfo.xian1Win();
                    break;
                case 4:
                    topLabel.string = wayInfo.getXian2Cards();
                    btmLabel.string = wayInfo.getXian2Niu();
                    winSprite.node.active = wayInfo.xian2Win();
                    break;
                case 5:
                    topLabel.string = wayInfo.getXian3Cards();
                    btmLabel.string = wayInfo.getXian3Niu();
                    winSprite.node.active = wayInfo.xian3Win();
                    break;
            }
        }
    }

    // 绘制边框线
    private drawOutline() {
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
                ctx.strokeColor.fromHEX("232D46");
                ctx.lineWidth = 2;

                // 上边线
                ctx.moveTo(topLeftPos.x, topLeftPos.y);
                ctx.lineTo(topRightPos.x, topRightPos.y);

                // 右边线
                if (blockIndex === 0) {
                    ctx.moveTo(topRightPos.x, topRightPos.y);
                    ctx.lineTo(btmRightPos.x, btmRightPos.y);
                }

                // 下边线
                ctx.moveTo(btmRightPos.x, btmRightPos.y);
                ctx.lineTo(btmLeftPos.x, btmLeftPos.y);

                // 左边线
                if (blockIndex === 1) {
                    ctx.moveTo(btmLeftPos.x, btmLeftPos.y);
                    ctx.lineTo(topLeftPos.x, topLeftPos.y);
                }
                ctx.stroke();
            }
        }
    }

}