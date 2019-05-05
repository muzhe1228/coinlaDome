
// 场景管理

export default class SceneManager {

    public static visible: boolean = true;

    private static allowReload: boolean = false;

    private static invisibleDuration: number = 0;

    public static invisibleTime: number = 0;

    // 当前界面是否可见(切换后台或锁屏等情况)
    public static getVisible() {
        return this.visible;
    }

    public static setVisible(b : boolean) {
        let old = this.visible;
        this.visible = b;
        if (old != b) {
            this.visibilityCallback(b);
        }
    }

    // 设置长时间界面不可见时，进行重载场景
    public static setInvisibleReload(allow: boolean, duration?: number) {
        this.allowReload = allow;
        this.invisibleDuration = duration || 0;
    }

    // 可见性变化时的回调
    private static visibilityCallback(b: boolean) {
        if (!b) {
            this.invisibleTime = Date.now();
        } else {
            let duration = Date.now() - this.invisibleTime / 1000;
            if (duration >= this.invisibleDuration && this.allowReload) {
                this.reloadScene();
            }
        }
    }

    // 重载当前场景
    public static reloadScene() {
        cc.director.loadScene(cc.director.getScene().name);
    }

}

// 每次运行场景前初始化参数
cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH,
    () => { SceneManager.setInvisibleReload(false, 0) });

cc.game.on(cc.game.EVENT_HIDE,
    () => { SceneManager.setVisible(false) });
cc.game.on(cc.game.EVENT_SHOW,
    () => { SceneManager.setVisible(true) });
