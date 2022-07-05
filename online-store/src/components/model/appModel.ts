export interface IStateData {

}

const defaultData: IStateData = {
}

export class AppModel {
  private _data: IStateData;
  get data(){
    return this._data;
  }

  set data(value:IStateData){
    this._data = value;
    this.onChange(this._data);
  }

  constructor() {
    let data: IStateData;
      try {
        data = AppModel.load();
      } catch(e){
        data = defaultData;
      }
    this._data = data;
  }

  public onChange(data: IStateData) {

  };

  static load(){
    const loaded = localStorage.getItem('savedState');
    return JSON.parse(loaded);
  }

  public save(){
    localStorage.setItem('savedState', JSON.stringify(this.data));
  }
}