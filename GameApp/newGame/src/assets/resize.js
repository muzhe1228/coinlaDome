import { hxjcCloseBackgroundBGM, hxjcBackgroundBGM, lStore } from "common/func";
import vue from 'vue'

(function resize(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth,
        clientHeight = docEl.clientHeight,
        num = (1 - (window.devicePixelRatio % 1)) * 16;
      if (!clientWidth) return;
      if (clientHeight < clientWidth) {
        docEl.style.fontSize =
          (clientHeight * 1.75) / 10 - (clientHeight * 1.75) / 10 / num + "px";
      } else {
        docEl.style.fontSize =
          (clientWidth * 1.75) / 10 - (clientWidth * 1.75) / 10 / num + "px";
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
document.addEventListener("visibilitychange", () => {
  if (lStore.get("BackGround_BGM_Switch")) {
    if (document.hidden) {
      hxjcCloseBackgroundBGM();
    } else {
      hxjcBackgroundBGM();
    }
  } else {
    hxjcCloseBackgroundBGM();
    lStore.set("BackGround_BGM_Switch", false);
  }

  if (lStore.get("Game_Audio_Switch_Standard")) {
    if (document.hidden) {
      lStore.set("Game_Audio_Switch", false);
    } else {
      lStore.set("Game_Audio_Switch", true);
    }
  } 
});
