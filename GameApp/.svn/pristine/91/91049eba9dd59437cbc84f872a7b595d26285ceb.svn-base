import BaseComponent from "../utils/BaseComponent";
import Card from "../view/Card";
import Window from "../view/Window";
import { BlockId } from './../model/BlockId';
/**
 *  路子弹窗控制器
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class VerifyWindowController extends BaseComponent {
    @property(cc.Button)
    private searchButton: cc.Button = null;

    @property(cc.EditBox)
    private searchInput: cc.EditBox = null;

    @property(cc.Node)
    private searchResult: cc.Node = null;

    @property(cc.Node)
    private openBrow: cc.Node = null;

    @property(cc.RichText)
    private hashText: cc.RichText = null;

    @property(Window)
    private window: Window = null;

    onLoad() {
        this.searchButton.node.on(
            cc.Node.EventType.TOUCH_END,
            this.getSearch,
            this
        );
    }

    onEnable() {
        this.searchInput.string = "";
        this.searchResult.active = this.searchInput.string != "";
    }

    public search(blockId: number | string) {
        this.window.open();
        this.searchInput.string = blockId.toString();
        this.getSearch();
    }

    // /niuniu/checkBlockValidation
    private getSearch() {
        let InpVal = this.searchInput.string;
        console.log(InpVal.search(/[^\d]/));
        if (!InpVal.trim()) {
            this.alert("内容不能为空!");
        } else if (InpVal.search(/[^\d]/) != -1) {
            this.alert("只能输入数字!");
        } else {
            this.requestBlock(this.searchInput.string);
            this.openBrow.on(
                cc.Node.EventType.TOUCH_END,
                this.openBrowHandle.bind(this,this.searchInput.string),
                this
            );
        }
    }

    // 获取区块高度详情
    private requestBlock(blockId: number | string) {
        this.httpUtils.post(
            "/hns/niuniu/checkBlockValidation",
            {
                blockId: blockId,
                gameType: 0
            },
            true,
            res => {
                if (!res.data) {
                    this.alert("该区块不是游戏使用区块！");
                    return;
                }
                let cardHash =
                    res.data.cardBanker +
                    res.data.cardSky +
                    res.data.cardLand +
                    res.data.cardMysterious;
                let cards = this.searchResult.getComponentsInChildren(Card);
                this.hashText.string = res.data.hash.replace(
                    res.data.hash.slice(-20),
                    `<color=#ff0000>${res.data.hash.slice(-20)}</color>`
                );
                for (let i = 0; i < cardHash.length; i++) {
                    cards[i].flop(cardHash[i], true);
                }
                this.searchResult.active = this.searchInput.string != "";
            }
        );
    }

    private openBrowHandle(BlockId:string|number) {
        window.open(`https://eospark.com/block/${BlockId}`)
    }
}
