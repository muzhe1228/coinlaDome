// const global = require("./global");
import global from "./global";

cc.Class({
  extends: cc.Component,

  properties: {
    mySelfPrefab: {
      default: null,
      type: cc.Prefab
    },
    settingPrefab: {
      default: null,
      type: cc.Prefab
    },
    zhuangPreFab: {
      default: null,
      type: cc.Prefab
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    global.$http.Post(
      "http://192.168.10.200:7001/uac/user/getRandomName",
      {},
      function(err, res) {
        console.log(err, res);
      }
    );
    let mySelf = cc.instantiate(this.mySelfPrefab),
      setting = cc.instantiate(this.settingPrefab),
      zhuang = cc.instantiate(this.zhuangPreFab);
    mySelf.parent = this.node;
    setting.parent = this.node;
    zhuang.parent = this.node;
  }

  // start() {},

  // update (dt) {},
});
