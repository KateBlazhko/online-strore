import Control from "../common/control";

import Popup from "./popup";
import { IDataItem } from "../model/appModel";

export class Card extends Control {
  // public cardNumber: string;

  // private data: IDataItem;

  constructor(
    parent: HTMLElement | null,
    className: string,
    data: IDataItem,
    isInCart: boolean,
    onCartUp: (id: string, count: number) => boolean,
    onCartDown: (id: string) => void
  ) {
    super(parent, "div", className);

    // this.data = data;
    const cardNumber = data.id;
    const count = +data.quantity;

    const img = new Control(this.node, "div", "card__img");
    img.node.style.backgroundImage = `url(./assets/img/${data.image})`;

    const model = new Control(this.node, "div", "card__name", data.model);

    const buttonDetails = new Control(
      this.node,
      "div",
      "button",
      "View details"
    );

    buttonDetails.node.onclick = () => {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${Card.getScrollWidth()}px`;
      const popup = new Popup(document.documentElement, "popup", data);
      popup.onClose = () => {
        popup.node.remove();
        document.body.style.overflow = "visible";
        document.body.style.marginRight = `0px`;
      };
    };

    const buttonAddCart = new Control(
      this.node,
      "div",
      "button",
      "Add to cart"
    );
    const buttonRemoveCart = new Control(
      this.node,
      "div",
      "button button_remove",
      "Remove from cart"
    );

    if (isInCart) {
      this.node.classList.add('cart')
      buttonRemoveCart.node.style.opacity = "1";      
    }

    buttonRemoveCart.node.onclick = () => {
      onCartDown(cardNumber);
      buttonRemoveCart.node.style.opacity = "0";
      this.node.classList.remove("in-cart");
    };

    buttonAddCart.node.onclick = () => {
      const isAdd = onCartUp(cardNumber, count);

      if (isAdd) {
        buttonRemoveCart.node.style.opacity = "1";
        this.node.classList.add("in-cart")
      }
    };
  }

  private static getScrollWidth() {
    const scroll = new Control(document.body, "div", "scroll");
    const scrollWidth = scroll.node.offsetWidth - scroll.node.clientWidth;
    scroll.destroy();
    return scrollWidth;
  }
}
