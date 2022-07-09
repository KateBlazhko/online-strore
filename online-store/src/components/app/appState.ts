import Signal from '../common/signal'

type Value = string[] | {left?: string, right?: string}

export interface IDataState {
  [key: string]: Value
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
        // dataState = {};
      } catch(e){
        dataState = {}
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