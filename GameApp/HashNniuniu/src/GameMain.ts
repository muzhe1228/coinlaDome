import WebGL = Laya.WebGL;
// 程序入口
class GameMain {
    constructor() {
        Laya.init(1334, 750, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignH = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;

        Laya.loader.load('res/atlas/comp.atlas', Laya.Handler.create(this, this.onLoaded));
    }
    private onLoaded(): void {
        var test: view.Hxnn = new view.Hxnn();
		Laya.stage.addChild(test)
        
    }
}
new GameMain();