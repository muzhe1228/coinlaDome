
// 音频管理

import {CommonConsts} from "../utils/CommonConsts";

export default class AudioManager {

    // 背景音乐
    public static getMusicState(): boolean {
        return window.parent.localStorage.getItem("BackGround_BGM_Switch") == "true";
    }

    public static setMusicState(b: boolean) {
        window.parent.localStorage.setItem("BackGround_BGM_Switch", b.toString());
        b ? cc.audioEngine.resumeMusic() : cc.audioEngine.pauseMusic();
    }

    // 音效
    public static getEffectState(): boolean {
        return window.parent.localStorage.getItem("Game_Audio_Switch_Standard") == "true";
    }

    public static setEffectState(b: boolean) {
        window.parent.localStorage.setItem("Game_Audio_Switch_Standard", b.toString());
    }

    public static playRandomBgm () {
        let randint = Math.round(Math.random() * 4) + 1;
        let url = CommonConsts.resourceBaseUrl + "bgm/bgm_" + randint + ".mp3";
        cc.loader.load(url, (err, clip) => {
            if (err) {
                // todo: handle error
                console.log(err.message);
            } else {
                let audioId = cc.audioEngine.playMusic(clip, false);
                cc.audioEngine.setFinishCallback(audioId, this.playRandomBgm.bind(this));
                if (! this.getMusicState())
                    cc.audioEngine.pauseMusic();
            }
        });
    }

}