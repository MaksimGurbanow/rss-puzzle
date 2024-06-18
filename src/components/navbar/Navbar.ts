import { CallbackType } from '../../types/types';
import BaseComponent from '../BaseComponent';
import Nav from './nav/Nav';
import classes from './Navbar.module.scss';

export default class Navbar extends BaseComponent<HTMLDivElement> {
  constructor(callback: CallbackType) {
    super({
      tag: 'div',
      classes: [classes.navbar],
    });

    this.appendChildren(new Nav(callback));
  }
}
