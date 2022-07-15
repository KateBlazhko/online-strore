import Control from "../common/control";
import * as func from "../common/function";

class Notification extends Control {
  public onClose: () => void;

  constructor(
    parent: HTMLElement | null,
    className: string,
    notification: string
  ) {
    super(parent, "div", className);
    this.onClose = () => {};

    const overlay = new Control(this.node, "div", "notification__overlay");

    const container = new Control(
      overlay.node,
      "div",
      "notification__inner"
    );
    const text = new Control(
      container.node,
      "span",
      "notification__text",
      notification
    );

    setTimeout(() => this.onClose(), 1500)

    overlay.node.onclick = () => {
      this.onClose();
    };

  }
}

export default Notification;
