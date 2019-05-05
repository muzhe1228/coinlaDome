import BaseComponent from "../utils/BaseComponent";
import AudioManager from "../manager/AudioManager";

// 音频控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioController extends BaseComponent {

    start () {
        this.playRemoteEffect("sounds/欢迎光临牛牛游戏.mp3");
        AudioManager.playRandomBgm();
    }

}
