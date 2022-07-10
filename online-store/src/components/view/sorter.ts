import Control from '../common/control';
import Label from './label'
import { IParamSorter, paramSorter } from '../view/options/optionsSorter'
import InputControl from './inputControl';


class Sorter extends Control {
  public static id: number;
  

  constructor(
    parent: HTMLElement | null,
    className: string,
    param: IParamSorter,
    onChange: (id: string) => void) {
    super(parent, 'div', className)

    const title = new Control(this.node, 'h2', 'title', 'Sort by')

    const sorterWrap = new Control(this.node, 'div', 'sorter__wrapper')

    for (const key in paramSorter) {

      const checked: boolean = param[key]
      const id = key.replace(/([\w\s-]*)\.\w*\.\w*/, '$1')
      const input = new InputControl(sorterWrap.node, 'sorter__input', 'radio', 'sorter', id, checked)

      input.onInput = () => {
        onChange (key)
      }

      const label = new Label (sorterWrap.node, 'sorter__label', id, id)
    }
  }
   

}

export default Sorter
