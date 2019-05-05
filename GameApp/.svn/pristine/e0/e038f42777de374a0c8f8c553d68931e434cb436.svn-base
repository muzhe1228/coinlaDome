
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class HxnnUI extends View {
		public clickSet:Laya.Button;
		public sliderSet:Laya.Box;
		public diPai:Laya.Box;
		public xuanPai:Laya.Box;
		public tianPai:Laya.Box;
		public chipList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":1334,"name":"chipClick","height":750},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/image_bg.jpg"}},{"type":"Button","props":{"y":668,"x":952,"stateNum":1,"skin":"comp/btn_xiaZhu.png","labelSize":26,"labelPadding":"-2","labelFont":"Microsoft YaHei","labelColors":"#fefeff","label":"下注"}},{"type":"Button","props":{"y":668,"x":771,"stateNum":1,"skin":"comp/btn_clear.png","labelSize":24,"labelPadding":"-2","labelFont":"Microsoft YaHei","labelColors":"#fefeff","label":"清空选择"}},{"type":"Image","props":{"y":617,"x":585,"skin":"comp/time.png"},"child":[{"type":"Label","props":{"y":35,"x":32,"text":"24","styleSkin":"comp/label.png","strokeColor":"#4c56be","stroke":1,"fontSize":48,"color":"#fff"}}]},{"type":"Button","props":{"y":171,"x":32,"stateNum":1,"skin":"comp/btn_add.png"}},{"type":"Button","props":{"y":88,"x":32,"var":"clickSet","stateNum":1,"skin":"comp/btn_set.png"},"child":[{"type":"Box","props":{"y":76,"x":-9,"visible":false,"var":"sliderSet"},"child":[{"type":"Image","props":{"width":100,"skin":"comp/bg.png","height":461,"sizeGrid":"34,14,12,11"}},{"type":"Image","props":{"y":29,"x":6,"width":78,"skin":"comp/chip10.png","name":"item0","height":80}},{"type":"Image","props":{"y":117,"x":6,"width":78,"skin":"comp/chip10.png","name":"item1","height":80}},{"type":"Image","props":{"y":205,"x":6,"width":78,"skin":"comp/chip10.png","name":"item2","height":80}},{"type":"Image","props":{"y":293,"x":6,"width":78,"skin":"comp/chip10.png","name":"item3","height":80}},{"type":"Image","props":{"y":381,"x":6,"width":78,"skin":"comp/chip10.png","name":"item4","height":80}}]}]},{"type":"Box","props":{"y":455,"x":527,"var":"diPai"},"child":[{"type":"Image","props":{"width":76,"skin":"comp/pai2.png","name":"item0","height":112}},{"type":"Image","props":{"x":38,"width":76,"skin":"comp/pai2.png","name":"item1","height":112}},{"type":"Image","props":{"x":76,"width":76,"skin":"comp/pai2.png","name":"item2","height":112}},{"type":"Image","props":{"x":114,"width":76,"skin":"comp/pai2.png","name":"item3","height":112}},{"type":"Image","props":{"x":152,"width":76,"skin":"comp/pai2.png","name":"item4","height":112}}]},{"type":"Box","props":{"y":454,"x":875,"var":"xuanPai"},"child":[{"type":"Image","props":{"width":76,"skin":"comp/pai_fan.png","name":"item0","height":112}},{"type":"Image","props":{"x":38,"width":76,"skin":"comp/pai_fan.png","name":"item1","height":112}},{"type":"Image","props":{"x":76,"width":76,"skin":"comp/pai_fan.png","name":"item2","height":112}},{"type":"Image","props":{"x":114,"width":76,"skin":"comp/pai_fan.png","name":"item3","height":112}},{"type":"Image","props":{"x":152,"width":76,"skin":"comp/pai_fan.png","name":"item4","height":112}}]},{"type":"Box","props":{"y":455,"x":185,"var":"tianPai"},"child":[{"type":"Image","props":{"width":76,"skin":"comp/pai_fan.png","name":"item0","height":112}},{"type":"Image","props":{"x":38,"width":76,"skin":"comp/pai_fan.png","name":"item1","height":112}},{"type":"Image","props":{"x":76,"width":76,"skin":"comp/pai_fan.png","name":"item2","height":112}},{"type":"Image","props":{"x":114,"width":76,"skin":"comp/pai_fan.png","name":"item3","height":112}}]},{"type":"Image","props":{"y":0,"x":1186,"width":148,"skin":"comp/bg.png","height":750,"sizeGrid":"34,14,12,11"}},{"type":"List","props":{"y":37,"x":1188,"width":143,"var":"chipList","vScrollBarSkin":"comp/vscroll.png","spaceY":20,"height":675},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Image","props":{"y":17,"x":22,"skin":"comp/chip10.png","name":"chipClick"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HxnnUI.uiView);

        }

    }
}

module ui {
    export class ListPageUI extends View {
		public list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":148,"height":750},"child":[{"type":"Image","props":{"y":0,"x":0,"width":148,"skin":"comp/bg.png","height":750,"sizeGrid":"34,14,12,11"}},{"type":"List","props":{"y":64,"x":4,"width":143,"var":"list","vScrollBarSkin":"comp/vscroll.png","spaceY":3,"height":299},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Image","props":{"width":124,"skin":"comp/img8.png","name":"bg","height":47}},{"type":"Image","props":{"y":4,"x":3,"width":26,"skin":"comp/pai1.png","name":"pai","height":38}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ListPageUI.uiView);

        }

    }
}
