import AppController from "../controller/appController";
import AppModel, { IDataItem } from "../model/appModel";
import IOptions from "../controller/IOptions"
import AppView from "../view/appView";
import AppState from "../model/appState";

class App {
  private controller: AppController;
  private model: AppModel;
  private state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.model = new AppModel();
    this.controller = new AppController(this.state, this.model);
  }

  public start() {
    this.controller.getData<IOptions>("assets/json/options.json", (data) => {
      this.controller.options = data;
    });

    this.controller.getData<IDataItem[]>("assets/json/data.json", (data) => {
      this.model.data = data;
      const view = new AppView(this.model, this.controller);
      this.model.filterData(this.state.dataState);
    });
  }
}

export default App;
