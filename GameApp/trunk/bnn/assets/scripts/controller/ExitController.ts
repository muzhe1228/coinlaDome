// 退出按钮控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExitController extends cc.Component {

    @property(cc.Button)
    private button: cc.Button = null;

    onLoad () {
        this.button.node.on(cc.Node.EventType.TOUCH_END, this.enterRoomList, this)
    }

    public enterRoomList () {
        cc.director.loadScene("roomList");
    }

}
