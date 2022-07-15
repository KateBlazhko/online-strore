import Control from "../common/control";

import Popup from "./popup";
import { IDataItem } from "../model/appModel";

export class Card extends Control {
  private content: string

  constructor(
    parent: HTMLElement | null,
    className: string,
    data: IDataItem,
    isInCart: boolean,
    onCartUp: (id: string, count: number) => boolean,
    onCartDown: (id: string) => void
  ) {
    super(parent, "div", className);

    const cardNumber = data.id;
    const count = +data.quantity;

    const img = new Control(this.node, "div", "card__img");
    img.node.style.backgroundImage = `url(./assets/img/${data.image})`;

    this.content = new Control(this.node, "div", "card__inner").node.innerHTML = `
    <div class="card__content">Model: <span>${data.model}</span></div>
    <div class="card__content">Chipmaker: <span>${data.chipmaker}</span></div>
    <div class="card__content">Year: <span>${data.release}</span></div>
    <div class="card__content">Count: <span>${count.toString()}</span></div>
    <div class="card__content card__content_price">${data.price}BYN</div>`

    const buttonDetails = new Control(
      this.node,
      "div",
      "button button_details",
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
      "button button_add",
      "Add to cart"
    );

    new Control(buttonAddCart.node,"div","logo logo_card");

    const buttonRemoveCart = new Control(
      this.node,
      "div",
      "button button_remove"
    );

    if (isInCart) {
      this.node.classList.add("cart");
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
        this.node.classList.add("in-cart");
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
