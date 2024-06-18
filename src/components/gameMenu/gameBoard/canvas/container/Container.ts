import BaseComponent from '../../../../BaseComponent';
import Word from '../../wordSequence/word/Word';
import classes from './Container.module.scss';

export default class Container extends BaseComponent<HTMLDivElement> {
  constructor(word: Word | null, dropCallback: (e: DragEvent) => void, index: number) {
    super({
      tag: 'div',
      classes: [classes.container],
      events: [
        {
          eventType: 'drop',
          callback: (e) => {
            e.preventDefault();
            if (e instanceof DragEvent) {
              dropCallback(e);
              const { target } = e;
              if (target instanceof HTMLElement) {
                target.classList.remove(classes.dragovered);
              }
            }
          },
        },
        {
          eventType: 'dragover',
          callback: (e) => {
            e.preventDefault();
            const { target } = e;
            if (target instanceof HTMLElement) {
              target.classList.add(classes.dragovered);
            }
          },
        },
        {
          eventType: 'dragleave',
          callback: (e) => {
            const { target } = e;
            if (target instanceof HTMLElement) {
              target.classList.remove(classes.dragovered);
            }
          },
        },
      ],
    }, word);

    this.element?.setAttribute('order', index.toString());
  }

  compareWithBlock(): boolean {
    if (this.element && this.element.firstChild instanceof HTMLElement) {
      const contOrder = this.element.getAttribute('order');
      const wordOrder = this.element.firstChild.getAttribute('order');

      return contOrder === wordOrder;
    }
    return false;
  }
}
