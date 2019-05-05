export default {
  // 测试地址
  testENV: {
    name: "test",
    httpApi: "http://192.168.10.200:7001",
    socketApi: "ws://192.168.10.200:7000/gameChatSocket/0/1",
    socketChat: "ws://192.168.10.200:7000//gameChatSocket",
    socketBenJ: "ws://192.168.10.200:7000//gameCurrentSocket",
    socketStatus: "ws://192.168.10.200:7000//gameStateSwitchSocket",
    socketJZ: "ws://192.168.10.200:7000//gameNiuniuContendSocket",
    socketNotice: "ws://192.168.10.200:7000//noticeSocket",
    socketDuoBao: "ws://192.168.10.200:7000//gameDuobaoListSocket",
    socketDuoBaoDetails: "ws://192.168.10.200:7000//gameDuobaoDetailSocket/",
    socketNiunRen: "ws://192.168.10.200:7000//gameNiuniuListSocket", //牛牛人数监控
    socketCurrency: "ws://192.168.10.200:7000//pkAssetsSocket/", //PK币总量变化
    socketLocation: "ws://192.168.10.200:7000//gamePositionSocket/", //牛牛位置金额
    socketBlock: "ws://192.168.10.200:7000//hashBlockSocket", //牛牛位置金额
    socketBank: "ws://192.168.10.200:7000//gameNiuniuBankerSocket", //牛牛庄家信息
    socketOpen: "ws://192.168.10.200:7000//gameLotterySocket", //开奖结果
  },
  //生产地址
  proENV: {
    name: "prod",
    httpApi: "coinla"
  },
  getENV: function() {
    return this.testENV;
  }
};
