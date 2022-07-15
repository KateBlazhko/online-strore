import Control from "../common/control";

class Advert extends Control {
  constructor(parent: HTMLElement | null, className: string) {
    super(parent, "div", className);

    const advertInner = new Control(this.node, "div", "advert__inner");
    advertInner.node.innerHTML = `
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    <div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div><div>HOT SALE!</div>
    `;
  }
}

export default Advert;
