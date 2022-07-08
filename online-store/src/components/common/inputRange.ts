import Control from '../common/control';
import { IDataInputRange, IParamInputRange } from '../app/optionsInputRange';

class InputRange extends Control<HTMLInputElement> {
  constructor(
    parent: HTMLElement | null,
    className: string,
    options: IDataInputRange,
    param: IParamInputRange ){
    super(parent, 'input', className)

      const isLeft: boolean = this.node.classList.contains('left');

      const { min, max, step } = param
      const { id, value: {left, right} } = options;

      this.node.type = 'range';
      this.node.min = min;
      this.node.max = max;
      this.node.step = step;
      this.node.value = isLeft ? left : right
      this.node.id = isLeft ? id + '-left' : id + '-right'
  }
}

export default InputRange