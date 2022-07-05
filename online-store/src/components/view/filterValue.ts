import Control from "../common/control";

class FilterValue extends Control {
  constructor(parent: HTMLElement | null, className: string) {
    super(parent, 'div', className)

    const title = new Control(this.node, 'h2', 'title', 'Фильтрация по значениям')

  }
}

export default FilterValue