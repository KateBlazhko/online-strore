import Loader from './loader';
import AppState from '../app/appState';
import { IDataState } from '../app/appState';
import { IDataItem } from '../model/appModel';
import { paramInputRange } from '../app/optionsInputRange'

type Callback<Data> = (data: Data) => void;

class AppController extends Loader {
  state: AppState

  constructor(state: AppState) {
    super('assets/json/data.json')
    this.state = state
  }

  public getData(callback: Callback<IDataItem[]>): void {
    super.getResp<IDataItem[]>(callback);
  }

  public onInputRangeChange(idValue: keyof IDataItem, value: string, isLeft: boolean) {
    const nameValue = isLeft ? 'left' : 'right'
    
    const newSource: IDataState =  this.state.dataState[idValue] ? 
      {
        [idValue]: {
           ...this.state.dataState[idValue],
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
        ...newSource,
      } 
  }

  public onInputRangeReset(idValue: keyof IDataItem, isLeft: boolean) {
    const nameValue = isLeft ? 'left' : 'right'

    const item  = this.state.dataState[idValue]

    if (item && !Array.isArray(item)) {
      delete item[nameValue]
    }

    if (Object.keys(item).length == 0) {
     delete this.state.dataState[idValue]
    }
  }
}

export default AppController