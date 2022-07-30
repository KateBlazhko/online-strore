import Control from "../common/control";

class Marker extends Control {
  _isHidden: boolean

  set isHidden(value: boolean) {
    this._isHidden = value
  }

  get isHidden() {
    return this._isHidden
  }
  
  constructor(
    parent: HTMLElement | null,
    className: string,
    content: string,
    percent: number
  ) {
    super(parent, "div", className, content);
    this._isHidden = true
    this.node.style.left = `${percent}%`;
    this.node.style.opacity = "0";
  }

  onChange(percent: number, value: string) {
    this.node.style.left = `${percent}%`;
    this.node.textContent = value;
  }

  show() {
    if (this.isHidden) {
      this.node.style.opacity = "1"
      this.isHidden = !this.isHidden
    }
  }

  hide() {
    if (!this.isHidden) {
      this.node.style.opacity = "0"
      this.isHidden = !this.isHidden
    }
  }
}

export default Marker;
