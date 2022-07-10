import Control from '../common/control';

class InputValue extends Control<HTMLInputElement> {
  public parent: HTMLElement | null;
  public className: string;
  public onInput: (checked: boolean) => void
    
  constructor (
    parent: HTMLElement | null,
    className: string,
    name: string,
    id: string,
    checked: boolean ){
    super(parent, 'input', className)

      this.node.type = 'checkbox';
      this.node.id = id
      this.node.name = name;
      this.node.value = id;
      this.node.checked = checked

      this.node.oninput = () => {
        this.onInput(this.node.checked)
      }
  }
}

export default InputValue