import BaseComponent from '../../../BaseComponent';
import classes from './PronounCiationButton.module.scss';

export default class PronounciationButton extends BaseComponent<HTMLButtonElement> {
  constructor(callback: () => void) {
    super({
      tag: 'button',
      txt: 'Pronounciation',
      classes: [classes.pronounciation],
      events: [
        {
          eventType: 'click',
          callback: () => {
            callback();
          },
        },
      ],
    });
  }
}
