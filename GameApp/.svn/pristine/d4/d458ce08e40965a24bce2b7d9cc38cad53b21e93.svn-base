import Grid from "../view/Grid";
import RecordCell from "../view/RecordCell";
import {GameType} from "../model/GameType";
import BaseComponent from "../utils/BaseComponent";

// 投注记录窗口控制器

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecordController extends BaseComponent {

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.ScrollView)
    private scrollView: cc.ScrollView = null;

    // 单元格预设体
    @property(cc.Prefab)
    private cellPrefab: cc.Prefab = null;

    public gameId: string = "";

    private readonly CELL_HEIGHT: number = 40;

    private readonly DATA_LIMIT: number = 30;

    onEnable() {
        this.setListenBounceBottom(true);
        let gridHeader = this.addGrid(1);
        this.drawCellLine(gridHeader);
        this.addGridHeader(gridHeader);
        this.requestRecordInfo("",
            this.scrollView.scrollToTop.bind(this.scrollView, 0));
    }

    onDisable() {
        this.content.destroyAllChildren();
    }

    // 设置是否监听滚动到底部
    private setListenBounceBottom(on: boolean) {
        on ? this.scrollView.node.on("bounce-bottom", this.onBounceBottom, this)
            : this.scrollView.node.off("bounce-bottom");
    }

    // 监听回调，加载更多页
    private onBounceBottom() {
        this.setListenBounceBottom(false);
        this.requestRecordInfo(this.gameId);
    }

    // 渲染单元格内容
    public renderAddCells(recordInfoList: any) {
        for (let each of recordInfoList) {
            let grid = this.addGrid(each.detailList.length);
            this.drawCellLine(grid, [0, 1, 2, 5, 7]);
            this.fillGrid(grid, each);
        }
    }

    // 向子节点中添加指定行数的表格
    private addGrid(rows: number): Grid {
        let node = new cc.Node();
        node.width = this.content.width;
        node.height = rows > 1 ? rows * this.CELL_HEIGHT : this.CELL_HEIGHT * 1.5;
        let grid = node.addComponent(Grid);
        grid.cellPrefab = this.cellPrefab;
        grid.columns = 8;
        grid.rows = rows;
        let Widget = node.addComponent(cc.Widget);
        Widget.isAlignHorizontalCenter = true;
        this.content.addChild(node, undefined, "Grid");
        return grid;
    }

    // 添加表头
    private addGridHeader(grid: Grid) {
        let content = [
            "玩法/房间",
            "期数/状态",
            "开奖结果",
            "投注位置",
            "投注金额",
            "总投注",
            "结算金额",
            "总结算"
        ];
        for (let x = 0; x < grid.columns; x++) {
            let cell = grid.cellMatrix[x][0];
            let labels = cell.getChildByName("Labels");
            let bottomNode = labels.getChildByName("BottomLabel");
            bottomNode.getComponentInChildren(cc.Label).string = content[x];
        }
    }

    // 绘制边框线
    private drawCellLine(grid: Grid, notDraw?: any) {
        for (let y = 0; y < grid.rows; y++) {
            for (let x = 0; x < grid.columns; x++) {
                let cell = grid.cellMatrix[x][y];
                cell.addComponent(cc.Graphics);
                let ctx = cell.getComponent(cc.Graphics);
                ctx.strokeColor.fromHEX("#232D46");
                ctx.lineWidth = 1;
                //右边线
                ctx.moveTo(cell.width, 0);
                ctx.lineTo(cell.width, -cell.height);
                if (notDraw) {
                    if (notDraw.indexOf(x) == -1 || y == grid.rows - 1) {
                        ctx.moveTo(cell.width, -cell.height);
                        ctx.lineTo(0, -cell.height);
                    }
                } else {
                    ctx.moveTo(cell.width, -cell.height);
                    ctx.lineTo(0, -cell.height);
                }

                // 左边线
                if (x === 0) {
                    ctx.moveTo(0, -cell.height);
                    ctx.lineTo(0, 0);
                }
                ctx.stroke();
            }
        }
    }

    // 请求我的投注数据
    private requestRecordInfo(gameId: string, callback?: Function) {
        this.httpUtils.post(
            "/hns/niuniu/findMyDetailListAll",
            {
                token: this.getToken(),
                gameId: gameId,
                pageSize: 10
            },
            true,
            res => this.requestRecordInfoCallback(res, callback)
        );
    }

    private requestRecordInfoCallback (res, callback?: Function) {
        if (! this.node.active)
            return;
        if (res.data.length && this.content.childrenCount <= this.DATA_LIMIT) {
            this.gameId = res.data[res.data.length - 1].gameId;
            this.renderAddCells(res.data);
            this.setListenBounceBottom(true);
            if (callback)
                callback();
        } else {
            this.alert("无法查询更早的数据");
        }
    }

    // 填充表格内容
    private fillGrid(grid: Grid, recordInfo: any) {
        let showRow: number = grid.rows % 2 ? (grid.rows - 1) / 2 : grid.rows / 2;
        let isOut: boolean = this.isOddRow(grid.rows);
        let bot: string, top: string;
        for (let y = 0; y < grid.rows; y++) {
            for (let x = 0; x < grid.columns; x++) {
                let cell = grid.cellMatrix[x][y],
                    recordLabel = cell.getComponent(RecordCell);
                recordLabel.isOut = isOut;
                //设置本局字体颜色高亮
                recordLabel.isblock(recordInfo.result);
                if (showRow == y) {
                    switch (x) {
                        case 0:
                            let roomName = recordInfo["roomName"];
                            if (recordInfo.gameType != GameType.NiuNiu) {
                                bot = roomName;
                                recordLabel.setStateOut({bot});
                            } else {
                                let nameArr= roomName.split('-');
                                top = nameArr[0];
                                bot = nameArr[1];
                                recordLabel.setStateOut({ bot, top});
                            }
                            break;
                        case 1:
                            if (recordInfo.gameType != GameType.NiuNiu) {
                                top = recordInfo.blockId || undefined;
                                bot = this.settlement(recordInfo.result);
                                recordLabel.setStateOut({bot, top});
                            } else {
                                let userType = recordInfo.userType;
                                top = recordInfo.blockId || undefined;
                                bot = recordInfo.blockId ? '已结算': '未结算';
                                recordLabel.setStateOut({bot, top, userType});
                            }
                            break;
                        case 2:
                            if (recordInfo.gameType != GameType.NiuNiu) {
                                bot = this.result(recordInfo.result);
                                recordLabel.setStateOut({ bot });
                            } else {
                                
                                if (recordInfo.niuBanker){
                                    top = '庄:' + recordInfo.niuBanker;
                                    bot = recordInfo.niuSky + '/' +
                                        recordInfo.niuLand + '/' +
                                        recordInfo.niuMysterious;
                                    recordLabel.setStateOut({ bot, top});
                                } else {
                                    bot = '未开奖';
                                    recordLabel.setStateOut({ bot });
                                }
                            }
                            recordLabel.setStateOut({ bot });
                            break;
                        case 5:
                            bot = recordInfo["bets"];
                            recordLabel.setStateOut({ bot, suffix: "PK"});
                            break;
                        case 7:
                            if (!recordInfo.blockId) {
                                break;
                            }
                            bot = this.winBets(
                                recordInfo.result,
                                recordInfo.winBets
                            );
                            recordLabel.setStateOut({ bot, suffix: "PK", isColor: true});
                            break;
                    }
                }
                switch (x) {
                    case 3:
                        bot = this.betPosition(recordInfo.gameType, recordInfo.detailList[y]);
                        recordLabel.setState({bot});
                        break;
                    case 4:
                        bot = recordInfo.detailList[y].bets;
                        recordLabel.setState({bot, suffix:"PK"});
                        break;
                    case 6:
                        if (!recordInfo.blockId) {
                            break;
                        }
                        bot = this.settleBets(
                            recordInfo.result,
                            recordInfo.detailList[y].winBets
                        );
                        recordLabel.setState({bot, suffix:"PK", isColor:true});
                        break;
                }
            }
        }
    }

    // 结算还是本期
    private settlement(type: number) {
        switch (type) {
            case -1:
                return "本期";
            default:
                return "已结算";
        }
    }

    // 中奖号 是否流拍
    private result(num: number) {
        switch (num) {
            case -1:
                return "未开奖";
            case -2:
                return "流拍";
            default:
                return num.toString();
        }
    }

    // 赢输总金额
    private winBets(type: number, bets: number) {
        if (type === -2) {
            return "已返还";
        } else if (type === -1) {
            return "未开奖";
        } else {
            return bets.toString();
        }
    }

    // 结算金额
    private settleBets(type: number, bets: number) {
        if (type === -2) {
            return "已返还";
        } else if (type === -1) {
            return "未开奖";
        } else {
            return bets.toString();
        }
    }

    //投注位置
    private betPosition(gameType: number, data: any) {
        // 夺币组合下注数字
        if (gameType == GameType.Treasure) {
            return this.GetDBLocation(data);
        }
        // 牛牛显示闲几
        else if (gameType == GameType.NiuNiu) {
            return '闲' + data.startNo;
        }
        // 猜尾数显示单个或一段数字
        else {
            return data.startNo == data.endNo
                ? data.startNo
                : data.startNo + "-" + data.endNo;
        }
    }

    // 计算下注数字
    private GetDBLocation(betItem) {
        if (betItem.endNo - betItem.startNo == 0) {
            return this.AddZero(betItem.startNo);
        } else if (betItem.endNo - betItem.startNo == 1) {
            return this.AddZero(betItem.startNo) + "," + this.AddZero(betItem.endNo);
        } else {
            return this.AddZero(betItem.startNo) + "~" + this.AddZero(betItem.endNo);
        }
    }

    // 数字前面补0变为3位
    private AddZero(num) {
        return ('000' + num).slice(-3);
    }

    // 判断是否为奇数行
    private isOddRow(rows: number) {
        return rows % 2 != 0;
    }
}
