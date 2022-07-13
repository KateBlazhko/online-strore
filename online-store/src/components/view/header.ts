import Control from "../common/control";
import Advert from "./advert"

class Header extends Control {
  private cart: Control;

  constructor(
    parent: HTMLElement | null,
    className: string,
    countInCart: number
  ) {
    super(parent, "header", className);

    const container = new Control(this.node, "div", "container");

    const title = new Control(container.node, "h1", "title", "Online-store");
    const subTitle = new Control(container.node, "h2", "subtitle", "Graphic cards from gaming PC only!");

    this.cart = new Control(container.node, "div", "cart");
    this.cart.node.innerHTML = `
    <div class="cart__text"><div>${countInCart.toString()}</div></div>
    `
    const advert = new Advert(this.node, "advert");

  }

  public update(count?: number) {
    const countLast = this.cart.node.textContent
      ? +this.cart.node.textContent
      : 0;

    if (count == undefined)
      this.cart.node.innerHTML = `
      <div class="cart__text"><span>${(countLast + 1).toString()}</span></div>
      `
    else 
      this.cart.node.innerHTML = `
      <div class="cart__text"><span>${count.toString()}</span></div>
      `
  }
}

export default Header;
