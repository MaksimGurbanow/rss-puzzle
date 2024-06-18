import BaseComponent from '../../../BaseComponent';
import classes from './Icon.module.scss';
import iconSrc from '../../../../assets/audio-hint.png';

export default class Icon extends BaseComponent<HTMLImageElement> {
  constructor(callback: () => void) {
    super({
      tag: 'img',
      classes: [classes.icon],
      events: [
        {
          eventType: 'click',
          callback: (e) => {
            e.stopPropagation();
            callback();
          },
        },
      ],
    });

    this.setAttributes();
  }

  setAttributes() {
    if (this.element) {
      this.element.width = 20;
      this.element.height = 20;
      this.element.src = iconSrc;
    }
  }

  switchClass() {
    this.toggleClass(classes.opened);
  }

  animateIcon() {
    this.toggleClass(classes.animated);
  }
}
