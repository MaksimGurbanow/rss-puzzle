import BaseComponent from '../../../BaseComponent';
import classes from './ContinueButton.module.scss';

export default class ContinueButton extends BaseComponent<HTMLButtonElement> {
  constructor(callback: () => void) {
    super({
      tag: 'button',
      txt: 'Continue',
      classes: [classes.continue__button],
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
