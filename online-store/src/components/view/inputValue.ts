import Control from "../common/control";
import { IParamInputValue } from "../controller/IOptions";
import InputControl from "./inputControl";
import Label from "./label";

class InputMultipleValue extends Control {
  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamInputValue,
    onChange: (id: string, value: boolean, nameValue: string) => void,
    onReset: (id: string, nameValue: string) => void
  ) {
    super(parent, "div", className);

    const { id, value } = param;

    for (const key in value) {
      const checked = value[key];

      if (typeof checked === "boolean") {
        const input = new InputControl(
          this.node,
          `checkbox`,
          "checkbox",
          id,
          key,
          checked
        );

        input.onInput = (checked) => {
          if (typeof checked === "boolean") {
            if (checked) onChange(id, checked, key);
            else onReset(id, key);
          }
        };

        const label = new Label(this.node,
          `label`,
          key
        );
      }
    }
  }
}

export default InputMultipleValue;
