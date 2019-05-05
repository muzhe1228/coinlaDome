import NoticeInfo from "../model/NoticeInfo";

// 公告控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class NoticeController extends cc.Component {

    @property(Number)
    private distance: number = 128;

    @property(Number)
    private speed: number = 200;

    private msgPool = new cc.NodePool();

    public renderNotice(noticeInfo: NoticeInfo) {
        this.emit(noticeInfo.getContent());
    }

    public emit(message: string) {
        let msg = this.getMsgNode(message);
        this.node.addChild(msg);
        let msgList = this.node.children;
        // 如果有其他的消息节点，计算与上一个消息之间的间隔距离
        if (msgList.length > 1) {
            let lastMsg = msgList[msgList.length - 2];
            let lastTail = lastMsg.x + lastMsg.width;
            let interval = this.node.width - (lastTail + this.distance);
            msg.x = interval < this.distance ?
                lastTail + this.distance : this.node.width;
        } else {
            msg.x = this.node.width;
        }
        let moveTime = (msg.width + msg.x) / this.speed;
        msg.runAction(cc.sequence(
            cc.moveTo(moveTime, -msg.width, msg.y),
            cc.callFunc(this.msgPool.put.bind(this.msgPool, msg))
        ));
    }

    private getMsgNode(text) {
        let msg: cc.Node = null;
        let richText: cc.RichText = null;
        if (this.msgPool.size() > 0) {
            msg = this.msgPool.get();
            richText = msg.getComponent(cc.RichText);
        } else {
            msg = new cc.Node();
            msg.anchorX = 0;
            richText = msg.addComponent(cc.RichText);
            richText.fontSize = 26;
            richText.lineHeight = 28;
        }
        richText.string = this.replaceLabel(text);
        return msg
    }

    private replaceLabel(text) {
        // 替换color标签
        text = text.replace(/\sstyle='color:(#.+?)'>(.+?)(?=<\/)/g,
            '><color=$1>$2<\/color>');
        // 替换strong标签
        text = text.replace('strong', 'b');
        return text
    }

}
