import AppController from '../controller/appController'
import { AppModel } from '../model/appModel'
import AppView from '../view/appView'

class App {
  private controller: AppController;
  private model: AppModel;
  private view: AppView;

  constructor(){
    this.model = new AppModel()
    this.controller = new AppController()
    this.view = new AppView()
  }

  public start() {
    this.controller.getData(data => this.view.drawGoods(data))
  }
}

export default App