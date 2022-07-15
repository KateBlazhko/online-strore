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
    new Control(this.node, "h2", "subtitle", "Sort by");

    const choiceType = new Control(this.node, "div", "sorter__choice");

      let content = ''
      for (const key in param) {
        if (param[key]) content = key.split(".")[0];
      }
      
      this.type = new Control(choiceType.node, "div", "sorter__type", content);
      const sorterIcon = new Control(choiceType .node, "div", "sorter__icon");

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
        func.toggleClassName('open', sorterWrap.node, sorterIcon.node)
      }
    }

    choiceType.node.onclick = () => {
      func.toggleClassName('open', sorterWrap.node, sorterIcon.node)
    }
  }

  changeType(value: string) {
    this.type.node.textContent = value
  }
}

export default Sorter;
