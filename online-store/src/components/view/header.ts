import Control from "../common/control";

class Header extends Control {
  constructor(parent: HTMLElement | null, className: string) {
    super(parent, 'header', className)

    const title = new Control(this.node, 'h1', 'title', 'Online-store')
  }
}

export default Header