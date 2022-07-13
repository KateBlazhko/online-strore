import Control from "../common/control";
import { IParamInputRange } from "../controller/IOptions";
import InputDoubleRange from "./inputDRange";

class FilterRange extends Control {
  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamInputRange[],
    onChange: (id: string, value: string, isLeft: boolean) => void,
    onReset: (id: string, isLeft: boolean) => void
  ) {
    super(parent, "div", className);

    new Control(this.node, "h2", "subtitle", "Filter by");

    const filterRange = [
      new Control(this.node, "div", "filter-range"),
      new Control(this.node, "div", "filter-range"),
      new Control(this.node, "div", "filter-range"),
    ];

    filterRange.map((item, index) => {
      new Control(item.node, "h3", "subtitle", param[index].filter);

      new InputDoubleRange(
        item.node,
        "input-range",
        param[index],
        onChange,
        onReset
      );
    });
  }
}

export default FilterRange;
