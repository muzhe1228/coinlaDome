import WebsocketUtils from "../network/WebsocketUtils";
import IWebSocketDelegate from "../network/IWebSocketDelegate";
import { CommonConsts } from "../utils/CommonConsts";
import PlayersController from "./PlayersController";
import BankerController from "./BankerController";
import ClockController from "./ClockController";
import PlayerMySelfController from "./PlayerMyselfController";
import ChatMessageController from "./ChatMessageController";
import NoticeController from "./NoticeController";
import CardDealerController from "./CardDealerController";
import BidBankerController from "./BidBankerController";
import { GameType } from "../model/GameType";
import CardResultDealerController from "./CardResultDealerController";
import BaseComponent from "../utils/BaseComponent";
import ProfitController from "./ProfitController";
import ChipAreaController from "./ChipAreaController";
import BankerRecordController from "./BankerRecordController";
import WayController from "./WayController";
import PushController from "./PushController";
import WaitResultController from "./WaitResultController";
import UserBetInfo from "../model/UserBetInfo";
import BankerInfo from "../model/BankerInfo";
import UserPkInfo from "../model/UserPkInfo";
import { GameResult } from "../model/GameResult";
import PlayerHeader from "../model/PlayerHeader";
import GameState, { EnumGameState } from "../model/GameState";
import BidBankerInfo from "../model/BidBankerInfo";
import ChatInfo from "../model/ChatInfo";
import NoticeInfo from "../model/NoticeInfo";
import SceneManager from "../manager/SceneManager";
import TipController from "./TipController";
import BankerProfitInfo from "../model/BankerProfitInfo";
import BetAreaGroupController from "./BetAreaGroupController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends BaseComponent implements IWebSocketDelegate {

    // 房间倍数标签
    @property(cc.Label)
    private oddLabel: cc.Label = null;

    // 房间等级标签
    @property(cc.Label)
    private levelLabel: cc.Label = null;

    // 玩家列表
    private players: PlayersController = null;
    // 庄家信息
    private banker: BankerController = null;
    // 倒计时控件
    private clock: ClockController = null;
    // 下注区域组
    private betAreaGroup: BetAreaGroupController = null;
    // 玩家自己信息
    private playerMyself: PlayerMySelfController = null;
    // 路子
    private way: WayController = null;
    // 竞庄
    private bidBanker: BidBankerController = null;
    // 聊天消息
    private chatMsg: ChatMessageController = null;
    // 公告
    private notice: NoticeController = null;
    // 发牌
    private cardDealer: CardDealerController = null;
    // 发牌结果
    private cardResultDealer: CardResultDealerController = null;
    // 个人输赢结果
    private profit: ProfitController = null;
    // 筹码区
    private chipArea: ChipAreaController = null;
    // 自己是庄右侧显示局数
    private BankerRecord: BankerRecordController = null;
    // 全局推送
    private push: PushController = null;
    // 等待开奖界面
    private waitResult: WaitResultController = null;
    // Tips
    private tips: TipController = null;

    private websocket: WebsocketUtils = null;

    // 是否已经发完牌
    private isSendCardFinished: boolean = false;
    private sendCardCallback: () => void = null;

    private isDestroy: boolean = false;

    private lastGameState: EnumGameState = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 设置切换到后台自动重载
        SceneManager.setInvisibleReload(true, 0);

        this.prepareWebsocket();
        this.requestBankerInfo();
        this.requestBetAreaInfo();
    }

    start() {
        this.initComponents();

        // test-code
        // this.sendCards();
        // this.scheduleOnce(() => {
        //     let gameResult = {
        //         "gameType": "0",
        //         "oddBanker": 0,
        //         "cardLand": "7ba96",
        //         "niuBanker": "没牛",
        //         "oddLand": 1,
        //         "oddMysterious": -5,
        //         "niuLand": "没牛",
        //         "oddSky": -7,
        //         "cardBanker": "261ef",
        //         "userId": 213,
        //         "roomId": "1",
        //         "blockId": 7470405,
        //         "socketType": 3,
        //         "niuMysterious": "牛5",
        //         "niuSky": "牛7",
        //         "cardSky": "f52fa",
        //         "cardMysterious": "8bb7e",
        //         "hash": "0xe213d81d99f4e01b52ae26ae3d70dd0f328ba842e557261eff52fa7ba968bb7e"
        //     };
        //     let niuniuResult = new GameResult(gameResult);
        //     this.onSocketResult(niuniuResult);
        // }, 3);
    }

    onDestroy() {
        super.onDestroy();
        this.isDestroy = true;
        this.websocket.close();
        BaseComponent.bankerInfo = null;
    }

    /**
     * 解析url参数并且连接websocket
     */
    private prepareWebsocket(): boolean {
        this.websocket = new WebsocketUtils(CommonConsts.socketBaseUrl, this);

        let b = this.websocket.open();
        if (!b) {
            //todo...
        }
        return b;
    }

    /**
     * 初始化组件
     */
    private initComponents() {
        this.players = this.getComponentInChildren(PlayersController);
        this.banker = this.getComponentInChildren(BankerController);
        this.clock = this.getComponentInChildren(ClockController);
        this.betAreaGroup = this.getComponentInChildren(BetAreaGroupController);
        this.playerMyself = this.getComponentInChildren(PlayerMySelfController);
        this.cardDealer = this.getComponentInChildren(CardDealerController);
        this.notice = this.getComponentInChildren(NoticeController);
        this.way = cc.find("Canvas/SideBar/Buttons/Way").getComponent(WayController);
        this.chatMsg = cc.find("Canvas/Chat/ChatMessage").getComponent(ChatMessageController);
        this.bidBanker = cc.find("Canvas/BidBanker").getComponent(BidBankerController);
        this.push = cc.find("Canvas/Push").getComponent(PushController);
        this.cardResultDealer = this.getComponentInChildren(CardResultDealerController);
        this.profit = this.getComponentInChildren(ProfitController);
        this.chipArea = this.getComponentInChildren(ChipAreaController);
        this.BankerRecord = this.getComponentInChildren(BankerRecordController);
        this.waitResult = this.getComponentInChildren(WaitResultController);
        this.tips = this.getComponentInChildren(TipController);

        // 注册事件
        this.playerMyself.setBetRequestListener(() => {
            this.playerMyself.setBetClickable(false);
            this.betAreaGroup.requestBet(
                this.playerMyself.setBetClickable.bind(
                    this.playerMyself, true)
            )
        });

        // 聊天 点击事件 传递
        this.chatMsg.setTouchEventCallback(event => {
            let betArea = this.betAreaGroup.betAreaList[0];
            if (betArea.getCanBet() && betArea.cleanMyBet.node.getBoundingBoxToWorld().contains(event.getLocation())) {
                betArea.cleanWantedBetValue();
                return;
            }
            if (betArea.getCanBet() && betArea.chipArea.getBoundingBoxToWorld().contains(event.getLocation())) {
                betArea.onTouchChipArea(event);
                return;
            }
            this.chatMsg.onTouch(event);
        });

        this.initRoomLabel();
    }

    // 初始化左上角房间标签
    private initRoomLabel() {
        if (!BaseComponent.roomInfo)
            return;
        this.oddLabel.string = BaseComponent.roomInfo.roomOdd;
        this.levelLabel.string = BaseComponent.roomInfo.roomType;
        this.oddLabel.node.parent.active = true;
    }

    // 设置是否可下注，同时控制下注区和下注按钮
    private setCanBet(b: boolean) {
        this.betAreaGroup.setCanBet(b);
        this.playerMyself.setBetClickable(b);
    }

    //#region 接口请求及回调

    // 获取庄信息
    public requestBankerInfo() {
        this.httpUtils.post(
            "/hns/niuniu/selectBanker",
            {roomId: this.getRoomId(), token: this.getToken()},
            true,
            this.requestBankerInfoCallback.bind(this)
        );
    }

    public requestBankerInfoCallback(res) {
        let bankInfo = new BankerInfo(res.data);
        this.onSocketBankerInfo(bankInfo);
    }

    // 获取下注区域信息
    public requestBetAreaInfo() {
        this.httpUtils.post(
            "/hns/niuniu/selectRoomByRoomId",
            {token: this.getToken(), roomId: this.getRoomId()},
            true,
            this.requestBetAreaInfoCallback.bind(this)
        );
    }

    public requestBetAreaInfoCallback(res) {
        let betInfo = new UserBetInfo(res.data);
        this.onInitBetInfo(betInfo);
    }

    // 初始化下注信息
    private onInitBetInfo(betInfo: UserBetInfo) {
        let betListInfo = betInfo.getBetPositionList();
        // 更新自己的pk
        this.playerMyself.renderPkChange(betInfo);

        for (let i = 0; i < betListInfo.length; i++) {
            let position = betListInfo[i].getPositionType();

            // 渲染下注
            if (position != 0) {
                // 渲染下注
                let bets = betListInfo[i].getTotalBets();
                let myBets = betListInfo[i].getMyBets();

                if (myBets > 0) {
                    // 渲染我的
                    let mySelfPosition = this.playerMyself.getHeaderWorldPosition();
                    let chips = this.chipArea.splitTotalChip(myBets);
                    this.betAreaGroup.betAreaList[position - 1].renderBet(
                        betListInfo[i],
                        mySelfPosition,
                        true,
                        chips
                    );

                    bets = bets - myBets;
                }

                // 当前筹码在世界坐标系中
                let worldPosition = this.players.getRandomHeaderWorldPosition();
                let chips = this.chipArea.splitTotalChip(bets);
                this.betAreaGroup.betAreaList[position - 1].renderBet(
                    betListInfo[i],
                    worldPosition,
                    false,
                    chips
                );
            }
        }
    }

    //#endregion

    //#region IWebSocketDelegate

    onSocketOpen?(socket: WebSocket, event: Event): void {
        let json = {
            userId: this.getUserId(),
            gameType: 0,
            roomId: this.getRoomId(),
            type: 0
        };
        //请求 WebSocket 房间信息
        this.websocket.sendRawData(JSON.stringify(json));
    }

    onSocketError(socket: WebSocket, event: Event): void {
        this.alert("网络环境异常");
        // TODO 重连弹窗
    }

    onSocketClose(socket: WebSocket, event: CloseEvent): void {
        // WebSocket在非正常关闭时重连
        if (!this.isDestroy) {
            this.alert("网络异常，3秒钟后重新加载");
            this.scheduleOnce(SceneManager.reloadScene, 3);
        }
    }

    onSocketMessage?(socket: WebSocket, event: MessageEvent): void {
        if (event.data[0] != "{")
            return;
        let msgJson = JSON.parse(event.data);
        let socketType = msgJson.socketType;
        switch (socketType) {
            case 2: // 用户资产
                let pkInfo = new UserPkInfo(msgJson);
                this.onSocketMyselfPkInfo(pkInfo);
                break;
            case 3: // 结算
                let niuniuResult = new GameResult(msgJson);
                this.onSocketResult(niuniuResult);
                break;
            case 7: // 玩家列表
                let playerHeader = new PlayerHeader(msgJson);
                this.onSocketPlayers(playerHeader);
                break;
            case 11: // 庄家信息
                let bankInfo = new BankerInfo(msgJson);
                this.onSocketBankerInfo(bankInfo);
                break;
            case 9: // 游戏状态
                let gameState = new GameState(msgJson);
                this.onSocketGameStatus(gameState);
                break;
            case 8: // 下注信息
                let userBetInfo = new UserBetInfo(msgJson);
                this.onSocketBetInfo(userBetInfo);
                break;
            case 12: // 竞庄
                let bidBankerInfo = new BidBankerInfo(msgJson);
                this.onSocketBidBanker(bidBankerInfo);
                break;
            case 4: // 聊天
                let chatInfo = new ChatInfo(msgJson);
                this.onSocketChatMsg(chatInfo);
                break;
            case 1: // 公告
                let noticeInfo = new NoticeInfo(msgJson);
                this.onSocketNotice(noticeInfo);
                break;
            case 14:  // 转账信息
                this.push.renderTransfer(msgJson.message);
                break;
            case 15:  // 下庄
                let bankerProfit = new BankerProfitInfo(msgJson);
                this.onSocketBankerExit(bankerProfit);
                break;
        }
    }

    //#endregion

    //#region socket推送消息

    // 个人资产信息
    private onSocketMyselfPkInfo(info: UserPkInfo) {
        this.setUserBalance(info.getAvailableBalance());
        this.playerMyself.renderPkInfo(info);
    }

    // 玩家头像列表
    private onSocketPlayers(playerHeader: PlayerHeader) {
        if (this.players._isOnLoadCalled) {
            this.players.render(playerHeader);
        }
    }

    // 庄家信息
    private onSocketBankerInfo(bankerInfo: BankerInfo) {
        // 判断如果庄家信息与之前记录的相同，则不更新数据
        let oldInfo = BaseComponent.bankerInfo;
        if (oldInfo && oldInfo.getUserId() == bankerInfo.getUserId()
            && oldInfo.getBankerRound() == bankerInfo.getBankerRound()
            && oldInfo.getBankerBalance() == bankerInfo.getBankerBalance()) {
            return;
        }
        // 记录到全局变量里
        BaseComponent.bankerInfo = bankerInfo;

        let userId = bankerInfo.getUserId();
        if (userId == this.getUserId()) {
            this.players.maxHeaderCount = 18;
            this.playerMyself.renderWithBanker(true, bankerInfo);
            this.banker.close();
            this.bidBanker.renderBanker(true, bankerInfo);
            this.chipArea.node.active = false;
            this.BankerRecord.node.active = true;
            this.BankerRecord.updateBankerRecord()
        } else {
            this.BankerRecord.node.active = false;
            this.chipArea.node.active = true;
            this.players.maxHeaderCount = 6;
            this.playerMyself.renderWithBanker(false, null);
            // userId 为0代表暂无庄家
            if (userId != 0) {
                this.banker.render(bankerInfo);
            } else {
                this.banker.close();
            }
            this.bidBanker.renderBanker(false, bankerInfo);
        }
    }

    // 竞庄信息
    private onSocketBidBanker(bidBankerInfo: BidBankerInfo) {
        this.bidBanker.renderBidding(bidBankerInfo);
    }

    // 聊天消息
    private onSocketChatMsg(chatInfo: ChatInfo) {
        this.chatMsg.renderMessage(chatInfo, chatInfo.getUserId() == this.getUserId());
    }

    // 公告
    private onSocketNotice(noticeInfo: NoticeInfo) {
        this.notice.renderNotice(noticeInfo);
    }

    // 下注信息
    private onSocketBetInfo(betInfo: UserBetInfo) {
        let userId = betInfo.getUserId();
        if (userId == this.getUserId()) {
            // 更新自己的pk
            this.playerMyself.renderPkChange(betInfo);
            this.playRemoteEffect("sounds/下注成功.mp3");
        }
        let betListInfo = betInfo.getBetPositionList();
        for (let i = 0; i < betListInfo.length; i++) {
            let position = betListInfo[i].getPositionType();

            // 当前筹码在世界坐标系中
            let worldPosition;
            //  获取筹码动作的起始位置
            if (userId == this.getUserId()) {
                // 如果是自己
                worldPosition = this.playerMyself.getHeaderWorldPosition();
                // 渲染下注
                this.betAreaGroup.betAreaList[position - 1].renderBet(
                    betListInfo[i],
                    worldPosition,
                    true
                );
            } else {
                // 从玩家列表获取
                worldPosition = this.players.getRandomHeaderWorldPosition();
                // 渲染下注
                let bets = betListInfo[i].getBets();
                if (bets != null) {
                    let chips = this.chipArea.splitTotalChip(bets);
                    this.betAreaGroup.betAreaList[position - 1].renderBet(
                        betListInfo[i],
                        worldPosition,
                        false,
                        chips
                    );
                }
            }
        }
    }

    // 游戏状态
    private onSocketGameStatus(gameStatus: GameState) {
        let state = gameStatus.getStatus();

        switch (state) {
            case EnumGameState.StartBet:     // 下注
                let finishTime = gameStatus.getFinishTime();
                let serverCurrTime = gameStatus.getServerTime();
                let remainTime = (finishTime - serverCurrTime) / 1000;
                this.onGameStartBet(remainTime);
                break;
            case EnumGameState.StopBet:     // 封盘
                this.onGameStopBet(gameStatus.getFinishTime());
                break;
            case EnumGameState.Result:     // 开奖
                this.onGameResult();
                break;
            case EnumGameState.BidBanker:     // 竞庄
                let time = (gameStatus.getFinishTime() - gameStatus.getServerTime()) / 1000;
                this.onGameBidBanker(time);
                break;
            case EnumGameState.BecomeBanker:     // 上庄
                this.onGameChangeBanker();
                break;
            case EnumGameState.CreatePosition:     // 生成位置
                this.onGamePrepare();
                break;
        }
        // 保存当前的游戏状态，用于二次判断
        this.lastGameState = state;
    }

    // 游戏结果
    private onSocketResult(gameResult: GameResult) {
        console.log(gameResult);
        let roomId = gameResult.getRoomId();
        let gameType = gameResult.getGameType();
        if (roomId != this.getRoomId()) {
            return;
        }

        // 其他游戏结果如果收益大于0，推送消息
        if (gameType != GameType.NiuNiu) {
            if (gameResult.getRoundProfit() && gameResult.getRoundProfit() > 0) {
                this.push.renderResult(gameResult);
            }
            return;
        }

        // 关闭等待开奖
        this.waitResult.hide();

        // 如果还没有发牌, 则立即完成发牌、翻牌和显示结果动画
        if (!this.isSendCardFinished) {
            // step1. 停止发牌
            if (this.sendCardCallback != null) {
                this.unschedule(this.sendCardCallback);
                this.sendCardCallback = null;
            }
            // step2.清空牌和结果
            this.cardDealer.recoveryCards();
            this.cardResultDealer.recoveryCardResult();

            this.betAreaGroup.cleanCardsAndResult();

            if (this.playerMyself.isBanker()) {
                this.playerMyself.cleanCardsAndResult();
            } else {
                this.banker.cleanCardsAndResult();
            }
            // step3. 立即重新发牌和显示结果
            this.sendCards(true);

        }

        // 用于发牌后的开奖动画延时的计算
        let delay = 0.5;

        // 发牌结束后再执行开奖动画，避免发牌的回调延迟
        let waitForSendCardFinished = () => {
            if (this.isSendCardFinished) {
                // 留给翻牌的动画时间 = 开奖时间 - 延迟 - 飞筹码等动画的时间
                let remainTime = gameResult.getRemainTime() - delay - 5;
                delay = this.flopCardsAndShowNiuResult(gameResult, delay, remainTime);

                // 显示输赢动效
                this.showWinOrLose(gameResult, delay + 0.3);

                delay += this.isSendCardFinished ? 1 : 0.1;

                // render bet actions
                delay = this.flyChips(gameResult, delay);

                // render game result
                let userId = gameResult.getUserId();
                if (userId == this.getUserId() || this.playerMyself.isBanker()) {
                    let profit = gameResult.getRoundProfit();
                    if (profit != undefined) {
                        // 有输赢, 显示输赢结果
                        this.scheduleOnce(
                            this.profit.renderRoundProfit.bind(this.profit, profit), delay);
                        this.scheduleOnce(this.profit.resetRoundProfit.bind(this.profit), delay + 5);
                    }
                }
            } else {
                this.scheduleOnce(() => {
                    waitForSendCardFinished();
                }, 0.1);
            }
        };
        waitForSendCardFinished();
    }

    // 下庄
    private onSocketBankerExit(bankerProfit: BankerProfitInfo) {
        // 清空庄家全局变量
        BaseComponent.bankerInfo = null;
        // 清除单局收益的提示
        this.profit.resetRoundProfit();
        // 庄家是自己时，显示下庄收益
        if (bankerProfit.getUserId() == this.getUserId()) {
            this.profit.renderBankerProfit(bankerProfit);
            this.scheduleOnce(this.profit.resetBankerProfit.bind(this.profit), 3);
        }
        // 自己是闲家时，显示开始竞庄的提示
        else {
            this.tips.showTip(this.tips.bidBanker);
        }
    }

    //#endregion

    //#region 游戏状态切换

    private onGameStartBet(countdown: number) {
        // 如果上次一次推送的已经是下注状态，则只设置倒计时
        if (this.lastGameState == EnumGameState.StartBet) {
            this.clock.setCountdown(countdown);
            return;
        }

        if (countdown < 0) {
            this.clock.resetTime();
        } else {
            this.clock.setCountdown(countdown);
        }

        let bankerInfo = BaseComponent.bankerInfo;
        // 判断是否是刚竞庄结束
        let justEndBid = (countdown > 20 || countdown < 0) && bankerInfo.getBankerRound() == 1;

        // 剩余时间大于10秒才提示下注
        if (countdown > 10 || countdown < 0) {
            // 庄家是自己的情况
            if (this.bankerIsSelf()) {
                // 刚竞庄结束，提示上庄成功，其他提示闲家下注中
                if (justEndBid) {
                    this.tips.showTip(this.tips.becomeBanker);
                } else {
                    this.tips.showTip(this.tips.startBetForBanker);
                }
            }
            // 庄家是别人的情况
            else {
                if (justEndBid) {
                    this.tips.setBankerName(bankerInfo.getNickname());
                    this.tips.showTip(this.tips.startBetWithBanker);
                } else {
                    this.tips.showTip(this.tips.startBet);
                }
                this.playRemoteEffect("sounds/已开局请下注.mp3");
            }
        }

        this.setCanBet(!this.bankerIsSelf())
    }

    private onGameStopBet(time: number) {
        this.playRemoteEffect("sounds/停止下注.mp3");

        this.setCanBet(false);

        // 显示等待开奖界面
        this.waitResult.show(time);

        // send cards
        this.sendCards();
    }

    private onGameResult() {
        this.setCanBet(false);
    }

    private onGameBidBanker(countdown: number) {
        // 如果上次一次推送的已经是竞庄状态，则只设置倒计时
        if (this.lastGameState == EnumGameState.BidBanker) {
            this.bidBanker.setCountdown(countdown);
            return;
        }
        // 清除下庄后的提示
        this.profit.resetRoundProfit();
        this.profit.resetBankerProfit();
        this.tips.clearTip();
        // 开启竞庄弹窗，并强制不能取消
        this.setCanBet(false);
        this.bidBanker.openFocus();

        if (countdown < 0) {
            this.bidBanker.resetTime();
        } else {
            this.bidBanker.setCountdown(countdown);
        }
    }

    private onGameChangeBanker() {
        // 关闭竞庄弹窗
        this.bidBanker.closeFocus();
        this.setCanBet(false);
    }

    // 开始下注初始化
    private onGamePrepare() {
        this.unscheduleAllCallbacks();

        this.clock.resetTime();

        this.cardDealer.recoveryCards();
        this.cardDealer.moveAction(false, false);

        this.cardResultDealer.recoveryCardResult();

        this.betAreaGroup.resetAllArea();

        if (this.playerMyself.isBanker()) {
            this.playerMyself.cleanCardsAndResult();
        } else {
            this.banker.cleanCardsAndResult();
            this.playerMyself.clearBetAndFrozen();
        }

        // 路子预存储数据
        this.way.preStorageData();

        // reset profit
        this.profit.resetRoundProfit();
        this.profit.resetBankerProfit();

        this.setCanBet(false);

        this.isSendCardFinished = false;

    }

    //#endregion

    //#region 动画执行部分

    // 发牌动画
    private sendCards(isFast: boolean = false) {
        let interval = isFast ? 0 : 0.08;
        let repeat = 19;
        let delay = isFast ? 0 : 0.3;
        let count = 0;

        this.sendCardCallback = () => {
            count++;
            let card = this.cardDealer.drawCard();
            if (count <= 5) {
                if (this.playerMyself.isBanker()) {
                    this.playerMyself.renderSendCard(card, isFast);
                } else {
                    this.banker.renderSendCard(card, isFast);
                }
            } else if (count <= 10) {
                this.betAreaGroup.betAreaList[0].renderSendCard(card, isFast);
            } else if (count <= 15) {
                this.betAreaGroup.betAreaList[1].renderSendCard(card, isFast);
            } else if (count <= 19) {
                this.betAreaGroup.betAreaList[2].renderSendCard(card, isFast);
            } else if (count === 20) {
                this.betAreaGroup.betAreaList[2].renderSendCard(card, isFast,
                    () => {
                        this.isSendCardFinished = true
                    });
            }
        };

        this.cardDealer.moveAction(true, isFast,
            this.schedule.bind(this, this.sendCardCallback, interval, repeat, delay));
    }

    // 翻牌和显示牛几动画
    private flopCardsAndShowNiuResult(gameResult: GameResult, delay: number, remainTime: number): number {
        // 完整动画的时间
        let fullTime = 11.5;
        // 4个位置的翻牌间隔
        let interval = 2.5;
        // 记录翻牌动画的延迟
        let flopDelay = 0;

        // 每个位置先翻4张牌
        for (let i = 0; i < 4; i++) {
            this.scheduleOnce(() => {
                if (i != 3) {
                    let xian = i + 1;
                    let cards = eval("gameResult.getXian" + xian + "Cards()");
                    this.betAreaGroup.betAreaList[i].renderCards(
                        cards,
                        [0, 1, 2, 3],
                        true
                    );
                } else {
                    if (this.playerMyself.isBanker()) {
                        this.playerMyself.renderCards(
                            gameResult.getBankerCards(),
                            [0, 1, 2, 3],
                            true,
                        );
                    } else {
                        this.banker.renderCards(
                            gameResult.getBankerCards(),
                            [0, 1, 2, 3],
                            true,
                        );
                    }
                }
            }, delay)
        }

        // 进行翻最后一张牌的动画的间隔
        let flopOneDelay = 1.5;

        // 每个位置依次翻最后一张牌，并显示牛几
        for (let i = 0; i < 4; i++) {
            // 判断剩余时间是否足够当前位置的翻牌动画时长
            let isFast = false;
            // 翻第一家前需要计算flopOneDelay间隔
            if (i === 0) {
                if (remainTime < fullTime - flopOneDelay) {
                    isFast = true;
                } else {
                    flopDelay += flopOneDelay
                }
            } else {
                if (remainTime < fullTime - flopDelay) {
                    isFast = true;
                }
            }

            this.scheduleOnce(() => {
                // 先翻闲家牌，最后翻庄家牌
                if (i != 3) {
                    let xian = i + 1;
                    if (!isFast)
                        this.playEffect("audio/position/闲" + xian);
                    let cards = eval("gameResult.getXian" + xian + "Cards()");
                    let niu = eval("gameResult.getXian" + xian + "Niu()");
                    this.betAreaGroup.betAreaList[i].renderCards(
                        cards,
                        [4],
                        isFast,
                        () => {
                            this.betAreaGroup.betAreaList[i].renderCardResult(
                                this.cardResultDealer.drawCardResult(),
                                niu,
                                isFast,
                            );
                        },
                    );
                } else {
                    if (!isFast)
                        this.playEffect("audio/position/庄家");
                    if (this.playerMyself.isBanker()) {
                        this.playerMyself.renderCards(
                            gameResult.getBankerCards(),
                            [4],
                            isFast,
                            () => {
                                this.playerMyself.renderCardResult(
                                    this.cardResultDealer.drawCardResult(),
                                    gameResult.getBankerNiu(),
                                    isFast
                                );
                            }
                        );
                    } else {
                        this.banker.renderCards(
                            gameResult.getBankerCards(),
                            [4],
                            isFast,
                            () => {
                                this.banker.renderCardResult(
                                    this.cardResultDealer.drawCardResult(),
                                    gameResult.getBankerNiu(),
                                    isFast
                                );
                            }
                        );
                    }
                }
            }, flopDelay + delay);
            // 将翻盘间隔累加
            flopDelay += isFast ? 0 : interval;
        }
        return flopDelay + delay - 0.5;
    }

    // 输赢动效
    private showWinOrLose(gameResult: GameResult, delay: number) {
        // 闲家位置赢的动画
        this.scheduleOnce(() => {
            this.betAreaGroup.playWinAnim(gameResult);
        }, delay);

        // 庄家通杀或通赔的动画
        // 通杀(所有闲家输)
        if (gameResult.bankerAllWin()) {
            this.scheduleOnce(
                this.tips.showBankerAllWinOrLoseTip.bind(this.tips, true),
                delay + 0.3
            )
        }
        // 通赔(所有闲家赢)
        else if (gameResult.xian1Win()
            && gameResult.xian2Win()
            && gameResult.xian3Win()) {
            this.scheduleOnce(
                this.tips.showBankerAllWinOrLoseTip.bind(this.tips, false),
                delay + 0.3
            )
        }
    }

    // 结算飞筹码动画
    private flyChips(gameResult: GameResult, delay: number): number {
        let interval = 1;
        let repeat = 2;
        let index = 0;

        this.schedule(
            () => {
                switch (index++) {
                    case 0: // 庄家赢的动画
                        let position;
                        if (this.playerMyself.isBanker()) {
                            position = this.playerMyself.getHeaderWorldPosition();
                        } else {
                            position = this.banker.getHeaderWorldPosition();
                        }
                        for (let i = 1; i < 4; i++) {
                            // 赔率是正数时，庄家赢
                            if (eval("gameResult.getXian" + i + "Odd()") > 0) {
                                this.betAreaGroup.betAreaList[i - 1].renderBetToOnePosition(position);
                            }
                        }
                        break;
                    case 1: // 庄家赔到桌上的动画
                        let worldPosition = this.playerMyself.isBanker() ?
                            this.playerMyself.getHeaderWorldPosition()
                            : this.banker.getHeaderWorldPosition();
                        for (let i = 1; i < 4; i++) {
                            // 赔率是负数时，闲家赢
                            if (eval("gameResult.getXian" + i + "Odd()") < 0) {
                                let totalBet = this.betAreaGroup.betAreaList[i - 1].getTotalBetValue();
                                let chips = this.chipArea.splitTotalChip(totalBet);
                                for (let chip of chips) {
                                    this.betAreaGroup.betAreaList[i - 1].renderBetAction(chip, worldPosition);
                                }
                            }
                        }
                        break;
                    case 2: // 桌上赔到闲家的动画
                        let myselfPosition = this.playerMyself.getHeaderWorldPosition();
                        let playersPosition = this.players.getRandomHeaderWorldPosition();
                        for (let i = 1; i < 4; i++) {
                            // 赔率是负数时，闲家赢
                            if (eval("gameResult.getXian" + i + "Odd()") < 0) {
                                this.betAreaGroup.betAreaList[i - 1].renderBetToTwoPosition(
                                    playersPosition,
                                    myselfPosition
                                );
                            }
                        }
                        break;
                }
            },
            interval,
            repeat,
            delay
        );

        return interval * (repeat + 1) + delay;
    }

    //#endregion

}
