import AppController from '../controller/appController'
import AppModel from '../model/appModel'
import AppView from '../view/appView'
import AppState from '../model/appState';

class App {
  private controller: AppController;
  private model: AppModel;
  private view: AppView;
  private state: AppState;

  constructor(state: AppState){
    this.state = state
    this.model = new AppModel()
    this.controller = new AppController(this.state, this.model)
  }

  public start() {
    this.controller.getData(data => {
      this.model.data = data
      this.view = new AppView(this.model, this.controller)
      this.model.filterData(this.state.dataState)
    })
  }
}

export default App