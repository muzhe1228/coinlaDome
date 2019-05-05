import BaseComponent from "../utils/BaseComponent";

/**
 * 用户头像
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerOther extends BaseComponent {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    public setHeaderWithImageUrl(url: string, callback?: () => void) {
        this.loadRemoteSprite(url, this.sprite, callback);
    }

}
