import BaseComponent from '../../../BaseComponent';
import classes from './TextTranslate.module.scss';

export default class TextTranslate extends BaseComponent<HTMLDivElement> {
  constructor(translate: string) {
    super({
      tag: 'div',
      txt: translate,
      classes: [classes.translate],
    });
  }

  translate() {
    this.toggleClass(classes.closed);
  }
}
