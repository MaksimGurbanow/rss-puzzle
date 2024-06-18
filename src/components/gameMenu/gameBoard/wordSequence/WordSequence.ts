import BaseComponent from '../../../BaseComponent';
import Container from '../canvas/container/Container';
import classes from './WordSequence.module.scss';
import Word from './word/Word';

export default class WordSequence extends BaseComponent<HTMLDivElement> {
  private containers: BaseComponent[] = [];

  constructor(words: {order: number, element: Word}[], dropCallback: (e: DragEvent) => void) {
    super({
      tag: 'div',
      classes: [classes.sequence],
    });
    const blockQuantity = words.length;
    for (let i = 0; i < blockQuantity; i += 1) {
      const container = new Container(words[i].element, dropCallback, i);
      this.containers.push(words[i].element);
      this.appendChildren(container);
    }
  }

  public getContainers() {
    return this.containers;
  }

  update(words: { order: number, element: Word }[], dropCallback: (e: DragEvent) => void) {
    this.containers = [];

    if (this.element) {
      this.element.innerHTML = '';
    }

    words.forEach(({ element }, index) => {
      const container = new Container(element, dropCallback, index);
      this.containers.push(container);
      this.appendChildren(container);
    });
  }
}
