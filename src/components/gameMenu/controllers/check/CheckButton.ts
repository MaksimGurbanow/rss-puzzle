import BaseComponent from '../../../BaseComponent';
import classes from './Check.module.scss';

export default class CheckButton extends BaseComponent<HTMLButtonElement> {
  constructor(callback: () => void) {
    super({
      tag: 'button',
      txt: 'Check',
      classes: [classes.check__button],
      events: [
        {
          eventType: 'click',
          callback,
        },
      ],
    });
  }

  open() {
    this.addClass(classes.open);
  }

  close() {
    this.removeClass(classes.open);
  }
}
