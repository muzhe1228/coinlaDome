import Vue from "vue";
import Ajax from "./Api";
import {
  lStore,
  sStore,
  clickAudio,
  clickGame,
  closeMainBgm,
  clickChip,
  slideBgm,
  chipDown,
  sendMessage,
  clickOpenClose,
  clickDialog,
  clickAddReduce,
  winPK,
  yaZhu,
  hxjcCountDown,
  hxjcCountDownDing,
  hxjcOpenResult,
  welcomeHXJC,
  hxjcStartGame,
  hxjcXiaZhuSuccess,
  hxjcStopXiaZhu,
  dbWelcom,
  dbStartGame,
  dbXiaZhuSuccess,
  dbStopXiaZhu,
  hxjcPlayAllBackgroundBGM,
  hxjcBackgroundBGM,
  hxjcCloseBackgroundBGM,
  hxjcLoadAllCountDown,
  hxjcLoadAllOpenResult,
  hxjcChipDownBGM,
  hxjcSlideBgm,
  openWechatApp,
  openQQApp,
  clearHistory,
  recaptchaToken,
  requestClientToken,
  changeInput,
  getAppType,
  stringLength
} from "./func";
import EventListener from "./event-listener";

Vue.prototype.$lStore = lStore;
Vue.prototype.$sStore = sStore;

Vue.prototype.$ajax = Ajax;
Vue.prototype.$openWechatApp = openWechatApp;
Vue.prototype.$openQQApp = openQQApp;
Vue.prototype.$EventListener = EventListener({});
Vue.prototype.$clickAudio = clickAudio; //点击声音
Vue.prototype.$clickGame = clickGame; //点击进入游戏
Vue.prototype.$closeMainBgm = closeMainBgm; //关闭主背景音乐
Vue.prototype.$clickChip = clickChip; //点击筹码
Vue.prototype.$slideBgm = slideBgm; //Hxjc开奖的动画轮播
Vue.prototype.$chipDown = chipDown; //Hxjc筹码下落
Vue.prototype.$sendMessage = sendMessage;
Vue.prototype.$winPK = winPK;
Vue.prototype.$yaZhu = yaZhu;
Vue.prototype.$clickOpenClose = clickOpenClose;
Vue.prototype.$clickDialog = clickDialog;
Vue.prototype.$clickAddReduce = clickAddReduce;
Vue.prototype.$hxjcCountDown = hxjcCountDown; //哈希竞猜倒计时音效
Vue.prototype.$hxjcCountDownDing = hxjcCountDownDing; //哈希竞猜封盘音效
Vue.prototype.$hxjcOpenResult = hxjcOpenResult; //哈希竞猜开奖音效

Vue.prototype.$welcomeHXJC = welcomeHXJC; //哈希竞猜欢迎光临
Vue.prototype.$hxjcStartGame = hxjcStartGame; //哈希竞猜开局请下注
Vue.prototype.$hxjcXiaZhuSuccess = hxjcXiaZhuSuccess; //哈希竞猜下注成功
Vue.prototype.$hxjcStopXiaZhu = hxjcStopXiaZhu; //哈希竞猜停止下注

Vue.prototype.$dbWelcom = dbWelcom; //夺宝欢迎光临
Vue.prototype.$dbStartGame = dbStartGame; //夺宝开局请下注
Vue.prototype.$dbXiaZhuSuccess = dbXiaZhuSuccess; //夺宝下注成功
Vue.prototype.$dbStopXiaZhu = dbStopXiaZhu; //夺宝停止下注
Vue.prototype.$hxjcPlayAllBackgroundBGM = hxjcPlayAllBackgroundBGM; //预加载全部背景音乐
Vue.prototype.$hxjcBackgroundBGM = hxjcBackgroundBGM; //随机播放一首背景音乐
Vue.prototype.$hxjcCloseBackgroundBGM = hxjcCloseBackgroundBGM; //暂停哈希竞猜背景音乐
Vue.prototype.$hxjcLoadAllCountDown = hxjcLoadAllCountDown; //预加载全部倒计时语音
Vue.prototype.$hxjcLoadAllOpenResult = hxjcLoadAllOpenResult; //预加载全部开奖结果语音
Vue.prototype.$hxjcChipDownBGM = hxjcChipDownBGM; //筹码飞出音效
Vue.prototype.$hxjcSlideBgm = hxjcSlideBgm; //跑马灯音效
Vue.prototype.$clearHistory = clearHistory; //清空历史页面
Vue.prototype.$recaptchaToken = recaptchaToken; //获取recaptchaToken 的值
Vue.prototype.$requestClientToken = requestClientToken; //获取recaptchaToken 的值
Vue.prototype.$changeInput = changeInput;
Vue.prototype.$getAppType = getAppType;
Vue.prototype.$stringLength = stringLength;
