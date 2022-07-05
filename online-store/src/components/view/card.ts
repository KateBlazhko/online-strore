import Control from '../common/control';
import * as func from '../common/function';

import Popup from './popup';
// import DataItem from '../controller/dataItem';
import { IDataItem } from '../controller/appController'


export class Card extends Control {
  public cardNumber: number
  public name: Control

  // private data: IDataItem

    constructor(parent: HTMLElement | null, className: string, cardNumber: number, data: IDataItem) {
      super(parent, 'div', className);
      this.cardNumber = cardNumber;
      // this.data = data
      // const img = new Image(this.node, 'card-img', `assets/img/${this.cardNumber}.png`, `pets-img`);
      this.name = new Control(this.node, 'div','card-name', cardNumber.toString());
      const button = new Control(this.node, 'div', 'card-button', 'Положить в корзину');

      this.name.node.onclick = () => {
       document.body.style.overflow = 'hidden';          
          const popup = new Popup (document.documentElement, 'popup', data)
        	popup.onClose = ()=>{
          	popup.node.remove();
            document.body.style.overflow = 'visible';
          }
      }

      button.node.onclick = () => {
        console.log('hhh')
      }
    }

    getCardNumber() {
      return this.cardNumber
    }
}
