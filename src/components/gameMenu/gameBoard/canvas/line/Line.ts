import BaseComponent from '../../../../BaseComponent';
import Container from '../container/Container';
import classes from './Line.module.scss';

export default class Line extends BaseComponent<HTMLDivElement> {
  private containers: { index: number, element: Container, isEmpty: boolean }[] = [];

  constructor() {
    super({
      tag: 'div',
      classes: [classes.line],
    });
  }

  addBlockContainer(count: number, dropCallback: (e: DragEvent) => void) {
    for (let i = 0; i < count; i += 1) {
      const container = new Container(null, dropCallback, i);
      this.appendChildren(container);
      this.containers.push({ index: i, element: container, isEmpty: true });
    }
  }

  getContainers() {
    return this.containers;
  }
}
