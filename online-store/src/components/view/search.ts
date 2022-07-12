import Control from "../common/control";
import InputControl from "./inputControl";

class Search extends Control {
  constructor(
    parent: HTMLElement | null,
    className: string,
    onSearch: (value: string) => void
  ) {
    super(parent, "div", className);
    const title = new Control(this.node, "h2", "title", "Search");
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

    // const buttonSearch = new Control(this.node, "div", "button", "Search")
    // buttonSearch.node.onclick = () => {

    // }
  }
}

export default Search;
