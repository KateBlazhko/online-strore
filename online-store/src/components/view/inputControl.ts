import Control from "../common/control";

class InputControl extends Control<HTMLInputElement> {
  public onInput: (checked: boolean) => void;

  constructor(
    parent: HTMLElement | null,
    className: string,
    type: string,
    name: string,
    id: string,
    checked: boolean
  ) {
    super(parent, "input", className);
    this.onInput = () => {};

    this.node.type = type;
    this.node.id = id;
    this.node.name = name;
    this.node.value = id;
    this.node.checked = checked;

    this.node.oninput = () => {
      this.onInput(this.node.checked);
    };
  }
}

export default InputControl;
