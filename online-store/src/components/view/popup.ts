import Control from "../common/control";
import * as func from "../common/function";
import { IDataItem } from "../model/appModel";

class Popup extends Control {
  // private name: Control;
  public onClose: () => void;

  constructor(parent: HTMLElement | null, className: string, data: IDataItem) {
    super(parent, className);
    this.onClose = () => {};

    const overlay = new Control(this.node, "div", "popup__overlay");
    const wrapper = new Control(overlay.node, "div", "popup__wrapper");
    const closeButton = new Control(wrapper.node, "div", "popup__close-button");
    const container = new Control(wrapper.node, "div", "popup__container");

    const popupImg = new Control (container.node, 'div', 'popup__img');
    		popupImg.node.style.backgroundImage = `url(./assets/img/${data.image})`;

    const popupData = new Control(container.node, "ul", "popup__list");
    popupData.node.innerHTML = `
    ${data.model}
    <li class="popup__item">Chipmaker: <span>${data.chipmaker}</span></li>
    <li class="popup__item">Vendor: <span>${data.vendor}</span></li>
    <li class="popup__item">Gpu: <span>${data.gpu}</span></li>
    <li class="popup__item">Memory: <span>${data.memory}</span></li>
    <li class="popup__item">Year: <span>${data.release}</span></li>
    <li class="popup__item">Other: <span>${data.other}</span></li>
    <li class="popup__item">Count: <span>${data.quantity.toString()}</span></li>
    <li class="popup__item">Popular: <span>${data.popular}</span></li>
    <li class="popup__item">Price: <span>${data.price}BYN</span></li>`

    closeButton.node.onclick = () => {
      this.onClose();
    };

    overlay.node.onclick = () => {
      this.onClose();
    };

    overlay.node.onmouseover = () => {
      func.toggleClassName("hover", closeButton.node);
    };

    overlay.node.onmouseout = () => {
      func.toggleClassName("hover", closeButton.node);
    };

    container.node.onclick = (event) => event.stopPropagation();

    container.node.onmouseover = (event) => event.stopPropagation();

    container.node.onmouseout = (event) => event.stopPropagation();
  }
}

export default Popup;
