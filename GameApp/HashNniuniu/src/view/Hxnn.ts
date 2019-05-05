/**Created by the LayaAirIDE*/
module view {
	export class Hxnn extends ui.HxnnUI {
		private ajax = new common.HttpUtils(true);
		private chipListData: any[] = [];
		constructor() {
			super();
			this.chipList.vScrollBarSkin = '';
			this.chipList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
			this.chipList.scrollBar.elasticDistance = 100;//设置橡皮筋极限距离。
			this.chipList.visible = false;
			this.getChipList(1);
			this.chipList.mouseHandler = new Laya.Handler(this, this.onMouse);
			this.clickSet.on(Laya.Event.CLICK, this, this.showSet)
			this.sliderSet.on(Laya.Event.MOUSE_OUT, this, this.showSet)
			this.on(Laya.Event.CLICK, this, this.CloseSet)
			for (var i = 0; i < 5; i++) {
				this.sliderSet.getChildByName(`item${i}`).on(Laya.Event.CLICK, this, this.itemClick.bind(this, i))
			}
		}
		public getChipList(roomId: number) {
			this.ajax.sendPostKey("/hns/niuniu/findBetsList", { roomId: roomId }, this, this.chipListCallback);
		}
		private onMouse(e: Laya.Event, index: number): void {
			if (e.type == 'click') {
				console.log(this.chipListData[index].chipClick.bets)
			}
		}
		private itemClick(index, e) {
			console.log(index)
			e.stopPropagation();
		}
		private showSet(e: any): void {
			e.stopPropagation();
			this.sliderSet.visible = true

		}
		private CloseSet(e: any): void {
			if (e != this.clickSet && e != this.sliderSet) {
				this.sliderSet.visible = false
			}
		}
		sendSmsCallback(data: any) {
			console.log("sendSmsCallback", data)
		}
		chipListCallback(res: any) {
			console.log('chipListCallback', res)

			res.data.forEach(item => {
				this.chipListData.push({
					chipClick: {
						skin: 'comp/chip' + item.bets + '.png',
						bets: item.bets
					}

				})
			});
			this.chipList.array = this.chipListData;
			this.chipList.visible = true;
		}
	}
}