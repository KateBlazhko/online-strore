import Control from "../common/control";
import InputControl from "./inputControl";

class Search extends Control {
  constructor(
    parent: HTMLElement | null,
    className: string,
    onSearch: (value: string) => void
  ) {
    super(parent, "div", className);

    new Control(this.node, "h2", "subtitle", "Search");

    const input = new InputControl(
      this.node,
      "search__input",
      "search",
      "search"
    );
    input.onInput = (value) => {
      if (typeof value === "string") {
        onSearch(value);
      }
    };
  }
}

export default Search;
