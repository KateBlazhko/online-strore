import Control from "../common/control";
import { Card } from "./card";
import { IDataItem } from "../model/appModel";

enum InnerText {
  title = "Our goods for you",
  noFoundText = "Sorry, nothing found..."
}

class Goods extends Control {
  private dataList: Card[];
  private cardWrap: Control;
  private noFoundText: Control;
  private cart: string[];
  private onCartUp: (id: string, count: number) => boolean;
  private onCartDown: (id: string) => void;

  constructor(
    parent: HTMLElement | null,
    className: string,
    cart: string[],
    onCartUp: (id: string, count: number) => boolean,
    onCartDown: (id: string) => void
  ) {
    super(parent, "div", className);

    this.cart = cart;
    this.onCartUp = onCartUp;
    this.onCartDown = onCartDown;

    new Control(this.node, "h2", "title title_goods", InnerText.title);

    this.noFoundText = new Control(
      null,
      "p",
      "goods__text",
      InnerText.noFoundText
    );

    this.cardWrap = new Control(this.node, "div", "goods__card-wrapper");
    this.dataList = [];
  }

  public update(data: readonly IDataItem[], cart: string[]) {
    this.cart = cart;

    if (this.dataList.length > 0)
      this.dataList.map((dataItem) => dataItem.destroy());

    if (data && data.length > 0) {
      this.noFoundText.destroy();
      this.draw(data);

    } else {
      this.node.appendChild(this.noFoundText.node)
    }
  }
  
  private draw(data: readonly IDataItem[]) {
    this.dataList = data.map((dataItem) => {
      const isInCart = this.cart.includes(dataItem.id);
      return new Card(
        this.cardWrap.node,
        "card",
        dataItem,
        isInCart,
        this.onCartUp,
        this.onCartDown
      );
    });
  }
}

export default Goods;
