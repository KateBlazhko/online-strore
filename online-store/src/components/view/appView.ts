import Control from "../common/control";
import AppModel from "../model/appModel";
import AppController from "../controller/appController";
import Sorter from "./sorter";
import FilterRange from "./filterRange";
import FilterValue from "./filterValue";
import Goods from "./goods";
import Search from "./search";
import Header from "./header";
import { IDataItem } from "../model/appModel";

class AppView {
  private header: Control;
  private main: Control;
  private footer: Control;

  private controller: AppController;
  private settingsInner: Control;
  private filtersList: Control[];
  private sortersList: Control[];
  private search: Search;
  private goods: Goods;

  constructor(model: AppModel, controller: AppController) {
    this.header = new Header(document.body, "header");
    this.main = new Control(document.body, "main", "app");
    this.footer = new Control(document.body, "footer", "footer");

    this.controller = controller;

    const container = new Control(this.main.node, "div", "container");
    const settings = new Control(container.node, "div", "settings");
    this.goods = new Goods(container.node, "goods");

    this.search = new Search(settings.node, "search");

    this.settingsInner = new Control(settings.node, "div", "settings__inner");

    this.sortersList = this.drawSorters();
    this.filtersList = this.drawFilters();

    const buttonResetFilters = new Control(settings.node, "div", "button", "Reset filters");

    buttonResetFilters.node.onclick = () => {
      this.filtersList.map((filter) => filter.destroy());

      this.controller.onReset();

      this.filtersList = this.drawFilters();
    };

    const buttonResetSettings = new Control(settings.node, "div", "button", "Reset settings");

    buttonResetSettings.node.onclick = () => {
      this.filtersList.map((filter) => filter.destroy());
      this.sortersList.map((sorter) => sorter.destroy());
      
      this.goods.destroy()
      this.goods = new Goods(container.node, "goods");

      this.controller.onResetAll();

      this.sortersList = this.drawSorters();
      this.filtersList = this.drawFilters();
    };

    model.renderData = (data: readonly IDataItem[]) => {
      console.log(data)
      this.drawGoods(data);
    };
  }

  private drawSorters() {
    return [
      new Sorter(
        this.settingsInner.node,
        "sorter",
        this.controller.getParamSorter(),

        (id: string) => {
          this.controller.onSorterChange(id);
        }
      ),
    ];
  }

  private drawFilters() {
    return [
      new Control(this.settingsInner.node, "h2", "title", "Filter by"),

      new FilterRange(
        this.settingsInner.node,
        "settings__filter",
        this.controller.getParamInputRange(),

        (id: string, value: string, isLeft: boolean) => {
          const nameValue = isLeft ? "left" : "right";
          this.controller.onFilterChange(id, value, nameValue);
        },

        (id: string, isLeft: boolean) => {
          const nameValue = isLeft ? "left" : "right";
          this.controller.onFilterReset(id, nameValue);
        }
      ),

      new FilterValue(
        this.settingsInner.node,
        "settings__filter",
        this.controller.getParamInputValue(),

        (id: string, value: string | boolean, nameValue: string) => {
          this.controller.onFilterChange(id, value, nameValue);
        },

        (id: string, nameValue: string) => {
          this.controller.onFilterReset(id, nameValue);
        }
      ),
    ];
  }

  public drawGoods(data: readonly IDataItem[]) {
    this.goods.update(data);
  }
}

export default AppView;
