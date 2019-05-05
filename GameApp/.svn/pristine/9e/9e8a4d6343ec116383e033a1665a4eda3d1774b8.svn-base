// 表格视图

const {ccclass, property} = cc._decorator;

@ccclass
export default class Grid extends cc.Component {

    // 列数
    @property(Number)
    public columns: number = 0;

    // 行数
    @property(Number)
    public rows: number = 0;

    // 单元格预设体(可选)
    @property(cc.Prefab)
    public cellPrefab: cc.Prefab = null;

    // 起始轴方向
    private startAxis: cc.Layout.AxisDirection = cc.Layout.AxisDirection.VERTICAL;

    // 单元格节点的二维数组
    public cellMatrix: cc.Node[][] = [];

    onLoad () {
        let layout = this.node.addComponent(cc.Layout);
        layout.type = cc.Layout.Type.GRID;
        layout.startAxis = this.startAxis;
    }

    onEnable () {
        this.initCells();
    }

    // 初始化所有单元格
    public initCells () {
        let cellWidth = this.node.width / this.columns;
        let cellHeight = this.node.height / this.rows;
        for (let x = 0; x < this.columns; x++) {
            this.cellMatrix.push([]);
            for (let y = 0; y < this.rows; y++){
                let cell = null;
                // 如果没有指定单元格预设体，则生成空节点
                if (this.cellPrefab) {
                    cell = cc.instantiate(this.cellPrefab);
                } else {
                    cell = new cc.Node();
                }
                cell.width = cellWidth;
                cell.height = cellHeight;
                cell.anchorX = 0;
                cell.anchorY = 1;
                this.node.addChild(cell, undefined, 'GridCell');
                this.cellMatrix[x].push(cell);
            }
        }
    }

}
