import { WayInfoPages, WayWinInfo } from "../model/WayInfo";
import WayBoardItem from "../view/WayBoardItem";
import Window from "../view/Window";
import BaseComponent from "../utils/BaseComponent";
import WayWindowController from "./WayWindowController";

/**
 *  路子面板控制器
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class WayController extends BaseComponent {

    @property(cc.Node)
    private boardView: cc.Node = null;

    @property(Window)
    private boardWindow: Window = null;

    @property(WayWindowController)
    private windowController: WayWindowController = null;

    private wayPagesTemp: WayInfoPages = null;

    private winInfoTemp: WayWinInfo = null;

    private viewRounds: number = 0;

    onLoad() {
        this.boardWindow.node.on(
            "window-open", this.onOpenBoard, this);
        this.boardView.on(
            cc.Node.EventType.TOUCH_END, this.onTouchBoard, this);
        if (this.wayPagesTemp == null) {
            this.preStorageData();
        }
    }

    // 请求并预存储首页数据
    public preStorageData() {
        this.wayPagesTemp = this.winInfoTemp = null;
        this.windowController.requestWayInfo(1, (wayInfoPages) => {
            this.wayPagesTemp = wayInfoPages;
            this.windowController.concatWayPagesTemp(wayInfoPages);
        });
        this.windowController.requestWayWinInfo((wayWinInfo) => {
            this.winInfoTemp = wayWinInfo;
        })
    }

    // 打开面板的回调
    private onOpenBoard() {
        this.checkDataThenRefresh();
    }

    // 打开弹窗的回调
    private onTouchBoard() {
        this.boardWindow.close();
        this.windowController.concatWayPagesTemp(this.wayPagesTemp);
    }

    // 渲染路子数据
    private renderWayList(wayInfoPages: WayInfoPages) {
        let itemList = this.boardView.children.slice(2);
        let wayInfoList = wayInfoPages.getWayInfoList().slice(0, itemList.length);
        wayInfoList.reverse();
        for (i = 0; i < itemList.length; i++) {
            itemList[i].getComponent(WayBoardItem).renderWay(wayInfoList[i])
        }
    }

    // 渲染获胜数的数据
    private renderWayWins(winInfo: WayWinInfo) {
        this.boardView.children[0].getComponent(
            WayBoardItem).renderWayWins(winInfo);
        this.viewRounds = winInfo.getTotalRounds();
    }

    // 检查数据然后刷新面板
    private checkDataThenRefresh() {
        if (this.wayPagesTemp != null && this.winInfoTemp != null) {
            this.refreshBoard();
        } else if (this.wayPagesTemp == null && this.winInfoTemp == null) {
            this.windowController.requestWayInfo(1, (wayInfoPages) => {
                this.windowController.requestWayWinInfo((wayWinInfo) => {
                    this.wayPagesTemp = wayInfoPages;
                    this.winInfoTemp = wayWinInfo;
                    this.refreshBoard();
                })
            });
        } else if (this.wayPagesTemp == null) {
            this.windowController.requestWayInfo(1, (wayInfoPages) => {
                this.wayPagesTemp = wayInfoPages;
                this.refreshBoard();
            });
        } else if (this.winInfoTemp == null) {
            this.windowController.requestWayWinInfo((wayWinInfo) => {
                this.winInfoTemp = wayWinInfo;
                this.refreshBoard();
            })
        }
    }

    // 刷新面板数据，重新填充数据
    private refreshBoard() {
        // 如果视图展示的总局数和存储的数据不一致，则进行刷新
        if (this.viewRounds == 0 || this.viewRounds != this.winInfoTemp.getTotalRounds()) {
            this.renderWayList(this.wayPagesTemp);
            this.renderWayWins(this.winInfoTemp);
        }
    }

}
