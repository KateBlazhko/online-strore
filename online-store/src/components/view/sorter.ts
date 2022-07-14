import Control from "../common/control";
import Label from "./label";
import { IParamSorter } from "../controller/IOptions";
import InputControl from "./inputControl";
import * as func from "../common/function"

class Sorter extends Control {
  public static id: number;
  private type: Control;

  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamSorter,
    onChange: (id: string) => void
  ) {
    super(parent, "div", className);

    const title = new Control(this.node, "div", "sorter__title");
      new Control(title.node, "h2", "subtitle", "Sort by");
      this.type = new Control(title.node, "div", "sorter__type");
      const sortButton = new Control(title.node, "div", "sorter__button");

    const sorterWrap = new Control(this.node, "div", "sorter__wrapper");

    for (const key in param) {
      const checked: boolean = param[key];
      const id = key.split(".")[0];
      const input = new InputControl(
        sorterWrap.node,
        "sorter__input",
        "radio",
        "sorter",
        id,
        checked
      );

      input.onInput = () => {
        this.changeType(input.node.value)
        onChange(key);
      };

      const label = new Label(sorterWrap.node, "label label_sort", id, id);
      label.node.onclick = () => {
        func.toggleClassName('open', sorterWrap.node, sortButton.node)
      }
    }

    sortButton.node.onclick = () => {
      func.toggleClassName('open', sorterWrap.node, sortButton.node)
    }
  }

  changeType(value: string) {
    this.type.node.textContent = value
  }
}

export default Sorter;
