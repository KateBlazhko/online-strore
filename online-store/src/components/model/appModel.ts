import AppState from './appState'
import { IDataState, Filter, Value } from './appState'

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
  public renderData: (data: IDataItem[]) => void;

  get data(){
    return this._data;
  }

  set data(value:IDataItem[]){
    this._data = value;
  }

  constructor() {
    this._data = null
  }


  public filterData(dataState: IDataState) {
    const filter: Filter = dataState.filter
    
    if (this.data) {

      if (dataState) {
        const filters: string[] = Object.keys(filter)

        const filterData = filters.reduce((res: IDataItem[], param) => {

          return this.sorter(res, param as keyof IDataItem, filter[param])
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

}

export default AppModel