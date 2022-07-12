import Control from "../common/control";
import * as func from "../common/function";

class Notification extends Control {
  public onClose: () => void;

  constructor(
    parent: HTMLElement | null,
    className: string,
    notification: string
  ) {
    super(parent, className);
    this.onClose = () => {};

    const overlay = new Control(this.node, "div", "notification__overlay");
    const wrapper = new Control(overlay.node, "div", "notification__wrapper");
    const closeButton = new Control(
      wrapper.node,
      "div",
      "notification__close-button"
    );
    const container = new Control(
      wrapper.node,
      "div",
      "notification__container"
    );
    const text = new Control(
      container.node,
      "div",
      "notification__text",
      notification
    );

    closeButton.node.onclick = () => {
      this.onClose();
    };

    overlay.node.onclick = () => {
      this.onClose();
    };

    overlay.node.onmouseover = () => {
      func.toggleClassName("hover", closeButton.node);
    };

    overlay.node.onmouseout = () => {
      func.toggleClassName("hover", closeButton.node);
    };

    container.node.onclick = (event) => event.stopPropagation();

    container.node.onmouseover = (event) => event.stopPropagation();

    container.node.onmouseout = (event) => event.stopPropagation();
  }
}

export default Notification;
