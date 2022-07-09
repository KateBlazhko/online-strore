import Control from '../common/control';
import { IParamInputRange } from '../app/optionsInputRange'

class InputRange extends Control<HTMLInputElement> {
  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamInputRange,
    value: string ){
    super(parent, 'input', className)

      const isLeft: boolean = this.node.classList.contains('left');

      const { id, min, max, step, value: {left, right} } = param

      this.node.type = 'range';
      this.node.min = min;
      this.node.max = max;
      this.node.step = step;
      this.node.value = value
      this.node.id = isLeft ? id + '-left' : id + '-right'
  }
}

export default InputRange