import Control from "../common/control";

class Search extends Control {
  constructor(parent: HTMLElement | null, className: string) {
    super(parent, 'div', className)

    const title = new Control(this.node, 'h2', 'title', 'Поиск')

  }
}

export default Search