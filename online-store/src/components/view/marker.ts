import Control from "../common/control";

class Marker extends Control {
  constructor(
    parent: HTMLElement | null,
    className: string,
    content: string,
    percent: number
  ) {
    super(parent, "div", className, content);

    this.node.style.left = `${percent}%`;
    this.node.style.opacity = "0";
  }

  onChange(percent: number, value: string) {
    this.node.style.left = `${percent}%`;
    this.node.textContent = value;
  }

  onHide() {
    if (this.node.style.opacity === "1") this.node.style.opacity = "0";
    else this.node.style.opacity = "1";
  }
}

export default Marker;
