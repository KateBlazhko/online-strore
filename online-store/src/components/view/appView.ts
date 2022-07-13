import Control from "../common/control";
import AppModel from "../model/appModel";
import AppController from "../controller/appController";
import Sorter from "./sorter";
import FilterRange from "./filterRange";
import FilterValue from "./filterValue";
import Goods from "./goods";
import Search from "./search";
import Header from "./header";
import Notification from "./notification";
import { IDataItem } from "../model/appModel";

class AppView {
  private header: Header;
  private main: Control;
  private footer: Control;

  private controller: AppController;
  private settingsInner: Control;
  private filtersList: Control[];
  private sortersList: Control[];
  private search: Search;
  private goods: Goods;

  constructor(model: AppModel, controller: AppController) {
    this.controller = controller;
    const [cardsInCart, countInCart] = this.controller.getParamCart();

    this.header = new Header(document.body, "header", countInCart);
    this.main = new Control(document.body, "main", "app");
    this.footer = new Control(document.body, "footer", "footer");

    const container = new Control(this.main.node, "div", "container");
    const settings = new Control(container.node, "div", "settings");
    this.goods = new Goods(
      container.node,
      "goods",
      cardsInCart,
      this.onCartUp,
      this.onCartDown
    );

    this.search = new Search(settings.node, "search", (value: string) => {
      model.search(value);
    });

    this.settingsInner = new Control(settings.node, "div", "settings__inner");

    this.sortersList = this.drawSorters();
    this.filtersList = this.drawFilters();

    const buttonResetFilters = new Control(
      settings.node,
      "div",
      "button button_reset",
      "Reset filters"
    );
    buttonResetFilters.node.onclick = () => {
      this.filtersList.map((filter) => filter.destroy());
      this.controller.onReset();
      this.filtersList = this.drawFilters();
    };

    const buttonResetSettings = new Control(
      settings.node,
      "div",
      "button button_reset",
      "Reset settings"
    );
    buttonResetSettings.node.onclick = () => {
      this.filtersList.map((filter) => filter.destroy());
      this.sortersList.map((sorter) => sorter.destroy());
      this.goods.destroy();

      this.goods = new Goods(
        container.node,
        "goods",
        cardsInCart,
        this.onCartUp,
        this.onCartDown
      );
      this.controller.onResetAll();
      this.sortersList = this.drawSorters();
      this.filtersList = this.drawFilters();
    };

    model.renderData = (data: readonly IDataItem[]) => {
      this.drawGoods(data);
    };
  }

  private drawSorters() {
    const paramSorter = this.controller.getParamSorter()

    if (paramSorter !== undefined)
      return [
        new Sorter(
          this.settingsInner.node,
          "sorter",
          paramSorter,

          (id: string) => {
            this.controller.onSorterChange(id);
          }
        ),
      ];
    return []
  }

  private drawFilters() {
    const paramInputRange = this.controller.getParamInputRange();
    const paramInputValue = this.controller.getParamInputValue()

    if (paramInputRange !== undefined && paramInputValue !== undefined) 
      return [
        new FilterRange(
          this.settingsInner.node,
          "settings__filter",
          paramInputRange,

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
          paramInputValue,

          (id: string, value: string | boolean, nameValue: string) => {
            this.controller.onFilterChange(id, value, nameValue);
          },

          (id: string, nameValue: string) => {
            this.controller.onFilterReset(id, nameValue);
          }
        ),
      ];

      return []
  }

  public drawGoods(data: readonly IDataItem[]) {
    const [cardsInCart] = this.controller.getParamCart();

    this.goods.update(data, cardsInCart);
  }

  private onCartUp = (id: string, count: number) => {
    const isAdd = this.controller.addInCart(id, count);

    if (isAdd === true) {
      this.header.update();
      return true;
    }

    const notification = new Notification(
      this.header.node,
      "notification",
      isAdd
    );
    notification.onClose = () => {
      notification.node.remove();
    };

    return false;
  };

  private onCartDown = (id: string) => {
    const count = this.controller.removeFromCart(id);
    this.header.update(count);
  };
}

export default AppView;
