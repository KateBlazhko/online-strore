import Control from '../common/control';
import InputRange from '../common/inputRange';
import { IParamInputRange, paramInputRange } from './optionsInputRange'

class InputDoubleRange extends Control {
  public static id: number;
  private param: IParamInputRange
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
    onReset: (id: string, isLeft: boolean) => void) {
    super(parent, 'div', className)

    this.param = param
    const { id, min, max, value } = this.param

    const left = value.left === 'min' ? min : value.left;
    const right = value.right === 'max' ? max : value.right

    this.percentLeft = this.getPercent(+left)
    this.percentRight = this.getPercent(+right)

    this.inputTrack = new Control(this.node, 'div', 'input-range__track');
    this.setTrackColor()

    const titleWrap = new Control(this.node, 'div', 'input-range__wrap');

    const inputList = [
      this.inputLeft = new InputRange(this.node, 'input-range__input left', this.param, left),
      this.inputRight = new InputRange(this.node, 'input-range__input right', this.param, right)
    ]

    inputList.map((input) => {
      const isLeft: boolean = input.node.classList.contains('left');

      const label = new Control<HTMLLabelElement>(this.node, 'label', 'input-range__label', input.node.value)
      label.node.htmlFor = input.node.id

      const title = new Control(titleWrap.node, 'div', 'input-range__title', input.node.value);
      const percent = isLeft ? this.percentLeft : this.percentRight
      title.node.style.left = `${percent}%`;

      input.node.oninput = () => {
        const value = this.update(input);
        this.setPercent(input, isLeft);

        label.node.textContent = value

        const percent = isLeft ? this.percentLeft : this.percentRight
        title.node.style.left = `${percent}%`;
        title.node.textContent = value

        if (value === input.node.max || value === input.node.min) onReset(id, isLeft)
        else onChange(id, value, isLeft)
      };

      input.node.onmouseenter = () => {
        title.node.style.opacity= '1';
        
        if (isLeft) {
          this.inputLeft.node.style.zIndex = '3';
          this.inputRight.node.style.zIndex = '2';
        } else {
          this.inputRight.node.style.zIndex = '3';
          this.inputLeft.node.style.zIndex = '2';
        }
      }

      input.node.onmouseleave = () => {
        title.node.style.opacity= '0';
      }
    })
  }

  private getPercent(value: number) {
    const { min, max } = this.param
    return ((value - +min) / (+max - +min)) * 100;
  }

  private setPercent(input: InputRange, isLeft: boolean) {
    const value = +input.node.value;
    
    if (isLeft) {
      this.percentLeft = this.getPercent(value)
    } else {
      this.percentRight = this.getPercent(value)
    }

    this.setTrackColor()
  }

  private setTrackColor() {
    this.inputTrack.node.style.background = `linear-gradient(to right, #dadae5 ${this.percentLeft}%,
      #3264fe ${this.percentLeft}% , #3264fe ${this.percentRight}%, #dadae5 ${this.percentRight}%)`;;
  }

  private update(input: Control<HTMLInputElement>){
    const valueFirst = this.inputLeft.node.value;
    const valueSecond = this.inputRight.node.value;

    if(+valueFirst > +valueSecond){
      input.node.value = (input.node.classList.contains('left')) ? valueSecond : valueFirst
    }

    return input.node.value
  }
}

export default InputDoubleRange
