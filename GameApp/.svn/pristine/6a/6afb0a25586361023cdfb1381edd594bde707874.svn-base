import BaseComponent from "../utils/BaseComponent";

// 飞行筹码

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlyChip extends BaseComponent {

    @property(cc.Sprite)
    chipSprite: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    public setChip (value: number) {
        let resultSprite = "2x/chip/chip_" + value.toString();
        this.loadResSprite(resultSprite, this.chipSprite);
    }

}
