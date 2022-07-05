import Loader from './loader'

type Callback<Data> = (data: Data) => void;

export interface IDataItem {
  name: string
}

class AppController extends Loader{
  constructor() {
    super('assets/json/data.json')
  }

  public getData(callback: Callback<IDataItem[]>): void {
    super.getResp<IDataItem[]>(callback);
}
}

export default AppController