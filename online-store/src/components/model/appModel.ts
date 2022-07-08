import AppState from '../app/appState'
import { IDataState } from '../app/appState'
import { IDataInputRange, IParamInputRange, paramInputRange } from '../app/optionsInputRange';
import * as func from '../common/function'

type Value = {
  left: string, 
  right: string
}

type Parametrs = {
  [key: string]: string | Value
}

export interface IDataItem {
  image: string,
  vendor: string,
  model: string,
  chipmaker: string,
  memory: string,
  gpu: string,
  other: string,
  price: string,
  release: string,
  popular: string,
  quantity: string
}

class AppModel {
  private _data: IDataItem[];
  private state: AppState;
  private _dataState: IDataState;
  public optionsInputRange: IDataInputRange[];
  public renderData: (data: IDataItem[]) => void;

  get data(){
    return this._data;
  }

  set data(value:IDataItem[]){
    this._data = value;
  }

  get dataState(){
    return this._dataState;
  }

  set dataState(value:IDataState){
    this._dataState = value;

    this.filterData(this._dataState)
  }

  constructor(state: AppState) {
    this._data = null
    this.state = state

    const onChange = (dataState: IDataState) => {
      this.dataState = dataState
      this.optionsInputRange = this._dataState.optionsInputRange
    }

    this.state.onChange.add(onChange)

    onChange(this.state.dataState)
  }

  public build(){
    this.filterData(this.dataState);
  }

  private filterData(dataState: IDataState) {
    const filters: Parametrs[] = Object.values(dataState).flat()
    if (this.data) {

      const filterData = filters.reduce((res: IDataItem[], param) => {
        return this.sorter(res, param.id as keyof IDataItem, param.value)
      }, this.data)

      this.renderData(filterData)
    } 
  }

  private sorter(arr: IDataItem[], param : keyof IDataItem, value: string | Value) {
    const pItem = arr.filter(item => typeof value === 'string' ? 
      item[param]=== value : 
      +item[param] >= +value.left && +item[param] <= +value.right)
  
   return pItem
  }

  public getParamInputRange() {
    const paramList: IParamInputRange[] = this.optionsInputRange.map((input, index) => {
      const id = input.id
      const arrValue = this.data.map(item => {
        return isNaN(parseInt(item[id])) ? 0 : parseInt(item[id])
      })
      const min = Math.min(...arrValue).toString();
      const max = Math.max(...arrValue).toString();

      return {
        ...paramInputRange[index],
        max: max,
        min: min,
      }
    })

    this.checkOptionsInputRange(paramList)
    return paramList

  }

  private checkOptionsInputRange (paramList: IParamInputRange[]) {
    this.optionsInputRange = this.optionsInputRange.map((input, index) => {
      input.value.left = input.value.left === 'min' ? paramList[index].min : input.value.left
      input.value.right = input.value.right === 'max' ? paramList[index].max : input.value.right
      return input

    })
  }
}

export default AppModel