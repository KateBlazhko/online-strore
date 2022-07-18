import Loader from "./loader";
import AppState from "../model/appState";
import { IDataState, Filter, Sorter } from "../model/appState";
import { Value, Cart } from "../model/appState";
import IOptions from "./IOptions";
import AppModel from "../model/appModel";

type Callback<Data> = (data: Data) => void;

class AppController {
  private state: AppState;
  private filter: Filter;
  private sorter: Sorter;
  private cart: Cart;
  private countInCart: number;
  private model: AppModel;
  private _dataState: IDataState;
  public options: IOptions | null;

  get dataState() {
    return this._dataState;
  }

  set dataState(value: IDataState) {
    this._dataState = value;

    this.cart = value.cart;
    this.countInCart = Object.values(this.cart).reduce(
      (sum, item) => sum + item,
      0
    );

    this.model.filterData(this._dataState);
  }

  constructor(state: AppState, model: AppModel) {
    this.state = state;
    this._dataState = this.state.dataState;
    this.filter = this.state.dataState.filter;
    this.sorter = this.state.dataState.sorter;
    this.cart = this.state.dataState.cart;
    this.model = model;
    this.options = null;
    this.countInCart = Object.values(this.cart).reduce(
      (sum, item) => sum + item,
      0
    );

    const onChange = (dataState: IDataState) => {
      this.dataState = dataState;
      this.filter = this.dataState.filter;
      this.sorter = this.dataState.sorter;
    };

    this.state.onChange.add(onChange);
  }

  public static getData<T>(baseLink: string, callback: Callback<T>): void {
    Loader.load<T>(baseLink, callback);
  }

  public addInCart(id: string, count: number) {
    if (this.countInCart < 20) {
      if (`${id}` in this.cart) {
        if (this.cart[id] < count) {
          this.cart[id] += 1;
          this.countInCart += 1;

          this.state.dataState = {
            ...this.state.dataState,

            cart: {
              ...this.cart,
            },
          };
          return true;
        }

        return "Unavailable count";
      }

      this.cart = {
        ...this.cart,
        [id]: 1,
      };
      this.countInCart += 1;

      this.state.dataState = {
        ...this.state.dataState,

        cart: {
          ...this.cart,
        },
      };

      return true;
    }
    return "The cart is full";
  }

  public removeFromCart(id: string): number {
    if (`${id}` in this.cart) {
      this.countInCart -= this.cart[id];
      delete this.cart[id];
    }
    this.state.dataState = {
      ...this.state.dataState,

      cart: {
        ...this.cart,
      },
    };
    return this.countInCart;
  }

  public getParamCart(): [string[], number] {
    return [Object.keys(this.cart), this.countInCart];
  }

  public onReset() {
    this.state.dataState = {
      ...this.state.dataState,
      filter: {},
      search: "",
    };
  }

  public onResetAll() {
    this.state.dataState = {
      sorter: {},
      filter: {},
      search: "",
      cart: {},
    };
  }

  public getParamSorter() {
    const paramSorter = this.options?.paramSorter;
    if (this.dataState && Object.keys(this.sorter).length > 0) {
      const key = Object.getOwnPropertyNames(this.sorter)[0];

      return {
        ...paramSorter,
        [key]: true,
      };
    }
    return paramSorter;
  }

  public onSorterChange(id: string) {
    this.state.dataState = {
      ...this.state.dataState,

      sorter: {
        [id]: true,
      },
    };
  }

  public getParamInputRange() {
    if (this.options !== null) {
      const paramInputRange = this.options.paramInputRange;
      const paramList = paramInputRange.slice().map((input, index) => {
        const id = input.id;
        const arrValue = this.model.data.map((item) => {
          return isNaN(parseInt(item[id])) ? 0 : parseInt(item[id]);
        });
        const min = Math.min(...arrValue).toString();
        const max = Math.max(...arrValue).toString();

        if (this.dataState && this.filter[id]) {
          return {
            ...paramInputRange[index],
            value: {
              ...paramInputRange[index].value,
              ...this.filter[id],
            },
            max: max,
            min: min,
          };
        } else {
          return {
            ...paramInputRange[index],
            max: max,
            min: min,
          };
        }
      });
      return paramList;
    }
  }

  public onFilterChange(
    idValue: string,
    value: string | boolean,
    nameValue: string
  ) {
    const newFilter: Filter = this.filter[idValue]
      ? {
          [idValue]: {
            ...this.filter[idValue],
            [nameValue]: value,
          },
        }
      : {
          [idValue]: {
            [nameValue]: value,
          },
        };

    this.state.dataState = {
      ...this.state.dataState,

      filter: {
        ...this.filter,
        ...newFilter,
      },
    };
  }

  onSearchChange(value: string) {
    this.state.dataState = {
      ...this.state.dataState,

      search: value,
    };
  }

  getSearchValue() {
    return this.state.dataState.search;
  }

  public onFilterReset(idValue: string, nameValue: string) {
    const item = this.filter[idValue];

    if (item && !Array.isArray(item)) {
      delete item[nameValue];
    }

    if (Object.keys(item).length == 0) {
      delete this.filter[idValue];
    }

    this.state.dataState = {
      ...this.state.dataState,
    };
  }

  getParamInputValue() {
    if (this.options != null) {
      const paramInputValue = this.options.paramInputValue;
      const paramList = paramInputValue.slice().map((input, index) => {
        const id = input.id;

        const values: Value = this.model.data
          .reduce((res: string[], item) => {
            if (typeof item[id] === "boolean") {
              if (Boolean(item[id])) res.push("true");
              return res;
            }
            if (res.includes(item[id])) return res;

            res.push(item[id]);
            return res;
          }, [])

          .reduce((obj, item) => {
            return {
              ...obj,
              [item]: false,
            };
          }, {});

        if (this.dataState && this.filter[id]) {
          return {
            ...paramInputValue[index],
            value: {
              ...paramInputValue[index].value,
              ...values,
              ...this.filter[id],
            },
          };
        } else {
          return {
            ...paramInputValue[index],
            value: {
              ...paramInputValue[index].value,
              ...values,
            },
          };
        }
      });
      return paramList;
    }
  }
}

export default AppController;
