import Control from "../common/control";
import { Card } from "./card";
import { IDataItem } from '../model/appModel';

class Goods extends Control {
  private dataList: Card[];
  private cardWrap: Control;
  private text: Control;

  constructor(parent: HTMLElement | null, className: string) {
    super(parent, 'div', className)
    const title = new Control(this.node, 'h2', 'title', 'Товары')

    this.text = new Control(this.node, 'h2', 'goods__text', 'Ничего не найдено')
    this.cardWrap = new Control(this.node, 'div', 'goods__card-wrapper')
    this.dataList = []
  }

  public update(data: IDataItem[] | null) {
    if (this.dataList.length > 0) this.dataList.map((dataItem) => dataItem.destroy());

    if (data && data.length > 0) {
      this.text && this.text.destroy();
      this.text = null;

      this.draw(data)
    } else {

      if (!this.text) this.text = new Control(this.node, 'h2', 'goods__text', 'Ничего не найдено')
    }
  }

  private draw(data: IDataItem[]) {
    data.map((dataItem, index) => this.dataList.push(new Card(this.cardWrap.node, 'card', index, dataItem)))
  }

}

export default Goods