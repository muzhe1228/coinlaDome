var WebGL = Laya.WebGL;
// 程序入口
var GameMain = (function () {
    function GameMain() {
        Laya.init(1334, 750, WebGL);
        Laya.loader.load('res/atlas/comp.atlas', Laya.Handler.create(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        var test = new view.Hxnn();
        Laya.stage.addChild(test);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map