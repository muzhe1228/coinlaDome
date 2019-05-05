// const EventListener = require("./event-listener");
// const global = require("./global");
import global from "./global";
import EventListener from "./event-listener";
import http from './ajax'
cc.Class({
  extends: cc.Component,

  properties: {
    MainWorld: {}
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    global.eventlistener = EventListener({});
    global.$http = new http()
    global.eventlistener.on("login", this.Login);
    global.eventlistener.on("addPk", this.AddPk);
    global.eventlistener.on("setBtn", this.setBtn);
  },
  Login(uid) {
    cc.log("button click = " + uid);
  },
  AddPk(msg) {
    cc.log("addPk = " + msg);
  },
  setBtn(msg) {
    cc.log("addPk = " + msg);
  },
  start() {}

  // update (dt) {},
});
