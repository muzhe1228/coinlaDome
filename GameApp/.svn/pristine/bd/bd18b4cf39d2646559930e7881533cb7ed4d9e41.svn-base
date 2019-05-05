import DataOwner from "./DataOwner";
import DataPages from "./DataPages";

// 路子信息

export class WayInfoPages extends DataPages {

    private wayInfoList: WayInfo[] = null;

    public getWayInfoList(): WayInfo[] {
        if (this.wayInfoList == null
            || this.wayInfoList.length != this.getDataList().length) {
            this.wayInfoList = this.getDataList().map(
                data => new WayInfo(data));
        }
        return this.wayInfoList;
    };

    public getFirstBlockId(): number {
        return this.getWayInfoList()[0].getBlockId()
    }

    public concatPages(pages: WayInfoPages) {
        let blockIds = this._data.list.map(
            data => data.blockId);
        let newList = [];
        for (let data of pages._data.list) {
            // 根据区块ID与原数组去重
            if (blockIds.indexOf(data.blockId > -1)) {
                continue;
            }
            blockIds.push(data.blockId);
            newList.push(data);
        }
        this._data.list.concat(newList);
        // 根据ID从大到小排序
        newList.sort((a, b) => b.blockId - a.blockId);
        // 更新封装的数组
        this.wayInfoList = this.getDataList().map(
            data => new WayInfo(data));
        this._data.hasNextPage = pages._data.hasNextPage;
        this._data.pageNum = pages._data.pageNum;
        this._data.size += pages._data.size
    }
}


export class WayInfo extends DataOwner {

    public getBlockId(): number {
        return this._data.blockId;
    }

    // 每个位置的牌，示例：'ae42c'
    public getBankerCards(): string {
        return this._data.cardBanker;
    }

    public getXian1Cards(): string {
        return this._data.cardSky;
    }

    public getXian2Cards(): string {
        return this._data.cardLand;
    }

    public getXian3Cards(): string {
        return this._data.cardMysterious;
    }

    // 每个位置的牛几结果
    public getBankerNiu(): string {
        return this._data.niuBanker;
    }

    public getXian1Niu(): string {
        return this._data.niuSky;
    }

    public getXian2Niu(): string {
        return this._data.niuLand;
    }

    public getXian3Niu(): string {
        return this._data.niuMysterious;
    }

    // 三个闲家的赔率，正是闲输，负是闲赢，数字代表赢输几倍
    public getXian1Odd(): number {
        return this._data.niuOddSky;
    }

    public getXian2Odd(): number {
        return this._data.niuOddLand;
    }

    public getXian3Odd(): number {
        return this._data.niuOddMysterious;
    }

    // 每个位置是否赢
    public bankerAllWin(): boolean {
        return this.getXian1Odd() > 0
            && this.getXian2Odd() > 0
            && this.getXian3Odd() > 0;
    }

    public xian1Win(): boolean {
        return this.getXian1Odd() < 0;
    }

    public xian2Win(): boolean {
        return this.getXian2Odd() < 0;
    }

    public xian3Win(): boolean {
        return this.getXian3Odd() < 0;
    }
}


export class WayWinInfo extends DataOwner {

    public getTotalRounds(): number {
        return this._data.allNumber;
    }

    public getXian1Wins(): number {
        return this._data.skyNumber || 0;
    }

    public getXian2Wins(): number {
        return this._data.landNumber || 0;
    }

    public getXian3Wins(): number {
        return this._data.mysteriousNumber || 0;
    }

}
