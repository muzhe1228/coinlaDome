// 聊天消息控制器

import ChatInfo from "../model/ChatInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatMessageController extends cc.Component {

    @property(cc.Node)
    public stream: cc.Node = null;

    @property(Number)
    private maxMessage: number = 50;

    @property(cc.Node)
    public background: cc.Node = null;

    @property(cc.ScrollView)
    public scrollView: cc.ScrollView = null;

    private msgPool = new cc.NodePool();

    private touchEventCallback: (event) => void = null;

    private readonly selfMsgColor = new cc.Color().fromHEX('#EEDDAD');

    private readonly otherMsgColor = new cc.Color().fromHEX('#A2C9FF');

    onLoad() {
        this.scrollView.node.on(cc.Node.EventType.TOUCH_END,
            (event: cc.Event.EventTouch) => {
                if (this.touchEventCallback != null) {
                    this.touchEventCallback(event)
                }
            }, this);
    }

    public setTouchEventCallback(callback: (event) => void) {
        this.touchEventCallback = callback;
    }

    public onTouch(event) {
        this.show(3, false);
    }

    // 渲染消息，如果是自己的消息显示背景层并滚到底部
    public renderMessage(chatInfo: ChatInfo, isSelf: boolean = false) {
        this.msgAddStream(chatInfo.getUserName(), chatInfo.getChatContent(), isSelf);
        this.trimStream();
        if (isSelf) {
            this.show(3, true);
            this.scrollView.scrollToBottom(0.1);
        } else {
            this.show(3, false);
        }
    }

    // 添加一个文本消息节点到Stream中
    private msgAddStream(author: string, text: string, isSelf: boolean) {
        let node: cc.Node = null;
        let label: cc.Label = null;
        if (this.msgPool.size() > 0) {
            node = this.msgPool.get();
            label = node.getComponent(cc.Label);
        } else {
            node = new cc.Node();
            node.width = this.stream.width;
            label = node.addComponent(cc.Label);
            label.fontSize = 24;
            label.lineHeight = 26;
            label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
            label.verticalAlign = cc.Label.VerticalAlign.CENTER;
            // 字体描边
            let outline = node.addComponent(cc.LabelOutline);
            outline.color = new cc.Color(0, 0, 0, 130);
            outline.width = 2;
        }
        node.color = isSelf ? this.selfMsgColor : this.otherMsgColor;
        label.string = author + ': ' + text;
        this.stream.addChild(node, undefined, "Message");
        node.x = 0;
    }

    // 展示消息
    public show(showTime: number, withBackground: boolean = false) {
        this.fadeNode(this.scrollView.node, 255, showTime);
        withBackground ? this.fadeNode(this.background, 130, showTime)
            : this.fadeNode(this.background, 0, 0);
    }

    // 暂时显示并淡出指定节点
    private fadeNode(node: cc.Node, opacity: number, fadeOutDelay: number = 3) {
        node.stopAllActions();
        // 延迟淡出
        let actions = cc.sequence(
            cc.delayTime(0.01),
            cc.delayTime(fadeOutDelay),
            cc.fadeOut(1)
        );
        // 显示节点
        if (node.opacity < opacity)
            node.opacity = opacity;
        node.runAction(actions);
    }

    // 去掉过多的消息节点
    private trimStream() {
        let msgs = this.stream.children;
        if (msgs.length > this.maxMessage) {
            let excess = msgs.length - this.maxMessage;
            for (let m of msgs.splice(0, excess)) {
                m.removeFromParent();
                this.msgPool.put(m);
            }
        }
    }
}
