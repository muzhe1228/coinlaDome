import ListView from "../ext/ListView";
import { WayInfoPages, WayWinInfo } from "../model/WayInfo";
import BaseComponent from "../utils/BaseComponent";

/**
 *  路子弹窗控制器
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class WayWindowController extends BaseComponent {

    @property(ListView)
    private listView: ListView = null;

    private wayPagesTemp: WayInfoPages = null;

    private viewFirstId: number = 0;

    private readonly MAX_ITEMS: number = 100;

    onEnable() {
        // 滚动到最顶部
        this.listView.scrollToTop(0, false);
        this.refreshListView();
        this.setListenBounceBottom(true);
    }

    public concatWayPagesTemp(wayPages: WayInfoPages | null) {
        this.wayPagesTemp == null ?
            this.wayPagesTemp = wayPages
            : this.wayPagesTemp.concatPages(wayPages);
    }

    // 请求路子数据，第一页page是1
    public requestWayInfo(page: number, callback: (wayInfoPages: WayInfoPages) => void) {
        this.httpUtils.post(
            "/hns/niuniu/findWay",
            {
                "token": this.getToken(),
                "roomId": this.getRoomId(),
                "page": page, "pageSize": 20
            },
            true,
            res => callback(new WayInfoPages(res.data)));
    }

    public requestWayWinInfo(callback: (wayWinInfo: WayWinInfo) => void) {
        this.httpUtils.post(
            "/hns/niuniu/findWayVo",
            {
                "token": this.getToken(),
                "roomId": this.getRoomId(),
            },
            true,
            res => callback(new WayWinInfo(res.data)));
    }

    // 刷新数据
    private refreshListView() {
        // 如果视图展示的总局数和存储的数据一致，则不进行刷新
        if (this.viewFirstId != 0 && this.viewFirstId == this.wayPagesTemp.getFirstBlockId()) {
            return;
        }
        // 监听底部加载更多页
        this.setListenBounceBottom(true);
        // 如果空数据则自己请求
        this.wayPagesTemp != null ? this.renderListView(this.wayPagesTemp)
            : this.requestWayInfo(1, this.renderListView.bind(this));
    }

    // 渲染列表数据
    private renderListView(wayPages: WayInfoPages, extend: boolean = false) {
        if (!this.node.active) return;
        if (wayPages.getPageSize() === 0) {
            this.alert("暂无数据");
            return;
        }
        if (extend) {
            this.listView.extendDataList(wayPages.getWayInfoList())
        } else {
            this.listView.setDataList(wayPages.getWayInfoList());
        }
    }

    // 设置是否监听滚动到底部
    private setListenBounceBottom(on: boolean) {
        on ? this.listView.node.on("bounce-bottom", this.onBounceBottom, this)
            : this.listView.node.off("bounce-bottom");
    }

    // 监听回调，加载更多页
    private onBounceBottom() {
        this.setListenBounceBottom(false);
        // 如果没有下一页或者超过最大限制了，则不再请求更多页
        if (!this.wayPagesTemp.hasNextPage() || this.listView.getDataCount() >= this.MAX_ITEMS) {
            this.alert("已经加载所有数据");
            return;
        }
        this.requestWayInfo(
            this.wayPagesTemp == null ? 1 : this.wayPagesTemp.getNextPageNumber(),
            wayInfoPages => {
                this.concatWayPagesTemp(wayInfoPages);
                this.renderListView(wayInfoPages, true);
                this.viewFirstId = wayInfoPages.getFirstBlockId();
                this.setListenBounceBottom(true);
            }
        );
    }

}
