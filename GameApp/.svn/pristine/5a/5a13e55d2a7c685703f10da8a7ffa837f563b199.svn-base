import BaseComponent from "../utils/BaseComponent";
import AppManager from "../manager/AppManager";

// 富文本中的点击回调

const {ccclass, property} = cc._decorator;


@ccclass
export default class RichTextHandlers extends BaseComponent{

    private onCopyClick(event, param){
        AppManager.copyToClipBoard(
            param,
            this.alert.bind(this, "复制成功"),
            this.alert.bind(this, "复制失败，可能系统不支持")
        );
    }

}