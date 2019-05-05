import BankerRecordBlock from "../view/BankerRecordBlock";
import BaseComponent from "../utils/BaseComponent";
import BankerRecordInfo from "../model/BankerRecordInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BankerRecordController extends BaseComponent {

    @property(cc.Node)
    private RecordList: cc.Node = null;

    // 单元格预设体
    @property(cc.Prefab)
    private BlockPrefab: cc.Prefab = null;

    @property(cc.ScrollView)
    private RecordScroll: cc.ScrollView = null;

    private isShow: boolean = false;

    onDisable() {
        this.isShow = false;
    }

    public updateBankerRecord() {
        this.requestBankerRecord(() => {
            if (!this.isShow) {
                this.isShow = true;
                this.showListActions();
            }
        });
    }

    // 请求BankerRecord列表
    private requestBankerRecord(callback: Function) {
        this.httpUtils.post(
            "/hns/niuniu/findMyBankerList",
            {
                token: this.getToken(),
                roomId: this.getRoomId()
            },
            true,
            res => {
                let blocks = this.node.getComponentsInChildren(BankerRecordBlock);
                // 已经存在单元格则更新数据
                if (blocks.length) {
                    for (let i = 0; i < res.data.length; i++) {
                        this.node.getComponentsInChildren(BankerRecordBlock)[i].render(
                            new BankerRecordInfo(res.data[i]));
                    }
                } else {
                    this.renderBankerList(res.data);
                }
                callback();
            },
        );
    }

    // 渲染筹码列表
    private renderBankerList(dataList: any) {
        for (let i = 0; i < dataList.length; i++) {
            let block = cc.instantiate(this.BlockPrefab);
            this.RecordList.addChild(block, undefined, "Block");

            block.getComponent(BankerRecordBlock).render(
                new BankerRecordInfo(dataList[i]));
        }
        this.RecordScroll.scrollToTop(0);
    }

    private showListActions() {
        // 下落进场动画
        this.RecordList.y = this.RecordList.height;
        let action = cc.sequence(
            cc.delayTime(0.2),
            cc.moveTo(0.5, cc.v2(this.RecordList.x, 0)).easing(cc.easeBackOut())
        );
        this.RecordList.runAction(action);
    }
}
