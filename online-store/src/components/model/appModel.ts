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
          return this.filter(res, param as keyof IDataItem, filter[param])
        }, this.data)
  
        this.sortData(filterData, dataState)
        
      } else {
        this.sortData(this.data, dataState)
      }
      
    } 
  }

  private filter(arr: IDataItem[], param : keyof IDataItem, value: Value) {
    const pItem = arr.filter(item => {

      if (('left' in value) || ('right' in value)) {

        if (value.left && value.right) return +item[param] >= +value.left && +item[param] <= +value.right
        if (value.left) return  +item[param] >= +value.left
        if (value.right) return +item[param] <= +value.right

      } else {

        for (const key in value) {

          if (item[param] === value[key]) return true
          if (item[param] === key) return true
        }
        return false
      }
    }) 

   return pItem
  }

  private sortData (data: IDataItem[], dataState: IDataState) {
    const sorter = dataState.sorter

    if (Object.keys(sorter).length > 0) {

      const key = Object.getOwnPropertyNames(sorter)[0]

      const id = key.replace(/([\w\s-]*)\.(\w*)\.(\w*)/, '$2') as keyof IDataItem
      const isUp = key.replace(/([\w\s-]*)\.(\w*)\.(\w*)/, '$3') === 'up' ? true : false
 
      if (isUp) {
        const sortData = data.sort((a, b) => {
          if (a[id] > b[id]) return 1; 
          if (a[id] == b[id]) return 0; 
          if (a[id] < b[id]) return -1; 
        })
        
        this.renderData(sortData)

      } else {
      
        const sortData = data.sort((a, b) => {
          if (a[id] < b[id]) return 1; 
          if (a[id] == b[id]) return 0; 
          if (a[id] > b[id]) return -1; 
        })

        this.renderData(sortData)
      }
    }

    this.renderData(data)
  }

}

export default AppModel