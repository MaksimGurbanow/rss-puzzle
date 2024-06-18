import BaseComponent from '../../../BaseComponent';
import classes from './CompleteButton.module.scss';

export default class completeButton extends BaseComponent<HTMLDivElement> {
  constructor(callback: () => void) {
    super({
      tag: 'button',
      txt: 'Auto Complete',
      classes: [classes.complete],
      events: [
        {
          eventType: 'click',
          callback,
        },
      ],
    });
  }
}
