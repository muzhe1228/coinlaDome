import ScrollNumber from "../view/ScrollNumber";
import UserInfo from "../model/UserInfo";
import UserPkInfo from "../model/UserPkInfo";
import UserBetInfo from "../model/UserBetInfo";
import AddCell from "../view/AddCell";
import CardsAndResultComponent from "../utils/CardsAndResultComponent";
import BankerInfo from "../model/BankerInfo";
import { CurrencyType } from "../model/CurrencyType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerMySelfController extends CardsAndResultComponent {
    @property(cc.Sprite)
    private head: cc.Sprite = null;

    @property(cc.Sprite)
    private bankTag: cc.Sprite = null;

    @property(cc.Label)
    private nickname: cc.Label = null;

    @property(ScrollNumber)
    private balance: ScrollNumber = null;

    // 下注金额
    @property(cc.Node)
    private betPkNode: cc.Node = null;

    @property(ScrollNumber)
    private betPk: ScrollNumber = null;

    // 冻结金额
    @property(cc.Node)
    private frozenPkNode: cc.Node = null;

    @property(ScrollNumber)
    private frozenPk: ScrollNumber = null;

    // 坐庄本金
    @property(cc.Node)
    private principalPkNode: cc.Node = null;

    @property(ScrollNumber)
    private principalPk: ScrollNumber = null;

    @property(cc.Label)
    private round: cc.Label = null;

    @property(cc.Button)
    private requestBet: cc.Button = null;

    //加注
    @property(cc.Node)
    private Annotation: cc.Node = null;

    @property(cc.Node)
    private JiaZhu: cc.Node = null;

    private bankerIsMyself: boolean = false;

    private betCallback: () => void = () => {};

    onLoad() {
        // 初始化用户信息
        this.requestUserInfo();
        this.requestUserPkInfo();
        this.bindAdd();
    }

    //#region 网络请求部分

    // 获取用户信息
    public requestUserInfo() {
        this.httpUtils.post(
            "/uac/user/selectUserInfo",
            { token: this.getToken() },
            true,
            this.requestUserInfoCallback.bind(this)
        );
    }

    public requestUserInfoCallback(res) {
        this.renderUserInfo(new UserInfo(res.data));
    }

    // 获取用户Pk信息
    public requestUserPkInfo() {
        this.httpUtils.post(
            "/uas/userAssets/findPkBalance",
            {
                token: this.getToken(),
                currencyType: CurrencyType.PK
            },
            true,
            this.requestUserPkInfoCallback.bind(this)
        );
    }

    public requestUserPkInfoCallback(res) {
        let userInfo = new UserPkInfo(res.data);
        this.setUserBalance(userInfo.getAvailableBalance());
        this.renderPkInfo(new UserPkInfo(res.data));
    }
    //请求是否加注接口
    private getAdds() {
        this.httpUtils.post(
            "/hns/niuniu/checkChips",
            {
                roomId: this.getRoomId(),
                token: this.getToken()
            },
            true,
            this.requestIsAdd.bind(this),
            true
        );
    }
    //获取是否加注和底注 回调
    private requestIsAdd(res: any) {
        if (!res.data.isAdd) {
            this.bindAdd(res.data);
            this.Annotation.active = true;
        } else {
            this.isSHowBtn(true);
        }
    }
    //绑定加注详情按钮
    private bindAdd(data?: any) {
        const adds = 0.5;
        let addCell = this.getComponentsInChildren(AddCell);
        for (let i = 0; i < addCell.length; i++) {
            if (data) {
                addCell[i].setState({
                    ann: 50 * i + "%",
                    num: this.numRes(data.bets * adds * i)
                });
            }
            addCell[i].node.on(
                cc.Node.EventType.TOUCH_END,
                this.clickJiazhu.bind(this, adds * i),
                this
            );
        }
    }
    // 点击加注详情按钮
    clickJiazhu(odds: number) {
        this.httpUtils.post(
            "/hns/niuniu/addChips",
            { odds: odds, roomId: this.getRoomId(), token: this.getToken() },
            true,
            res => {
                this.alert("加注成功，祝您游戏愉快！");
                this.isSHowBtn(true);
            }
        );
    }
    //#endregion

    // 设置下注按钮是否可点击
    public setBetClickable(bool: boolean) {
        if (bool) {
            this.requestBet.node.on(
                cc.Node.EventType.TOUCH_END,
                this.betCallback,
                this
            );
            this.requestBet.interactable = true;
        } else {
            this.requestBet.interactable = false;
            this.requestBet.node.off(cc.Node.EventType.TOUCH_END);
        }
    }

    // 获取头像世界空间位置
    public getHeaderWorldPosition(): cc.Vec2 {
        let pos = this.head.node.position;
        return this.head.node.parent.convertToWorldSpaceAR(pos);
    }
    private showJiaZhu() {
        if (this.Annotation.active) {
            this.Annotation.active = false;
        } else {
            let isAdd = this.Annotation.getComponentsInChildren(AddCell);
            if (isAdd.length == 0) {
                this.getAdds();
            } else {
                this.Annotation.active = true;
            }
        }
    }

    //是否显示本金按钮
    private isSHowBtn(isShow?: boolean) {
        if (isShow) {
            this.JiaZhu.active = false;
            this.Annotation.active = false;
        } else {
            this.httpUtils.post(
                "/hns/niuniu/checkChips",
                {
                    roomId: this.getRoomId(),
                    token: this.getToken()
                },
                true,
                res => {
                    if (res.data.isAdd) {
                        this.JiaZhu.on(
                            cc.Node.EventType.TOUCH_END,
                            this.showJiaZhu,
                            this
                        );
                        this.JiaZhu.active = true;
                    } else {
                        this.JiaZhu.active = false;
                        this.Annotation.active = false;
                    }
                }
            );
        }
    }

    public renderWithBanker(isBanker: boolean, bankerInfo: BankerInfo) {
        this.bankerIsMyself = isBanker;
        if (isBanker) {
            this.isSHowBtn();
            this.bankTag.node.active = true;
            this.requestBet.node.active = false;
            this.frozenPkNode.active = false;
            this.betPkNode.active = false;
            this.round.node.active = true;
            this.round.string =
                "[" +
                bankerInfo.getBankerRound() +
                "/" +
                bankerInfo.getMaxRound() +
                "]";
            this.principalPkNode.active = true;
            this.principalPk.setNumber(bankerInfo.getBankerBalance());
            this.cardGroup.node.active = true;
        } else {
            this.isSHowBtn(true);
            this.bankTag.node.active = false;
            this.requestBet.node.active = true;
            this.frozenPkNode.active = true;
            this.betPkNode.active = true;
            this.clearBetAndFrozen();
            this.round.node.active = false;
            this.principalPkNode.active = false;
            this.cardGroup.node.active = false;
            this.cardResult.node.active = false;
        }
    }

    public renderUserInfo(userInfo: UserInfo) {
        this.nickname.string = userInfo.getNickname();
        this.loadRemoteSprite(userInfo.getHeadUrlPath(), this.head);
    }

    public renderPkInfo(pkInfo: UserPkInfo) {
        this.balance.setNumber(pkInfo.getAvailableBalance());
    }

    public renderPkChange(pkChange: UserBetInfo) {
        if (!this.betPkNode.active || !this.frozenPkNode.active) return;
        this.betPk.setNumber(pkChange.getTotalBetBalance());
        this.frozenPk.setNumber(pkChange.getFrozenBalance());
    }

    // 请求下注事件
    public setBetRequestListener(callback: () => void) {
        this.betCallback = callback;
        this.requestBet.node.on(cc.Node.EventType.TOUCH_END, callback, this);
    }

    // 下注和冻结金额清零
    public clearBetAndFrozen() {
        if (!this.betPkNode.active || !this.frozenPkNode.active) return;
        this.betPk.setNumber(0);
        this.frozenPk.setNumber(0);
    }

    // 我是否是庄
    public isBanker() {
        return this.bankerIsMyself;
    }

    //Pk格式化
    private numRes(number) {
        if (number >= 10000) {
            return this.toThousands(number / 10000) + "w";
        } else {
            return this.toThousands(number);
        }
    }

    //千分符
    private toThousands(num) {
        let re = /\d{1,3}(?=(\d{3})+$)/g;
        let n1 = num.toString();
        n1 = n1.replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => {
            return s1.replace(re, "$&,") + s2;
        });
        return num;
    }
}
