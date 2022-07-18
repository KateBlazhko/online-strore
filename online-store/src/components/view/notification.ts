import Control from "../common/control";

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

    const container = new Control(overlay.node, "div", "notification__inner");
    container.node.innerHTML = `
    <span class="notification__text">${notification}</span>
    `;

    setTimeout(() => this.onClose(), 1500);

    overlay.node.onclick = () => {
      this.onClose();
    };
  }
}

export default Notification;
