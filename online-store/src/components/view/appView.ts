import Control from "../common/control";
import AppModel from '../model/appModel';
import AppController from '../controller/appController';
import FilterRange from "./filterRange";
import FilterValue from "./filterValue";
import Goods from "./goods";
import Search from "./search";
import Header from "./header";
import { IDataItem } from '../model/appModel';

class AppView {
  private header: Control
  private main: Control
  private footer: Control

  private filterRange: FilterRange
  private filterValue: FilterValue
  private search: Search
  private goods: Goods

  constructor(model: AppModel, controller: AppController) {
    this.header = new Header(document.body, 'header');
    this.main = new Control(document.body, 'main', 'app')
    this.footer = new Control(document.body, 'footer', 'footer')

    const container = new Control(this.main.node, 'div', 'container')
    const settings = new Control(container.node, 'div', 'settings');

    this.search = new Search(settings.node, 'filter');

    model.renderData = (data: IDataItem[] | null) => {
      this.drawGoods(data)
    }

    this.filterRange = new FilterRange (
      settings.node,
      'filter',
      controller.getParamInputRange(),
      (id: keyof IDataItem, value: string, isLeft: boolean) => {
        controller.onInputRangeChange(id, value, isLeft)
      },
      (id: keyof IDataItem, isLeft: boolean) => {
        controller.onInputRangeReset(id, isLeft)
      }
    );
      
    this.filterValue = new FilterValue(settings.node, 'filter');
    this.goods = new Goods(container.node, 'goods');
  }

  public drawGoods(data: IDataItem[] | null) {
      this.goods.update(data)
  }
}

export default AppView