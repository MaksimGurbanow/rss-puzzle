import BaseComponent from '../../../BaseComponent';
import classes from './Error.module.scss';

export default class Error extends BaseComponent<HTMLDivElement> {
  constructor(message?: string) {
    super({
      tag: 'div',
      classes: [classes.words__error],
      txt: message,
    });
  }
}
