import Control from "../common/control";
import InputControl from "./inputControl";

class Search extends Control {
  input: InputControl
  onSearch: (value: string) => void

  constructor(
    parent: HTMLElement | null,
    className: string,
    value: string,
    onSearch: (value: string) => void
  ) {
    super(parent, "div", className);

    new Control(this.node, "h2", "subtitle", "Search");

    this.input = new InputControl(
      this.node,
      "search__input",
      "search",
      "search"
    );

    if (value) this.input.node.value = value

    this.onSearch = onSearch
    this.input.onInput = (value) => {
      if (typeof value === "string") {
        this.onSearch(value);
      }
    };
  }

  update(value: string) {
    this.input.destroy()
    this.input = new InputControl(
      this.node,
      "search__input",
      "search",
      "search"
    );

    this.input.onInput = (value) => {
      if (typeof value === "string") {
        this.onSearch(value);
      }
    };

    if (value) this.input.node.value = value

  }
}

export default Search;
