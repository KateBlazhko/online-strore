import Control from '../common/control';
import * as func from '../common/function';

import Popup from './popup';
import { IDataItem } from '../model/appModel';


export class Card extends Control {
  public cardNumber: number
  // public model: Control

  private data: IDataItem

    constructor(parent: HTMLElement | null, className: string, cardNumber: number, data: IDataItem) {
      super(parent, 'div', className);
      this.cardNumber = cardNumber;
      this.data = data

      const img = new Control(this.node, 'div', 'card__img');
      img.node.style.backgroundImage= `url(./assets/img/${this.data.image})`;

      const model = new Control(this.node, 'div','card__name', this.data.model);
      const button = new Control(this.node, 'div', 'card__button', 'Положить в корзину');
    
      img.node.onclick = () => {
       document.body.style.overflow = 'hidden';   
       document.body.style.marginRight = `${this.getScrollWidth()}px`       
          const popup = new Popup (document.documentElement, 'popup', data)
        	popup.onClose = ()=>{
          	popup.node.remove();
            document.body.style.overflow = 'visible';
            document.body.style.marginRight = `0px`
          }
      }

      button.node.onclick = () => {
        console.log('hhh')
      }
    }

    private getScrollWidth() {
      const scroll = new Control(document.body, 'div', 'scroll');
      const scrollWidth = scroll.node.offsetWidth - scroll.node.clientWidth;
      scroll.destroy()
      return scrollWidth
    }
}
