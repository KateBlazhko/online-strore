import Signal from "../common/signal";

export type Value = {
  [key: string]: string | boolean;
};

export type Sorter = {
  [key: string]: boolean;
};

export type Filter = {
  [key: string]: Value;
};

export type Cart = {
  [key: string]: number;
};

export interface IDataState {
  sorter: Sorter;
  filter: Filter;
  search: string,
  cart: Cart;
}

export class AppState {
  private _dataState: IDataState;

  get dataState() {
    return this._dataState;
  }

  set dataState(value: IDataState) {
    this._dataState = value;

    this.onChange.emit(this._dataState);
  }

  constructor() {
    let dataState: IDataState;
    try {
      dataState = AppState.load();
      // dataState = { sorter: {}, filter: {}, cart: {} }
    } catch (e: unknown) {
      dataState = {
        sorter: {},
        filter: {},
        search: '',
        cart: {},
      };
    }
    this._dataState = dataState;
  }

  public onChange = new Signal<IDataState>();

  static load() {
    const loaded = localStorage.getItem("savedState");

    if (loaded) {
      return JSON.parse(loaded) as IDataState;
    }

    throw new Error("Local Storage empty");
  }

  public save() {
    localStorage.setItem("savedState", JSON.stringify(this.dataState));
  }
}

export default AppState;
