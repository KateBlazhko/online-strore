import Loader from "./loader";
import AppState from "../model/appState";
import { IDataState, Filter, Sorter } from "../model/appState";
import { IDataItem } from "../model/appModel";
import { IParamInputRange } from "../view/options/optionsInputRange";
import { paramInputRange } from "../view/options/optionsInputRange";
import { IParamInputValue } from "../view/options/optionsInputValue";
import { paramInputValue } from "../view/options/optionsInputValue";
import { paramSorter } from "../view/options/optionsSorter";
import { Value } from "../model/appState";

import AppModel from "../model/appModel";

type Callback<Data> = (data: Data) => void;

class AppController extends Loader {
  private state: AppState;
  private filter: Filter;
  private sorter: Sorter;
  private model: AppModel;
  private _dataState: IDataState;

  get dataState() {
    return this._dataState;
  }

  set dataState(value: IDataState) {
    this._dataState = value;
    this.model.filterData(this._dataState);
    // this.getParamSorter();
    // this.getParamInputRange();
    // this.getParamInputValue();
  }

  constructor(state: AppState, model: AppModel) {
    super("assets/json/data.json");
    this.state = state;
    this._dataState = this.state.dataState;
    this.filter = this.state.dataState.filter;
    this.sorter = this.state.dataState.sorter;
    this.model = model;

    const onChange = (dataState: IDataState) => {
      this.dataState = dataState;
      this.filter = this.state.dataState.filter;
      this.sorter = this.state.dataState.sorter;
    };

    this.state.onChange.add(onChange);
  }

  public getData(callback: Callback<IDataItem[]>): void {
    super.load<IDataItem[]>(callback);
  }

  public onReset() {
    this.state.dataState = { 
      ...this.state.dataState,
      filter: {} };
  }

  public onResetAll() {
    this.state.dataState = { 
      sorter: {},
      filter: {} };
  }

  public getParamSorter() {
    if (this.dataState && Object.keys(this.sorter).length > 0) {
      const key = Object.getOwnPropertyNames(this.sorter)[0];

      return {
        ...paramSorter,
        [key]: true,
      };
    } 
    console.log(paramSorter)
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
    const paramList: IParamInputValue[] = paramInputValue
      .slice()
      .map((input, index) => {
        const id = input.id;

        const values: Value = this.model.data
          .reduce((res: string[], item) => {
            if (typeof item[id] === "boolean") {
              if (res.includes("")) return res;

              res.push("");

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

export default AppController;
