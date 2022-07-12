import Control from "../common/control";

class InputControl extends Control<HTMLInputElement> {
  public onInput: (value: string | boolean) => void;

  constructor(
    parent: HTMLElement | null,
    className: string,
    type: string,
    name: string,
    id?: string,
    checked?: boolean
  ) {
    super(parent, "input", className);
    this.onInput = () => {};

    this.node.type = type;
    this.node.name = name;

    if (type === "checkbox" || type === "radio") {
      this.createCheckInput(checked, id);
    }

    if (type === "search") {
      this.createSearchInput();
    }
  }

  createCheckInput(checked?: boolean, id?: string) {
    if (checked !== undefined) this.node.checked = checked;

    if (id !== undefined) {
      this.node.value = id;
      this.node.id = id;
    }

    this.node.oninput = () => {
      this.onInput(this.node.checked);
    };
  }

  createSearchInput() {
    this.node.placeholder = "Search goods...";
    this.node.autocomplete = "off";
    this.node.focus();

    this.node.oninput = () => {
      this.onInput(this.node.value);
    };
  }
}

export default InputControl;
