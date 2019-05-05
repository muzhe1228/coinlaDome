var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var Hxnn = (function (_super) {
        __extends(Hxnn, _super);
        function Hxnn() {
            var _this = _super.call(this) || this;
            _this.ajax = new common.HttpUtils(true);
            _this.chipListData = [];
            _this.chipList.vScrollBarSkin = '';
            _this.chipList.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
            _this.chipList.scrollBar.elasticDistance = 100; //设置橡皮筋极限距离。
            _this.chipList.visible = false;
            _this.getChipList(1);
            _this.chipList.mouseHandler = new Laya.Handler(_this, _this.onMouse);
            _this.clickSet.on(Laya.Event.CLICK, _this, _this.showSet);
            _this.sliderSet.on(Laya.Event.MOUSE_OUT, _this, _this.showSet);
            _this.on(Laya.Event.CLICK, _this, _this.CloseSet);
            for (var i = 0; i < 5; i++) {
                _this.sliderSet.getChildByName("item" + i).on(Laya.Event.CLICK, _this, _this.itemClick.bind(_this, i));
            }
            return _this;
        }
        Hxnn.prototype.getChipList = function (roomId) {
            this.ajax.sendPostKey("/hns/niuniu/findBetsList", { roomId: roomId }, this, this.chipListCallback);
        };
        Hxnn.prototype.onMouse = function (e, index) {
            if (e.type == 'click') {
                e.stopPropagation();
                console.log(this.chipListData[index].chipClick.bets);
            }
        };
        Hxnn.prototype.itemClick = function (index, e) {
            console.log(index);
            e.stopPropagation();
        };
        Hxnn.prototype.showSet = function (e) {
            e.stopPropagation();
            this.sliderSet.visible = true;
        };
        Hxnn.prototype.CloseSet = function (e) {
            if (e != this.clickSet && e != this.sliderSet) {
                this.sliderSet.visible = false;
            }
        };
        Hxnn.prototype.sendSmsCallback = function (data) {
            console.log("sendSmsCallback", data);
        };
        Hxnn.prototype.chipListCallback = function (res) {
            var _this = this;
            console.log('chipListCallback', res);
            res.data.forEach(function (item) {
                _this.chipListData.push({
                    chipClick: {
                        skin: 'comp/chip' + item.bets + '.png',
                        bets: item.bets
                    }
                });
            });
            this.chipList.array = this.chipListData;
            this.chipList.visible = true;
        };
        return Hxnn;
    }(ui.HxnnUI));
    view.Hxnn = Hxnn;
})(view || (view = {}));
//# sourceMappingURL=Hxnn.js.map