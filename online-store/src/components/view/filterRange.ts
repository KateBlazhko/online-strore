import Control from "../common/control";
import InputRange from "../common/inputRange";

interface IInputRange {
    filter: string,
    min: string,
    max:string,
    step: string,
}

const options: IInputRange[] = [
  {
    filter: 'Фильтрация по цене, $',
    min: '500',
    max: '2000',
    step: '1',
  },
  {
    filter: 'Фильтрация по году выпуска',
    min: '2000',
    max: '2022',
    step: '1',
  }
]

class FilterRange extends Control {

  constructor(parent: HTMLElement | null, className: string) {
    super(parent, 'div', className)

    const title = new Control(this.node, 'h2', 'title', 'Фильтрация по диапазону')

    const filterRange = [
      new Control(this.node, 'div', 'filter-range'),
      new Control(this.node, 'div', 'filter-range')
    ] 

    filterRange.forEach((item, index) => {
      new Control(item.node, 'h3', 'title', options[index].filter);

      new InputRange(item.node, 'input-range', 
        options[index].min, options[index].max, options[index].step)

    })
  }

}

export default FilterRange