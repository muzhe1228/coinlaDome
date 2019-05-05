import {CurrencyType} from "../model/CurrencyType";
import RechargeInfo from "../model/RechargeInfo";
import QrCode from "../view/QrCode";
import AppManager from "../manager/AppManager";
import BaseComponent from "../utils/BaseComponent";

// 充值弹窗控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class RechargeWindowController extends BaseComponent {

    // 所有币种的标签
    @property(cc.ToggleContainer)
    private tabs: cc.ToggleContainer = null;

    // 兑换比例节点
    @property(cc.Node)
    private proportion: cc.Node = null;

    // 兑换比例的约等式
    @property(cc.Label)
    private equation: cc.Label = null;

    // 二维码
    @property(cc.Node)
    private qrItem: cc.Node = null;

    // 起充限制描述
    @property(cc.Label)
    private limitText: cc.Label = null;

    // 地址节点
    @property(cc.Node)
    private urlItem: cc.Node = null;

    @property(cc.Label)
    private url: cc.Label = null;

    // 当前选中的标签
    private checkedTab: cc.Toggle = null;

    onLoad() {
        this.hideAddress();

        // 绑定切换标签的监听事件，并指定默认选中的标签
        for (let tab of this.tabs.toggleItems) {
            tab.node.on("toggle", this.toggleTab, this);
            if (tab.isChecked)
                this.checkedTab = tab;
        }

        this.changeIconColor();

        this.urlItem.on(cc.Node.EventType.TOUCH_START, this.onCopyClick, this);
    }

    onEnable() {
        if (!this.qrItem.opacity) {
            this.toggleTab(this.checkedTab);
        }
    }

    // 切换标签后的行为逻辑
    private toggleTab(toggle: cc.Toggle) {
        this.checkedTab = toggle;
        this.hideAddress();
        this.requestAddress(CurrencyType[toggle.node.name]);
        this.changeIconColor();
    }

    // 请求充值地址接口
    private requestAddress(currencyType: number) {
        enum ApiRoot {
            "/ethes" = CurrencyType.ETH,
            "/btces" = CurrencyType.BTC,
            "/usdtes" = CurrencyType.USDT
        }

        this.httpUtils.post(
            ApiRoot[currencyType] + "/query/recharge",
            {
                "token": this.getToken(),
                "currencyType": currencyType
            },
            true,
            this.requestAddressCallback.bind(this)
        );
    }

    private requestAddressCallback(res) {
        let rechargeInfo = new RechargeInfo(res.data);
        this.renderAddress(rechargeInfo);
        this.showAddress();
    }

    // 渲染充值地址
    private renderAddress(rechargeInfo: RechargeInfo) {
        let currencyName = this.checkedTab.node.name;
        // 兑换比例的等式
        let equal = this.checkedTab.node.name != "USDT" ? " ≈ " : " = ";
        this.equation.string = "1" + currencyName + equal + rechargeInfo.getProportion() + "PK";
        let address = rechargeInfo.getAddress();
        this.url.string = address;
        // 根据地址Url生成二维码
        this.qrItem.getComponentInChildren(QrCode).drawQrCode(address);
        // 起充额描述
        let limit = rechargeInfo.getLimit().toString();
        this.limitText.string = "* " + limit + " " + currencyName + " 起充";
    }

    // 使选中标签的icon转成彩色，其他标签转成灰色
    private changeIconColor() {
        for (let tab of this.tabs.toggleItems) {
            tab.node.getChildByName("Item").getComponentInChildren(
                cc.Sprite).setState(Number(!tab.isChecked));
        }
    }

    // 显示地址
    private showAddress() {
        this.proportion.opacity = 255;
        this.qrItem.opacity = 255;
        this.urlItem.opacity = 255;
    }

    // 隐藏地址
    private hideAddress() {
        this.proportion.opacity = 0;
        this.qrItem.opacity = 0;
        this.urlItem.opacity = 0;
    }

    private onCopyClick() {
        let text = this.url.string;
        AppManager.copyToClipBoard(
            text,
            this.alert.bind(this, "复制成功"),
            this.alert.bind(this, "复制失败，可能系统不支持")
        );
    }

}
