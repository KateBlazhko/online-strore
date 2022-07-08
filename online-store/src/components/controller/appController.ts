import Loader from './loader';
import AppState from '../app/appState';
import { IDataState } from '../app/appState';
import { IDataItem } from '../model/appModel';
import { IDataInputRange } from '../app/optionsInputRange';


type Callback<Data> = (data: Data) => void;

class AppController extends Loader{
  state: AppState

  constructor(state: AppState) {
    super('assets/json/data.json')
    this.state = state
  }

  public getData(callback: Callback<IDataItem[]>): void {
    super.getResp<IDataItem[]>(callback);
  }

  public onInputRangeChange(idValue: keyof IDataItem, value: string, isLeft: boolean) {

    const optionsInputRange = this.state.dataState.optionsInputRange
    const newSource = optionsInputRange.map(input => {

      if (input.id === idValue) {
        if (isLeft) input.value.left = value
        else input.value.right = value
      }

      return input
    })

    this.state.dataState = {
      ...this.state.dataState,
      optionsInputRange: newSource,
    }
  }
}

export default AppController