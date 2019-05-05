var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var ListPage = (function (_super) {
        __extends(ListPage, _super);
        function ListPage() {
            var _this = _super.call(this) || this;
            _this.data = [{
                    bg: { skin: 'comp/img1.png' },
                    pai: { skin: 'comp/pai1.png' }
                },
                {
                    bg: { skin: 'comp/img2.png' },
                    pai: { skin: 'comp/pai2.png' }
                },
                {
                    bg: { skin: 'comp/img3.png' },
                    pai: { skin: 'comp/pai3.png' }
                },
                {
                    bg: { skin: 'comp/img4.png' },
                    pai: { skin: 'comp/pai4.png' }
                },
                {
                    bg: { skin: 'comp/img5.png' },
                    pai: { skin: 'comp/pai5.png' }
                },
                {
                    bg: { skin: 'comp/img6.png' },
                    pai: { skin: 'comp/pai6.png' }
                },
                {
                    bg: { skin: 'comp/img7.png' },
                    pai: { skin: 'comp/pai7.png' }
                },
                {
                    bg: { skin: 'comp/img8.png' },
                    pai: { skin: 'comp/pai8.png' }
                },
                {
                    bg: { skin: 'comp/img9.png' },
                    pai: { skin: 'comp/pai9.png' }
                },
                {
                    bg: { skin: 'comp/img10.png' },
                    pai: { skin: 'comp/pai10.png' }
                },
            ];
            _this.list.array = _this.data;
            console.log(_this.list);
            return _this;
        }
        return ListPage;
    }(ui.ListPageUI));
    view.ListPage = ListPage;
})(view || (view = {}));
//# sourceMappingURL=ListPage.js.map