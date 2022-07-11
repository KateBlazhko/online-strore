import Control from "../common/control";

class Label extends Control<HTMLLabelElement> {
  constructor(
    parent: HTMLElement | null,
    className: string,
    content: string,
    id: string
  ) {
    super(parent, "label", className, content);

    this.node.htmlFor = id;
  }

  onChange(value: string) {
    this.node.textContent = value;
  }
}

export default Label;
