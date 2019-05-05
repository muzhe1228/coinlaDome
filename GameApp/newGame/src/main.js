import Vue from "vue";
import App from "./App.vue";
import "./common/filter";
import "./common/extend";
import router from "./router";
import store from "./Store";
import "./assets/resize";
import "./assets/reset.styl";
import "animate.css";
import VueClipboard from "vue-clipboard2";
import Toast from "./components/Toast";
import Notification from "./components/notification";
import Helpers from "muse-ui/lib/Helpers";
import { lStore, sStore } from "./common/func";
// import loginReg from '././components/Modal/loginReg/index';
window.setToken = function(token) {
  token = token || "";
  lStore.set("MdToken", token);
  store.commit("setMdToken", token);
};
window.setGameVisible = function(visibleFlag) {
  if (lStore.get("Game_Audio_Switch_Standard")) {
    if (visibleFlag == "0") {
      lStore.set("Game_Audio_Switch", false);
    } else {
      lStore.set("Game_Audio_Switch", true);
    }
  } 
};
window.testString = "sdadsadsd";

document.onkeydown = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && (e.keyCode == 13 || e.keyCode == 34 || e.keyCode == 35)) {
    // enter 键
    document.activeElement.blur();
  }
};

Vue.use(VueClipboard)
  .use(Toast)
  .use(Notification)
  .use(Helpers);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
