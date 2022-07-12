import Control from "../common/control";
import * as func from "../common/function";
import { IDataItem } from "../model/appModel";

class Popup extends Control {
  private name: Control;
  public onClose: () => void;

  constructor(parent: HTMLElement | null, className: string, data: IDataItem) {
    super(parent, className);
    this.onClose = () => {};

    const overlay = new Control(this.node, "div", "popup__overlay");
    const wrapper = new Control(overlay.node, "div", "popup__wrapper");
    const closeButton = new Control(wrapper.node, "div", "popup__close-button");
    const container = new Control(wrapper.node, "div", "popup__container");

    // const popupImg = new Control (container.node, 'div', 'popup-img');
    // 		popupImg.node.style.backgroundImage = `url(${pet.img}`;

    const popupData = new Control(container.node, "div", "popup__data");

    this.name = new Control(popupData.node, "h3", "title", data.model);
    const subname = new Control(popupData.node, "h4", "subtitle");

    // this.type = new Control (subname.node, 'span', 'text', pet.type);
    // const spacer = new Control (subname.node, 'span', 'text', ' - ');
    // this.breed = new Control (subname.node, 'span', 'text', pet.breed);

    // this.description = new Control (popupData.node, 'p', 'pets-description', pet.description);

    // const list = new Control (popupData.node, 'ul', 'popup-list');
    // this.age = new Control (list.node, 'li', 'list-item', `Age: <span>${pet.age}<span>`);
    // this.inoculations = new Control (list.node, 'li', 'list-item',
    //                                     `Inoculations: <span>${pet.inoculations.join(', ')}</span>`);

    // this.diseases = new Control (list.node, 'li', 'list-item',
    //                                 `Diseases: <span>${pet.diseases.join(', ')}</span>`);

    // this.parasites = new Control (list.node, 'li', 'list-item',
    //                                  `Parasites: <span>${pet.parasites.join(', ')}</span>`);

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
