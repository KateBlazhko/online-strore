import Control from "../common/control";

class Label extends Control<HTMLLabelElement> {
  constructor(
    parent: HTMLElement | null,
    className: string,
    content: string,
    id?: string
  ) {
    super(parent, "label", className, content);

    this.node.htmlFor = id ? id : content;  

    if (content.match(/^[^0-9]+$/)) {
      const url = `./assets/icons/${content.toLowerCase()}.png`
      this.node.style.backgroundImage = `url(${url})`;
    }

  }

  onChange(value: string) {
    this.node.textContent = value;
  }
}

export default Label;
