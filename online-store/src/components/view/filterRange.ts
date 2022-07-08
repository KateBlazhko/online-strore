import Control from "../common/control";
import { IDataState } from '../app/appState'
import { IDataInputRange, IParamInputRange } from '../app/optionsInputRange';
import InputDoubleRange from './inputDRange'

class FilterRange extends Control {

  constructor(
    parent: HTMLElement | null,
    className: string,
    options: IDataInputRange[],
    param: IParamInputRange[],
    onChange: (id: string, value:string, isLeft: boolean) => void) {

    super(parent, 'div', className)

    const title = new Control(this.node, 'h2', 'title', 'Фильтрация по диапазону')

    const filterRange = [
      new Control(this.node, 'div', 'filter-range'),
      new Control(this.node, 'div', 'filter-range'),
      new Control(this.node, 'div', 'filter-range')
    ] 

    filterRange.map((item, index) => {
      new Control(item.node, 'h3', 'title', param[index].filter);

      new InputDoubleRange(
        item.node,
        'input-range',
        options[index],
        param[index],
        onChange);
    })
  }

  private getMax(id: string) {

  }

}

export default FilterRange