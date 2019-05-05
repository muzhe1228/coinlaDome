const { ccclass, property } = cc._decorator;
import { roomStatus, roomType } from "../model/roomType";

@ccclass
export default class RoomBlock extends cc.Component {
    @property(cc.Node)
    Header: cc.Node = null;

    @property(cc.Node)
    statusBg: cc.Node = null;

    @property(cc.Node)
    chip: cc.Node = null;

    @property(cc.Sprite)
    Photo: cc.Sprite = null;

    @property(cc.Label)
    titleLabel: cc.Label = null;

    @property(cc.LabelOutline)
    outline: cc.LabelOutline = null;

    @property(cc.Label)
    PKNum: cc.Label = null;

    @property(cc.Label)
    peopleNum: cc.Label = null;

    @property(cc.Label)
    maxPk: cc.Label = null;

    @property(cc.Label)
    isOpen: cc.Label = null;

    @property(cc.Label)
    isSize: cc.Label = null;

    @property(cc.SpriteFrame)
    src0: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    src1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    src2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    status0: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    status1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    status2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    chip0: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    chip1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    chip2: cc.SpriteFrame = null;

    private readonly titleColor0 = new cc.Color().fromHEX("#C8774B");
    private readonly titleColor1 = new cc.Color().fromHEX("#1A5A6F");
    private readonly titleColor2 = new cc.Color().fromHEX("#24473E");
    private readonly sizeColor0 = new cc.Color().fromHEX("#844624");
    private readonly sizeColor1 = new cc.Color().fromHEX("#1E5162");
    private readonly sizeColor2 = new cc.Color().fromHEX("#24473E");

    start() {
        this.Header.active = false;
    }

    public setSrc(num: number) {
        this.node.getComponent(cc.Sprite).spriteFrame = this["src" + num];
        this.statusBg.getComponent(cc.Sprite).spriteFrame = this[
            "status" + num
        ];
        this.chip.getComponent(cc.Sprite).spriteFrame = this["chip" + num];
        this.titleLabel.string = roomType[num];
        this.outline.color = this["titleColor" + num];
        this.isOpen.node.color = this["sizeColor" + num];
        this.isSize.node.color = this["sizeColor" + num];
    }

    public setData(data: any) {
        if (!data.isBets) {
            this.Header.active = true;
        }
        this.isOpen.string = roomStatus(data.roomStatus);
        this.PKNum.string = this.numRes(data.bottomBets) + " PK";
        this.peopleNum.string = data.peopleNumber + "人";
        this.maxPk.string =
            this.numRes(data.minBets) + "-" + this.numRes(data.maxBets) + " PK";
    }

    public setPeople(data: any) {
        this.peopleNum.string = data.peopleNumber + "人";
        this.isOpen.string = roomStatus(data.roomStatus);
    }


    //牛牛房间Pk格式化
    private numRes(number) {
        if (number >= 1e7) {
            return this.toThousands(number / 1e6) + "m";
        } else if (number >= 1e4) {
            return this.toThousands(number / 1e3) + "k";
        } else {
            return this.toThousands(number);
        }
    }

    //千分符
    private toThousands(num) {
        // let re = /\d{1,3}(?=(\d{3})+$)/g;
        // let n1 = num.toString();
        // n1 = n1.replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => {
        //     return s1.replace(re, "$&,") + s2;
        // });
        return num;
    }
}
