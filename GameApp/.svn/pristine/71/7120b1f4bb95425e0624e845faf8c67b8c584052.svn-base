import DataOwner from "./DataOwner";


export default class DataPages extends DataOwner{

    public getDataList(): any[] {
        return this._data.list;
    }

    public hasNextPage(): boolean {
        return this._data.hasNextPage;
    }

    public getPageSize(): number {
        return this._data.list;
    }

    public getPageNumber(): number {
        return this._data.pageNum;
    }

    public getNextPageNumber(): number {
        return this._data.nextPage;
    }

    public concatPages(nextPages: DataPages) {
        this._data.list = this._data.list.concat(nextPages._data.list);
        this._data.hasNextPage = nextPages._data.hasNextPage;
        this._data.pageNum = nextPages._data.pageNum;
        this._data.size = nextPages._data.size
    }

}