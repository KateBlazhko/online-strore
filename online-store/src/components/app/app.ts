import AppController from '../controller/appController'
import AppModel from '../model/appModel'
import AppView from '../view/appView'
import AppState from './appState';

class App {
  private controller: AppController;
  private model: AppModel;
  private view: AppView;

  constructor(state: AppState){
    this.model = new AppModel(state)
    this.controller = new AppController(state)
    // this.view = new AppView(this.model, this.controller)
  }

  public start() {
    this.controller.getData(data => {
      this.model.data = data
      // const paramList = this.model.getParamInputRange()
      this.view = new AppView(this.model, this.controller)
      this.model.build()
    })
  }
}

export default App