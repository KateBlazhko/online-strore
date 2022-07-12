import Control from "../common/control";

class Header extends Control {
  private cart: Control;

  constructor(
    parent: HTMLElement | null,
    className: string,
    countInCart: number
  ) {
    super(parent, "header", className);

    const title = new Control(this.node, "h1", "title", "Online-store");

    this.cart = new Control(this.node, "div", "cart", countInCart.toString());
  }

  public update(count?: number) {
    const countLast = this.cart.node.textContent
      ? +this.cart.node.textContent
      : 0;

    if (count == undefined)
      this.cart.node.textContent = (countLast + 1).toString();
    else this.cart.node.textContent = count.toString();
  }
}

export default Header;
