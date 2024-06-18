import { CallbackType } from '../../../../types/types';
import BaseComponent from '../../../BaseComponent';
import classes from './Input.module.scss';

export default class Input extends BaseComponent<HTMLInputElement> {
  constructor(ivalue: string, callback: CallbackType, txt: string) {
    super({
      tag: 'input',
      events: [
        {
          eventType: 'keyup',
          callback,
        },
      ],
      txt,
      classes: [classes.login__input],
    });
    this.setAttributes(ivalue);
    this.setTextContent(txt);
  }

  public setTextContent(value: string = ''): void {
    if (this.element) {
      this.element.value = value;
    }
  }

  setAttributes(value: string) {
    if (this.element) {
      this.element.id = value;
      this.element.name = value;
      this.element.required = true;
    }
  }

  setPattern(letterQuantity: number) {
    if (this.element) {
      this.element.pattern = `[A-Z][a-zA-Z]{${letterQuantity - 1},}`;
    }
  }
}
