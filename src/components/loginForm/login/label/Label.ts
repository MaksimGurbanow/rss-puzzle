import BaseComponent from '../../../BaseComponent';
import classes from './Label.module.scss';

export default class Label extends BaseComponent<HTMLLabelElement> {
  constructor(value: string) {
    super({ tag: 'label', classes: [classes.login__label] });
    this.setAttributes(value);

    if (this.element) {
      this.element.textContent = value;
    }
  }

  setAttributes(value: string) {
    this.element?.setAttribute('for', value);
  }
}
