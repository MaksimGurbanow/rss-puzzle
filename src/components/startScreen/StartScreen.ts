import BaseComponent from '../BaseComponent';
import { CallbackType } from '../../types/types';
import Navbar from '../navbar/Navbar';
import {
  button, div, h2, h3,
} from '../../utils/tags';
import classes from './StartScreen.module.scss';

export default class StartScreen extends BaseComponent<HTMLDivElement> {
  constructor(firstName: string, surname: string, logout: CallbackType, start: CallbackType) {
    super({
      tag: 'div',
      classes: [classes.start__screen],
    });

    const descriptionContainer = div();
    descriptionContainer.addClass(classes.description);
    const btn = button('Start', start);
    btn.addClass(classes.button);

    descriptionContainer.appendChildren(
      h2(`Hello ${firstName} ${surname}`),
      h3('English puzzles'),
      div('Click on words, collect phrases. Use drag\'n\'drop and solve puzzles!'),
    );

    this.appendChildren(new Navbar(logout), descriptionContainer, btn);
  }
}
