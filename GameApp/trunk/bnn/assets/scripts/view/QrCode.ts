// 二维码视图

const {ccclass, property} = cc._decorator;

@ccclass
export default class QrCode extends cc.Component {

    @property(cc.String)
    private text: string = "";

    onLoad() {
        if (this.text) {
            this.drawQrCode(this.text);
        }
    }

    public drawQrCode(url) {
        let ctx = this.node.addComponent(cc.Graphics);
        let qrCode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrCode.addData(url);
        qrCode.make();

        ctx.fillColor = cc.Color.BLACK;
        //块宽高
        let tileW = this.node.width / qrCode.getModuleCount();
        let tileH = this.node.height / qrCode.getModuleCount();

        // draw in the Graphics
        for (let row = 0; row < qrCode.getModuleCount(); row++) {
            for (let col = 0; col < qrCode.getModuleCount(); col++) {
                if (qrCode.isDark(row, col)) {
                    let x = Math.round(col * tileW) - this.node.width * this.node.anchorX;
                    let y = Math.round(row * tileH) - this.node.height * this.node.anchorY;
                    let w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                    let h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                    ctx.rect(x, y, w, h);
                    ctx.fill();
                }
            }
        }
    }

}
