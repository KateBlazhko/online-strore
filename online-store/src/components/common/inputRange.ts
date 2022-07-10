import Control from '../common/control';
import { IParamInputRange } from '../view/optionsInputRange'

class InputRange extends Control<HTMLInputElement> {
  public parent: HTMLElement | null;
  public className: string;
    
  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamInputRange,
    value: string ){
    super(parent, 'input', className)

      const isLeft: boolean = this.node.classList.contains('left');

      const { id, min, max, step } = param

      this.node.type = 'range';
      this.node.min = min;
      this.node.max = max;
      this.node.step = step;
      this.node.value = value
      this.node.id = isLeft ? id + '-left' : id + '-right'
  }
}

export default InputRange