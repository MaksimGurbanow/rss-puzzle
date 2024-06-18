import { CallbackType } from '../../../types/types';
import BaseComponent from '../../BaseComponent';
import LogoutButton from '../logoutButton/LogoutButton';
import classes from './Nav.module.scss';

export default class Nav extends BaseComponent {
  constructor(callback: CallbackType) {
    super({
      tag: 'nav',
      classes: [classes.nav],
    });

    this.appendChildren(new LogoutButton(callback));
  }
}
