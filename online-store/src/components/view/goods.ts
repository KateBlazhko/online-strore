import Control from "../common/control";
import { Card } from "./card";
import { IDataItem } from '../controller/appController'

class Goods extends Control {
  private dataList: Card[];
  private cardWrap: Control;

  constructor(parent: HTMLElement | null, className: string) {
    super(parent, 'div', className)
    const title = new Control(this.node, 'h2', 'title', 'Товары')
    this.cardWrap = new Control(this.node, 'div', 'goods__card-wrapper')
    this.dataList = []
  }

  public update(data: IDataItem[]) {
    if (this.dataList.length > 0) this.dataList.map((dataItem) => dataItem.destroy());
    this.draw(data)
  }

  private draw(data: IDataItem[]) {

    data.map((dataItem, index) => this.dataList.push(new Card(this.cardWrap.node, 'card', index, dataItem)))
  }

}

export default Goods