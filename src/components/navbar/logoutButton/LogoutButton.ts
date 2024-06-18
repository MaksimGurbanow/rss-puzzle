import { CallbackType } from '../../../types/types';
import BaseComponent from '../../BaseComponent';
import classes from './LogoutButton.module.scss';

export default class LogoutButton extends BaseComponent {
  constructor(callback: CallbackType) {
    super({
      tag: 'button',
      txt: 'Logout',
      classes: [classes.button],
      events: [
        {
          eventType: 'click',
          callback: (e) => {
            callback(e);
          },
        },
      ],
    });
  }
}
