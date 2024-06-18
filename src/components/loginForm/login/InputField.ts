import { CallbackType } from '../../../types/types';
import BaseComponent from '../../BaseComponent';
import classes from './InputField.module.scss';
import Error from './error/Error';
import Input from './input/Input';
import Label from './label/Label';

export default class InputField extends BaseComponent<HTMLInputElement> {
  private input: Input;

  private error: Error;

  private label :Label;

  constructor(value: string, callback: CallbackType, inputValue: string) {
    super({ classes: [classes.login__input] });
    this.input = new Input(value, callback, inputValue);
    this.label = new Label(value);
    this.error = new Error('');
    this.render();
  }

  render() {
    this.appendChildren(this.input, this.label, this.error);
  }

  setErrorMessage(msg: string) {
    this.error.setTextContent(msg);
  }
}
