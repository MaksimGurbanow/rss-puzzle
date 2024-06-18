import BaseComponent from '../../../BaseComponent';
import classes from './BackgroundToggleButton.module.scss';

export default class BackgroundToggleButton extends BaseComponent<HTMLButtonElement> {
  constructor(callback: () => void) {
    super({
      tag: 'button',
      txt: 'Image show/hide',
      classes: [classes.background],
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
