import { IDataState, Filter, Value } from "./appState";

export interface IDataItem {
  image: string;
  vendor: string;
  model: string;
  chipmaker: string;
  memory: string;
  gpu: string;
  other: string;
  price: string;
  release: string;
  popular: string;
  quantity: string;
  id: string;
}

class AppModel {
  private _data: IDataItem[];
  private assortedData: IDataItem[];
  public renderData: (data: readonly IDataItem[]) => void;

  get data() {
    return this._data;
  }

  set data(value: IDataItem[]) {
    this._data = value;
  }

  constructor() {
    this._data = [];
    this.assortedData = [];
    this.renderData = () => {};
  }

  public filterData(dataState: IDataState) {
    if (this.data) {
      if (Object.keys(dataState.filter).length > 0) {
        const filter: Filter = dataState.filter;
        const filters: string[] = Object.keys(filter);

        const filterData = filters.reduce((res: IDataItem[], param) => {
          return AppModel.filter(res, param as keyof IDataItem, filter[param]);
        }, this.data);

        this.sortData(filterData, dataState);
      } else {
        this.sortData(this.data, dataState);
      }
    }
  }

  private static filter(
    arr: IDataItem[],
    param: keyof IDataItem,
    value: Value | string
  ) {
    const pItem = arr.filter((item) => {
      if (typeof value === "string") {
        return item[param].toLowerCase().includes(value.toLowerCase());
      }

      if (typeof value === "object") {
        if ("left" in value || "right" in value) {
          if (value.left && value.right)
            return +item[param] >= +value.left && +item[param] <= +value.right;
          if (value.left) return +item[param] >= +value.left;
          if (value.right) return +item[param] <= +value.right;
        } else {
          for (const key in value) {
            if (item[param] === value[key]) return true;
            if (item[param] === key) return true;
          }
          return false;
        }
      }
    });

    return pItem;
  }

  private sortData(data: readonly IDataItem[], dataState: IDataState) {
    const sorter = dataState.sorter;
    this.assortedData = data.slice();
    if (Object.keys(sorter).length > 0) {
      const key = Object.getOwnPropertyNames(sorter)[0];

      const id = key.split(".")[1] as keyof IDataItem;
      const isUp = key.split(".")[2] === "up" ? true : false;

      if (isUp) {
        this.assortedData.sort((a, b) => {
          if (a[id] > b[id]) return 1;
          if (a[id] == b[id]) return 0;
          if (a[id] < b[id]) return -1;
          return 0;
        });
      } else {
        this.assortedData.sort((a, b) => {
          if (a[id] < b[id]) return 1;
          if (a[id] == b[id]) return 0;
          if (a[id] > b[id]) return -1;
          return 0;
        });
      }
    }

    this.searchInData(this.assortedData, dataState)
    // this.renderData(this.assortedData);
  }

  public searchInData(data: readonly IDataItem[], dataState: IDataState) {
    let searchData = this.assortedData.slice();
    const value = dataState.search
    if (value) {
      searchData = AppModel.filter(searchData, "model", value);
    }
    this.renderData(searchData);
  }
}

export default AppModel;
