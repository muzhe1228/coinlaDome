import SwitchController from "./SwitchController";
import BaseComponent from "../utils/BaseComponent";
import AudioManager from "../manager/AudioManager";

// 游戏设置弹窗控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingWindowController extends BaseComponent {

    @property(SwitchController)
    public musicSwitch: SwitchController = null;

    @property(SwitchController)
    public soundSwitch: SwitchController = null;

    onLoad () {
        this.musicSwitch.node.on("switch-open",
            AudioManager.setMusicState.bind(this, true));
        this.musicSwitch.node.on("switch-close",
            AudioManager.setMusicState.bind(this, false));
        this.soundSwitch.node.on("switch-open",
            AudioManager.setEffectState.bind(this, true));
        this.soundSwitch.node.on("switch-close",
            AudioManager.setEffectState.bind(this, false));
    }

    onEnable () {
        this.prepareSwitches();
    }

    // 读取 LoadStorage 进行初始化开关
    private prepareSwitches () {
        this.musicSwitch.setState(AudioManager.getMusicState(), false);
        this.soundSwitch.setState(AudioManager.getEffectState(), false);
    }

}
