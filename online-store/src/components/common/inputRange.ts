import Control from './control'

class InputRange extends Control<HTMLInputElement> {
  public static id: number;
  private max: string;
  private min: string;
  private percentLeft: number;
  private percentRight: number;

  private inputLeft: Control<HTMLInputElement>;
  private inputRight: Control<HTMLInputElement>;
  private inputTrack: Control;

  constructor(parent: HTMLElement | null, className: string, min: string, max: string, step: string) {
    super(parent, 'div', className)

    this.max = max;
    this.min = min;
    this.percentLeft = 0;
    this.percentRight = 100;

    this.inputTrack = new Control(this.node, 'div', 'input-range__track');
    this.inputTrack.node.style.background = `linear-gradient(to right, #dadae5 ${this.percentLeft}%,
      #3264fe ${this.percentLeft}% , #3264fe ${this.percentRight}%, #dadae5 ${this.percentRight}%)`;

    const inputList = [
      this.inputLeft = new Control<HTMLInputElement>(this.node, 'input', 'input-range__input left'),
      this.inputRight = new Control<HTMLInputElement>(this.node, 'input', 'input-range__input right')
    ]

    const titleWrap = new Control(this.node, 'div', 'input-range__wrap');

    inputList.map((input, index) => {
      input.node.type = 'range';
      input.node.min = this.min;
      input.node.max = this.max;
      input.node.step = step;
      input.node.value = input.node.classList.contains('left') ? this.min : this.max
      input.node.id = InputRange.getId().toString()

      const label = new Control<HTMLLabelElement>(this.node, 'label', 'input-range__label', input.node.value)
      label.node.htmlFor = input.node.id

      const percent = input.node.classList.contains('left') ? this.percentLeft : this.percentRight

      const title = new Control(titleWrap.node, 'div', 'input-range__title', input.node.value);
      title.node.style.left = `${percent}%`;

      input.node.oninput = () => {
        const value = this.update(input);
        this.setTrackColor(input);

        label.node.textContent = value

        const percent = input.node.classList.contains('left') ? this.percentLeft : this.percentRight
        title.node.style.left = `${percent}%`;
        title.node.textContent = value
      };

      input.node.onmouseenter = () => {
        title.node.style.opacity= '1';
        
        if (input.node.classList.contains('left')) {
          this.inputLeft.node.style.zIndex = '2';
          this.inputRight.node.style.zIndex = '1';
        } else {
          this.inputRight.node.style.zIndex = '2';
          this.inputLeft.node.style.zIndex = '1';
        }
      }

      input.node.onmouseleave = () => {
        title.node.style.opacity= '0';
      }
    })

  }

  private setTrackColor(input: Control<HTMLInputElement>) {
    const value = +input.node.value;
    const max = +this.max;
    const min = +this.min;

    if (input.node.classList.contains('left')) {
      this.percentLeft = ((value - min) / (max- min)) * 100;
    } else {
      this.percentRight = ((value - min) / (max- min)) * 100;
    }

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

  private static getId () {
    return InputRange.id += 1
  }

}

InputRange.id = 0

export default InputRange
