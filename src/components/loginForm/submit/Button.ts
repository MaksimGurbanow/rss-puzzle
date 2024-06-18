import { CallbackType } from '../../../types/types';
import BaseComponent from '../../BaseComponent';
import classes from './Button.module.scss';

export default class Button extends BaseComponent<HTMLButtonElement> {
  private status: boolean;

  constructor(callback: CallbackType) {
    const availableClasses = [classes.login__button];
    super({
      tag: 'button',
      txt: 'Submit',
      classes: availableClasses,
      events: [
        {
          eventType: 'click',
          callback: (e) => {
            if (this.status) {
              e.preventDefault();
              callback(e);
            }
          },
        },
      ],
    });
    this.status = false;
  }

  setStyle() {
    if (this.status) {
      this.addClass(classes.open);
    } else {
      this.removeClass(classes.open);
    }
  }

  setStatus(value: boolean) {
    this.status = value;
    this.setStyle();
  }
}
