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
import * as func from "../common/function";

class AppView {
  private header: Header;
  private main: Control;
  private footer: Control;

  private model: AppModel;
  private controller: AppController;
  private settingsInner: Control;
  private filtersList: Control[];
  private sortersList: Control[];
  private search: Search;
  private goods: Goods;

  constructor(model: AppModel, controller: AppController) {
    this.model = model;
    this.controller = controller;
    const [cardsInCart, countInCart] = this.controller.getParamCart();

    this.header = new Header(document.body, "header", countInCart);
    this.main = new Control(document.body, "main", "app");
    this.footer = new Control(document.body, "footer", "footer");
    this.footer.node.innerHTML = AppView.drawFooter();

    const container = new Control(this.main.node, "div", "container");
    const settings = new Control(container.node, "div", "settings");
    const settingsWrapper = new Control(
      settings.node,
      "div",
      "settings__wrapper"
    );
    const marker = new Control(
      settings.node,
      "div",
      "settings__marker",
      "Settings"
    );
    marker.node.onclick = () => {
      func.toggleClassName("open", settings.node, document.body);
    };

    this.goods = new Goods(
      container.node,
      "goods",
      cardsInCart,
      this.onCartUp,
      this.onCartDown
    );

    const searchValue = this.controller.getSearchValue();
    const onInput = (value: string) => {
      this.controller.onSearchChange(value);
    };
    this.search = new Search(
      settingsWrapper.node,
      "search",
      searchValue,
      onInput
    );

    this.settingsInner = new Control(
      settingsWrapper.node,
      "div",
      "settings__inner"
    );

    this.sortersList = this.drawSorters();
    this.filtersList = this.drawFilters();

    const buttonResetFilters = new Control(
      settingsWrapper.node,
      "div",
      "button button_reset",
      "Reset filters"
    );
    buttonResetFilters.node.onclick = () => {
      this.filtersList.map((filter) => filter.destroy());
      this.controller.onReset();
      const searchValue = this.controller.getSearchValue();

      this.search.update(searchValue);
      this.filtersList = this.drawFilters();
    };

    const buttonResetSettings = new Control(
      settingsWrapper.node,
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
        [],
        this.onCartUp,
        this.onCartDown
      );

      this.controller.onResetAll();
      const countInCart = this.controller.getParamCart()[1];
      const searchValue = this.controller.getSearchValue();

      this.header.update(countInCart);
      this.search.update(searchValue);
      this.sortersList = this.drawSorters();
      this.filtersList = this.drawFilters();
    };
  }

  public init() {
    this.model.renderData = (data: readonly IDataItem[]) => {
      this.drawGoods(data);
    };
  }

  private drawSorters() {
    const paramSorter = this.controller.getParamSorter();

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
    return [];
  }

  private drawFilters() {
    const paramInputRange = this.controller.getParamInputRange();
    const paramInputValue = this.controller.getParamInputValue();

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

    return [];
  }

  public drawGoods(data: readonly IDataItem[]) {
    const [cardsInCart] = this.controller.getParamCart();
    this.goods.update(data, cardsInCart);
  }

  private static drawFooter() {
    return `
    <a class="link" href="https://github.com/KateBlazhko">KateBlazhko</a>
    <span>2022</span>
    <p class="text">
      Training project
    </p>
    <div class="footer__rs">
      <a class="link rs" href="https://rs.school/js/">??JavaScript/Frontend??</a>
      <div class="rs__logo"></div>
    </div>
    `;
  }

  private onCartUp = (id: string, count: number) => {
    const isAdd = this.controller.addInCart(id, count);

    if (isAdd === true) {
      this.header.update();
      return true;
    }

    const notification = new Notification(document.body, "notification", isAdd);

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
