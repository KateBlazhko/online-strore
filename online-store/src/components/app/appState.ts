import { IDataInputRange, optionsInputRange } from './optionsInputRange'
import { IDataInputValue, optionsInputValue } from './optionsInputValue'

import Signal from '../common/signal'

export interface IDataState {
  optionsInputRange: IDataInputRange[],
  optionsInputValue: IDataInputValue[]

}

const defaultData: IDataState = {
  optionsInputRange: optionsInputRange,
  optionsInputValue: optionsInputValue
}

export class AppState {
  private _dataState: IDataState;

  get dataState(){
    return this._dataState;
  }

  set dataState(value:IDataState){
    this._dataState = value;
    this.onChange.emit(this._dataState);
  }

  constructor() {
    let dataState: IDataState;
      try {
        dataState = AppState.load();
        // dataState = defaultData;
      } catch(e){
        dataState = defaultData;
      }
    this._dataState = dataState;
  }

  public onChange = new Signal<IDataState>()

  static load(){
    const loaded = localStorage.getItem('savedState');

    if (loaded) {
      return JSON.parse(loaded)
    }

    throw new Error("Local Storage empty");
  
  }

  public save(){
    localStorage.setItem('savedState', JSON.stringify(this.dataState));
  }
}

export default AppState