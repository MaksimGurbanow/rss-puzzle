import { CallbackType } from '../../../../../types/types';
import BaseComponent from '../../../../BaseComponent';
import classes from './Word.module.scss';

export default class Word extends BaseComponent<HTMLDivElement> {
  constructor(
    word: string,
    index: number,
    clickCallback: CallbackType,
    dragStartCallback: CallbackType,
  ) {
    super({
      tag: 'div',
      classes: [classes.word],
      txt: word,
      events: [
        {
          eventType: 'click',
          callback: (e) => {
            const target = e.target as HTMLElement;
            clickCallback(e);
            if (target instanceof HTMLElement) {
              target.classList.toggle(classes.clicked);
              target.setAttribute('clicked', (target.getAttribute('clicked') === 'false').toString());
            }
          },
        },
        {
          eventType: 'dragstart',
          callback: (e) => {
            if (e instanceof DragEvent) {
              const target = e.target as HTMLElement;
              if (target instanceof HTMLElement) {
                target.classList.add(classes.dragged);
                dragStartCallback(e);
              }
            }
          },
        },
        {
          eventType: 'dragend',
          callback: (e) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            if (target instanceof HTMLElement) {
              target.classList.remove(classes.dragged);
            }
          },
        },
      ],
    });
    this.setAttributes(index);
  }

  setBackground(
    wordIndex: number,
    lineIndex: number,
    wordCount: number,
    lineCount: number,
    imgSrc: string,
  ) {
    const bgWidth = 570;
    const bgHeight = 420;
    if (this.element) {
      this.element.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imgSrc}")`;
      this.element.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      this.element.style.backgroundPosition = `-${(bgWidth / wordCount) * wordIndex}px -${(bgHeight / lineCount) * lineIndex}px`;
    }
  }

  setInvisibleBackground() {
    this.toggleClass(classes.hidden);
  }

  setAttributes(index: number) {
    if (this.element) {
      this.element.draggable = true;
      this.element.setAttribute('clicked', 'false');
      this.element.setAttribute('order', index.toString());
    }
  }
}
