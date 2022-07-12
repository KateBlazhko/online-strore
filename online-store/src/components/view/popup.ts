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

    // this.name = new Control(container.node, "h3", "title", data.model);

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
