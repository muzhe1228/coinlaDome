export default {
  // 测试地址
  testENV: {
    name: "test",
    httpApi: "http://192.168.10.200:7001",
    serveChatHttp: "https://support.bbpk.com",//客服聊天http
    serveChatWS: "wss://chat.bbpk.com",//客服聊天ws
    gameSocketURL: 'ws://192.168.10.200:7000/gameSocket',
    ImageURL: 'https://resource.bbpk.com/static/',//图片域名,
    hxnnUrl: "http://192.168.10.201:7456/build/",
    dontCheck: true
  },
  //生产地址
  proENV: {
    name: "prod",
    httpApi: "https://api.pk123.app",
    serveChatHttp: "https://support.pk123.app",//客服聊天http
    serveChatWS: "wss://chat.pk123.app",//客服聊天ws
    gameSocketURL: 'wss://socket.pk123.app/gameSocket',
    ImageURL: 'https://resource.pk123.app/static/',//图片域名
    hxnnUrl: "https://game.pk123.app/hxnn/hxnn.html",
    dontCheck: false
  },
  getENV: function () {
    return this.testENV;
  }
};
