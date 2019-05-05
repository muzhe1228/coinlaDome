import AbsListItem from "./AbsListItem";

/**
 *  ListView 组件，继承于 ScrollView
 *  通过对不可见元素进行复用达到高性能滚动，支持垂直/横向滚动
 *  需要将每一行/列的 Item 制作成预制体
 *  默认情况下，控制预制体的脚本需要继承于 AbsListItem 并实现 render 方法用于渲染数据到 Item
 *  如需要对数据进行更复杂的处理，可以继承 ItemAdapter 实现自己的数据适配器
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class ListView extends cc.ScrollView {

    @property(cc.Prefab)
    private itemPrefab: cc.Prefab = null;

    // 控制行列间距
    @property(cc.Vec2)
    private spacing: cc.Vec2 = cc.v2(0, 0);

    // 四周距离.
    @property(cc.Rect)
    private margin: cc.Rect = cc.rect(0, 0, 0, 0);

    // 比可见元素多缓存2个, 缓存越多,快速滑动越流畅,但同时初始化越慢.
    @property(cc.Integer)
    private bufferCount: number = 2;

    // 横向布局的item 数量. 默认为1,即每行一个元素.
    @property(cc.Integer)
    private column: number = 1;

    private adapter: ItemAdapter = null;

    private _items: cc.NodePool = new cc.NodePool();

    // 记录当前填充在树上的索引. 用来快速查找哪些位置缺少item了.
    private _filledIds: { [key: number]: cc.Node } = {};

    // 初始时即计算item的高度.因为布局时要用到.
    private _itemHeight: number = 1;

    private _itemWidth: number = 1;

    private _itemsVisible: number = 1;

    // 当前屏幕可见元素索引值.
    private visibleRange: [number, number] = [-1, -1];

    onLoad() {
        this.setAdapter(new ItemAdapter());

        this.init();
        /**
         *  如果出现列表显示异常,如边界留白,item 错位等问题,可能是所在节点树 存在缩放行为.
         *  具体bug参考: https://forum.cocos.com/t/v2-1-0-scrollview/71260/5
         *  打开以下代码即可解决布局异常问题.
         */
        this.scheduleOnce(() => {
            // @ts-ignore
            this._calculateBoundary();
        }, 0.1);
    }

    lateUpdate() {
        const range = this.getVisibleRange();
        if (!this.checkNeedUpdate(range)) {
            return;
        }
        this.recycleDirty(range);
        this.updateView(range)
    }

    // 设置数据适配器（用于改写ItemAdapter）
    public setAdapter(adapter: ItemAdapter) {
        this.adapter = adapter;
        this.visibleRange[0] = this.visibleRange[1] = -1;
        this.refreshView();
    }

    // 设置List中每个Item渲染的数据列表
    public setDataList(dataList: any[]) {
        this.adapter.setDataList(dataList);
        this.refreshView();
    }

    // 向后扩展数据列表
    public extendDataList(dataList: any[]) {
        let oldList = this.adapter.getDataList();
        let newList = oldList.concat(dataList);

        this.adapter.setDataList(newList);
        const range = this.getVisibleRange();
        this.recycleDirty(range);
        this.updateContentSize();
        this.updateView(range)
    }

    // 数据总和
    public getDataCount(): number {
        return this.adapter.getCount();
    }

    // 刷新所有Item
    public refreshView() {
        this.recycleAll();
        this.updateContentSize();
        const range = this.getVisibleRange();
        this.updateView(range);
    }

    /**
     * 滚动API
     * @param pageIndex 滚动到哪一页.
     * @param pageCount 如果大于0 则以count数量的item为一页.否则以当前可见数量为一页.
     * @param timeSecond
     * @return true = 滚动到最后一页了.
     */
    public scrollToPage(pageIndex: number, pageCount?: number, timeSecond?: number): boolean {
        if (!this.adapter) {
            return false;
        }
        const count = this.adapter.getCount() || 1;
        this.column = this.column || 1;
        if (this.horizontal) {
            let pageWidth = 0;
            const maxWidth = this.content.width;
            const columnWidth = maxWidth / (count / this.column);
            if (!pageCount) {
                // 可见区域的总宽度. 还需要进一步缩减为整数个item的区域.
                let pW = this.content.parent.width;
                pageWidth = Math.floor(pW / columnWidth) * columnWidth;
            } else {
                pageWidth = columnWidth * pageCount;
            }
            this.scrollToOffset(cc.v2(pageWidth * pageIndex, 0), timeSecond);
            return pageWidth * (pageIndex + 1) >= maxWidth;
        } else {
            const maxHeight = this.content.height;
            const rowHeight = maxHeight / (count / this.column);
            let pageHeight = 0;
            if (!pageCount) {
                // maskView 的高度.
                let pH = this.content.parent.height;
                pageHeight = Math.floor(pH / rowHeight) * rowHeight;
            } else {
                pageHeight = rowHeight * pageCount;
            }
            this.scrollToOffset(cc.v2(pageHeight * pageIndex, 0), timeSecond);
            return pageHeight * (pageIndex + 1) >= maxHeight;
        }
    }

    // 向某位置添加一个item.
    private _layoutVertical(child: cc.Node, posIndex: number) {
        this.content.addChild(child);
        // 当columns 大于1时,从左到右依次排列, 否则进行居中排列.
        const column = posIndex % (this.column || 1);
        const row = Math.floor(posIndex / (this.column || 1));
        child.setPosition(
            this.column > 1 ? this.margin.x + child.width * child.anchorX
                + (child.width + this.spacing.x) * column - this.content.width * this.content.anchorX : 0,
            -this.margin.y - child.height * (child.anchorY + row) - this.spacing.y * row);
    }

    // 向某位置添加一个item.
    private _layoutHorizontal(child: cc.Node, posIndex: number) {
        this.content.addChild(child);
        const row = posIndex % (this.column || 1);
        const column = Math.floor(posIndex / (this.column || 1));
        child.setPosition(
            child.width * (child.anchorX + column) + this.spacing.x * column + this.margin.x,
            this.column > 1 ? this.margin.y + child.height * child.anchorY + (child.height + this.spacing.y) * row
                - this.content.height * this.content.anchorY : 0);
    }

    private recycleAll() {
        for (const child in this._filledIds) {
            if (this._filledIds.hasOwnProperty(child)) {
                this._items.put(this._filledIds[child]);
            }
        }
        this._filledIds = {};
    }

    // 数据变更了需要进行更新尺寸
    private updateContentSize() {
        if (this.adapter == null) {
            return;
        }
        if (!this.content) {
            return;
        }
        this.visibleRange[0] = this.visibleRange[1] = -1;
        if (this.horizontal) {
            this.content.width = Math.ceil(this.adapter.getCount() / this.column) * (this._itemWidth + this.spacing.x)
                - this.spacing.x + this.margin.x + this.margin.width;
        } else {
            this.content.height = Math.ceil(this.adapter.getCount() / this.column) * (this._itemHeight + this.spacing.y)
                - this.spacing.y + this.margin.y + this.margin.height;
        }
    }

    private recycleDirty(visibleRange: [number, number]) {
        for (let i = this.visibleRange[0]; i < visibleRange[0]; i++) {
            if (i < 0 || !this._filledIds[i]) {
                continue;
            }
            this._items.put(this._filledIds[i]);
            this._filledIds[i] = null;
        }
        for (let j = this.visibleRange[1]; j > visibleRange[1]; j--) {
            if (j < 0 || !this._filledIds[j]) {
                continue;
            }
            this._items.put(this._filledIds[j]);
            this._filledIds[j] = null;
        }
        this.visibleRange[0] = visibleRange[0];
        this.visibleRange[1] = visibleRange[1];
    }

    private checkNeedUpdate(visibleRange: [number, number]): boolean {
        return this.visibleRange[0] != visibleRange[0] || this.visibleRange[1] != visibleRange[1];
    }

    // 更新View.
    private updateView(visibleRange: [number, number]) {
        for (let i = visibleRange[0]; i <= visibleRange[1]; i++) {
            if (this._filledIds[i]) {
                continue;
            }
            let child = this._items.get() || cc.instantiate(this.itemPrefab);
            this._filledIds[i] = this.adapter._getView(child, i);
            this.horizontal ?
                this._layoutHorizontal(child, i) :
                this._layoutVertical(child, i);
        }
    }

    // 获取当前屏幕可见元素索引.
    private getVisibleRange(): [number, number] {
        if (this.adapter == null) {
            return null;
        }
        let scrollOffset = this.getScrollOffset();
        let startIndex = 0;

        if (this.horizontal) {
            startIndex = Math.floor(-scrollOffset.x / (this._itemWidth + this.spacing.x))
        } else {
            startIndex = Math.floor(scrollOffset.y / (this._itemHeight + this.spacing.y))
        }
        if (startIndex < 0) {
            startIndex = 0;
        }
        let visible = this.column * (startIndex + this._itemsVisible + this.bufferCount);
        if (visible >= this.adapter.getCount()) {
            visible = this.adapter.getCount() - 1;
        }
        return [startIndex, visible];
    }

    private init() {
        if (this.horizontal) {
            this.content.anchorX = 0;
            this.content.anchorY = this.content.parent.anchorY;
            this.content.x = 0 - this.content.parent.width * this.content.parent.anchorX;
            this.content.y = 0;
        } else {
            this.content.anchorX = this.content.parent.anchorX;
            this.content.anchorY = 1;
            this.content.x = 0;
            this.content.y = this.content.parent.height * this.content.parent.anchorY;
        }

        let itemOne = this._items.get() || cc.instantiate(this.itemPrefab);
        this._items.put(itemOne);
        this._itemHeight = itemOne.height || 10;
        this._itemWidth = itemOne.width || 10;

        if (this.horizontal) {
            let itemsWidth = this.content.parent.width - this.margin.x - this.margin.width;
            this._itemsVisible = Math.ceil(itemsWidth / (this._itemWidth + this.spacing.x));
        } else {
            let itemsHeight = this.content.parent.height - this.margin.y - this.margin.height;
            this._itemsVisible = Math.ceil(itemsHeight / (this._itemHeight + this.spacing.y));
        }
    }
}


// 数据绑定的辅助适配器
export class ItemAdapter {

    private _dataList: any[] = [];

    public setDataList(data: any[]) {
        this._dataList = data;
    }

    public getDataList(): any[] {
        return this._dataList
    }

    public getCount(): number {
        return this._dataList.length;
    }

    public getItem(posIndex: number): any {
        return this._dataList[posIndex];
    }

    public _getView(item: cc.Node, posIndex: number): cc.Node {
        this.updateView(item, posIndex);
        return item;
    }

    public updateView(item: cc.Node, posIndex: number) {
        let comp = item.getComponent(AbsListItem);
        if (comp) {
            comp.render(this.getItem(posIndex));
        }
    }
}
