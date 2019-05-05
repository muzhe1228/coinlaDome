(function resize(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth,
        clientHeight = docEl.clientHeight;
      if (!clientWidth) return;

      if (clientHeight < clientWidth) {
        docEl.style.fontSize = clientWidth / 10 + "px";
      } else {
        docEl.style.fontSize = clientHeight / 10 + "px";
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
