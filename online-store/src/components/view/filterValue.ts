import Control from "../common/control";
import { IParamInputValue } from './optionsInputValue'
import InputMultipleValue from './inputMValue'

class FilterValue extends Control {
  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamInputValue[],
    onChange: (id: string, value: boolean, nameValue: string) => void,
    onReset: (id: string, nameValue: string) => void) {

    super(parent, 'div', className)

    const title = new Control(this.node, 'h2', 'title', 'Фильтрация по значениям')

    const filterValue = [
      new Control(this.node, 'div', 'filter-value'),
      new Control(this.node, 'div', 'filter-value'),
      new Control(this.node, 'div', 'filter-value'),
      new Control(this.node, 'div', 'filter-value')
    ] 

    filterValue.map((item, index) => {
      new Control(item.node, 'h3', 'title', param[index].filter);

      new InputMultipleValue(
        item.node,
        'filter-value__input',
        param[index],
        onChange,
        onReset);
    })

  }
}

export default FilterValue