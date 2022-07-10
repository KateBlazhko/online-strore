import Loader from './loader';
import AppState from '../model/appState';
import { IDataState, Value, Filter } from '../model/appState';
import { IDataItem } from '../model/appModel';
import { IParamInputRange, paramInputRange } from '../view/optionsInputRange'
import AppModel from '../model/appModel'

type Callback<Data> = (data: Data) => void;

class AppController extends Loader {
  private state: AppState;
  private filter: Filter;
  private model: AppModel;
  private _dataState: IDataState

  get dataState(){
    return this._dataState;
  }

  set dataState(value: IDataState){
    this._dataState = value;

    this.model.filterData(this._dataState)
  }

  constructor(state: AppState, model: AppModel) {
    super('assets/json/data.json')
    this.state = state
    this.model = model

    const onChange = (dataState: IDataState) => {
      this.dataState = dataState
      this.filter = this.state.dataState.filter
    }

    this.state.onChange.add(onChange)

    onChange(this.state.dataState)
  }

  public getData(callback: Callback<IDataItem[]>): void {
    super.load<IDataItem[]>(callback);
  }

  public getParamInputRange() {
    const paramList: IParamInputRange[] = paramInputRange.slice().map((input, index) => {
      const id = input.id
      const arrValue = this.model.data.map(item => {
        return isNaN(parseInt(item[id])) ? 0 : parseInt(item[id])
      })
      const min = Math.min(...arrValue).toString();
      const max = Math.max(...arrValue).toString();

      if (this.dataState && this.filter[id]) {
        return {
          ...paramInputRange[index],
          value: { 
            ...paramInputRange[index].value,
            ...this.filter[id]
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

  public onInputRangeChange(idValue: keyof IDataItem, value: string, isLeft: boolean) {
    const nameValue = isLeft ? 'left' : 'right'
    
    const newFilter: Filter =  this.filter[idValue] ? 
      {
        [idValue]: {
           ...this.filter[idValue],
           [nameValue]: value
        }
      } :
      {
        [idValue]: {
           [nameValue]: value
        }
      } 

      this.state.dataState = {
        ...this.state.dataState,

        filter: {
          ...this.filter, 
          ...newFilter
        },
      } 
  }

  public onInputRangeReset(idValue: keyof IDataItem, isLeft: boolean) {
    const nameValue = isLeft ? 'left' : 'right'

    const item  = this.filter[idValue]

    if (item && !Array.isArray(item)) {
      delete item[nameValue]
    }

    if (Object.keys(item).length == 0) {
     delete this.filter[idValue]
    }
  }
}

export default AppController