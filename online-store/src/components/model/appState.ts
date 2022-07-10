import Signal from '../common/signal'

export type Value = string[] | {left?: string, right?: string}

export type Filter = { 
  [key: string]: Value
}

export interface IDataState {
  sorter: {
    [key: string]: boolean
  },
  filter: Filter
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
        // dataState = { sorter: {}, filter: {} }
      } catch(e){
        dataState = {
          sorter: {},
          filter: {}
        }
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