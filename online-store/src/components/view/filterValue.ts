import Control from "../common/control";
import { IParamInputValue } from "../controller/IOptions";
import InputMultipleValue from "./inputValue";

class FilterValue extends Control {
  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamInputValue[],
    onChange: (id: string, value: boolean, nameValue: string) => void,
    onReset: (id: string, nameValue: string) => void
  ) {
    super(parent, "div", className);

    const filterValue = [
      new Control(this.node, "div", "filter-value"),
      new Control(this.node, "div", "filter-value"),
      new Control(this.node, "div", "filter-value"),
      new Control(this.node, "div", "filter-value"),
    ];

    filterValue.map((item, index) => {
      new Control(item.node, "h3", "subtitle", param[index].filter);

      new InputMultipleValue(
        item.node,
        `filter-value__input filter-value__input_${param[
          index
        ].filter.toLowerCase()}`,
        param[index],
        onChange,
        onReset
      );
    });
  }
}

export default FilterValue;
