import BaseComponent from '../../../BaseComponent';
import classes from './Canvas.module.scss';
import Line from './line/Line';

export default class Canvas extends BaseComponent<HTMLDivElement> {
  private lines: Line[] = [];

  constructor(lineCount: number) {
    super({
      tag: 'div',
      classes: [classes.canvas],
    });

    for (let i = 0; i < lineCount; i += 1) {
      const line = new Line();
      this.lines.push(line);
      this.appendChildren(line);
    }

    this.setStyles(lineCount);
  }

  private setStyles(lineCount: number) {
    this.element?.style.setProperty('--line-count', lineCount.toString());
  }

  getLineByIndex(index: number) {
    return this.lines[index];
  }
}
