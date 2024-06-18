import BaseComponent from '../../../BaseComponent';
import classes from './TranslateButton.module.scss';

export default class TranslateButton extends BaseComponent<HTMLButtonElement> {
  constructor(callback: () => void) {
    super({
      tag: 'button',
      txt: 'Translate',
      classes: [classes.translate],
      events: [
        {
          eventType: 'click',
          callback: () => {
            callback();
            this.toggleClass(classes.off);
          },
        },
      ],
    });
  }
}
