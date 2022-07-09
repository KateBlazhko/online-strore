import AppState from '../app/appState'
import { IDataState } from '../app/appState'
import { IParamInputRange, paramInputRange } from '../app/optionsInputRange'

type Value = {
  left?: string, 
  right?: string
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
    }

    this.state.onChange.add(onChange)

    onChange(this.state.dataState)
  }

  public build(){
    this.filterData(this.dataState);
  }

  private filterData(dataState: IDataState) {
    if (this.data) {

      if (dataState) {

        console.log(dataState)
        const filters: string[] = Object.keys(dataState)

        const filterData = filters.reduce((res: IDataItem[], param) => {

          return this.sorter(res, param as keyof IDataItem, dataState[param])
        }, this.data)
  
        this.renderData(filterData)
        
      } else {
        this.renderData(this.data)
      }
      
    } 
  }

  private sorter(arr: IDataItem[], param : keyof IDataItem, value: string[] | Value) {
    const pItem = arr.filter(item => {

      if (Array.isArray(value)) {
        return value.length === 0 || value.includes(item[param])

      } else {
        if (value.left && value.right) return +item[param] >= +value.left && +item[param] <= +value.right

        if (value.left) return  +item[param] >= +value.left

        if (value.right) return +item[param] <= +value.right
      }
    })
    
   return pItem
  }

  public getParamInputRange() {
    const paramList: IParamInputRange[] = paramInputRange.slice().map((input, index) => {
      const id = input.id
      const arrValue = this.data.map(item => {
        return isNaN(parseInt(item[id])) ? 0 : parseInt(item[id])
      })
      const min = Math.min(...arrValue).toString();
      const max = Math.max(...arrValue).toString();

      if (this.dataState && this.dataState[id]) {
        return {
          ...paramInputRange[index],
          value: { 
            ...paramInputRange[index].value,
            ...this.dataState[id]
          },
          max: max,
          min: min,
        }
      } else {
        return {
          ...paramInputRange[index],
          max: max,
          min: min,
        }
      }
    })
    return paramList

  }

}

export default AppModel