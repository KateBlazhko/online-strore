import Control from "../common/control";
import InputRange from "./inputRange";
import { IParamInputRange } from "../controller/IOptions";
import Marker from "./marker";
import Label from "./label";

class InputDoubleRange extends Control {
  public static id: number;
  private param: IParamInputRange;
  private percentLeft: number;
  private percentRight: number;

  private inputLeft: InputRange;
  private inputRight: InputRange;
  private inputTrack: Control;

  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamInputRange,
    onChange: (id: string, value: string, isLeft: boolean) => void,
    onReset: (id: string, isLeft: boolean) => void
  ) {
    super(parent, "div", className);

    this.param = param;
    const { id, min, max, value } = this.param;

    const left = value.left === "min" ? min : value.left;
    const right = value.right === "max" ? max : value.right;

    this.percentLeft = this.getPercent(+left);
    this.percentRight = this.getPercent(+right);

    this.inputTrack = new Control(this.node, "div", "input-range__track");
    this.setTrackColor();

    const titleWrap = new Control(this.node, "div", "input-range__wrap");

    const inputList = [
      (this.inputLeft = new InputRange(
        this.node,
        "input-range__input left",
        this.param,
        left as string
      )),
      (this.inputRight = new InputRange(
        this.node,
        "input-range__input right",
        this.param,
        right as string
      )),
    ];

    inputList.map((input) => {
      const isLeft: boolean = input.node.classList.contains("left");

      const label = new Label(
        this.node,
        "input-range__label",
        input.node.value,
        input.node.id
      );

      const percent = isLeft ? this.percentLeft : this.percentRight;
      const marker = new Marker(
        titleWrap.node,
        "input-range__title",
        input.node.value,
        percent
      );

      input.node.oninput = () => {
        const value = this.update(input);
        const percentNew = this.setPercent(input, percent, isLeft);

        label.onChange(value);

        marker.onChange(percentNew, value);

        if (isLeft) {
          if (value === input.node.min) onReset(id, isLeft);
          else onChange(id, value, isLeft);
        } else {
          if (value === input.node.max) onReset(id, isLeft);
          else onChange(id, value, isLeft);
        }
        
      };

      input.node.onmouseenter = () => {
        marker.onHide();

        if (isLeft) {
          this.inputLeft.node.style.zIndex = "3";
          this.inputRight.node.style.zIndex = "2";
        } else {
          this.inputRight.node.style.zIndex = "3";
          this.inputLeft.node.style.zIndex = "2";
        }
      };

      input.node.onmouseleave = () => {
        marker.onHide();
      };
    });
  }

  private getPercent(value: number) {
    const { min, max } = this.param;
    return ((value - +min) / (+max - +min)) * 100;
  }

  private setPercent(input: InputRange, percent: number, isLeft: boolean) {
    const value = +input.node.value;

    percent = this.getPercent(value);

    if (isLeft) this.percentLeft = percent;
    else this.percentRight = percent;
    this.setTrackColor();

    return percent;
  }

  private setTrackColor() {
    this.inputTrack.node.style.background = `linear-gradient(to right, #dadae5 ${this.percentLeft}%,
      #0156FF ${this.percentLeft}% , #0156FF ${this.percentRight}%, #dadae5 ${this.percentRight}%)`;
  }

  private update(input: Control<HTMLInputElement>) {
    const valueFirst = this.inputLeft.node.value;
    const valueSecond = this.inputRight.node.value;

    if (+valueFirst > +valueSecond) {
      input.node.value = input.node.classList.contains("left")
        ? valueSecond
        : valueFirst;
    }

    return input.node.value;
  }
}

export default InputDoubleRange;
