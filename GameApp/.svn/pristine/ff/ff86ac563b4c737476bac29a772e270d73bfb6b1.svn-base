import ChatMessageController from "./ChatMessageController";
import AppManager from "../manager/AppManager";
import BaseComponent from "../utils/BaseComponent";

// 聊天输入条控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatBarController extends BaseComponent {

    @property(cc.Button)
    private barButton: cc.Button = null;

    @property(cc.Button)
    private sendButton: cc.Button = null;

    @property(cc.EditBox)
    private editBox: cc.EditBox = null;

    @property(ChatMessageController)
    private chatMessage: ChatMessageController = null;

    @property(cc.Prefab)
    private backMaskPrefab: cc.Prefab = null;

    private isShow: boolean = false;

    private backMaskNode: cc.Node = null;

    onLoad() {
        this.initBackMask();

        this.setSendClickable(true);

        this.backMaskNode.on(cc.Node.EventType.TOUCH_END, this.hideBar, this);
        this.barButton.node.on(cc.Node.EventType.TOUCH_END, this.switchBar, this);
        this.editBox.node.on("text-changed", (target: cc.EditBox) => {
            AppManager.textChangedForAndroid(target.string);
        }, this);
        this.editBox.node.on("editing-did-began", (target: cc.EditBox) => {
            AppManager.textChangedForAndroid(target.string);
        }, this);
    }

    public switchBar() {
        this.isShow ? this.hideBar() : this.showBar()
    }

    public showBar() {
        this.backMaskNode.active = true;
        this.isShow = true;
        this.moveChatBar(true, this.editBox.setFocus.bind(this.editBox));
        this.chatMessage.show(60, true);
    }

    public hideBar() {
        this.backMaskNode.active = false;
        this.isShow = false;
        this.moveChatBar(false);
        this.chatMessage.show(3, false);
    }

    // 设置发送按钮是否可点击
    public setSendClickable(bool: boolean) {
        if (bool) {
            let cb = () => {
                this.requestChatSend(this.editBox.string);
                this.playRemoteEffect("sounds/界面交互点击.mp3");
            };
            this.sendButton.node.on(cc.Node.EventType.TOUCH_END, cb, this);
            this.editBox.node.on("editing-return", cb, this);
            this.sendButton.interactable = true;
        } else {
            this.sendButton.node.off(cc.Node.EventType.TOUCH_END);
            this.editBox.node.off("editing-return");
            this.sendButton.interactable = false;
        }
    }

    // 清空输入框
    public clearEditBox() {
        this.editBox.string = "";
    }

    // 发送消息的接口请求
    public requestChatSend(text: string) {
        if (!text) {
            return;
        }
        this.setSendClickable(false);
        this.httpUtils.post(
            "/hns/niuniu/sendChat",
            {
                "token": this.getToken(),
                "roomId": this.getRoomId(),
                "content": text
            },
            true,
            this.requestChatSendCallback.bind(this),
            true
        );
    }

    // 接口回调
    private requestChatSendCallback(res) {
        if (res.code == 0) {
            this.clearEditBox();
        }
        this.setSendClickable(true);
        if (this.showBar) {
            this.editBox.setFocus();
        }
    }

    // 移入或移出聊天框
    private moveChatBar(show: boolean, callback?: () => void) {
        let worldX = this.node.width * this.node.anchorX;
        let worldY = this.node.height * this.node.anchorY;
        if (!show) worldY = -worldY;
        let pos = this.node.parent.convertToNodeSpaceAR(cc.v2(worldX, worldY));
        let moveTo = cc.moveTo(0.1, pos);
        this.node.stopAllActions();
        let actions = callback ?
            cc.sequence(moveTo, cc.delayTime(0.01), cc.callFunc(callback)) : moveTo;
        this.node.runAction(actions);
    }

    // 生成背部遮罩层
    private initBackMask() {
        this.backMaskNode = cc.instantiate(this.backMaskPrefab);
        this.backMaskNode.opacity = 0;
        this.backMaskNode.active = false;
        let zIndex = this.node.zIndex - 1;
        this.node.parent.addChild(this.backMaskNode, zIndex, "BackMask");
    }

}
