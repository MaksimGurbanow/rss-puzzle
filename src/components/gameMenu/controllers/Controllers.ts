import BaseComponent from '../../BaseComponent';
import classes from './Controllers.module.scss';
import BackgroundToggleButton from './background/BackgroundToggleButton';
import CheckButton from './check/CheckButton';
import CompleteButton from './complete/CompleteButton';
import ContinueButton from './continue/ContinueButton';
import Icon from './pronounciation/Icon';
import PronounciationButton from './pronounciation/PronounciationButton';
import TranslateButton from './translate/TranslateButton';

export default class Controllers extends BaseComponent<HTMLDivElement> {
  private continueButton: ContinueButton;

  private checkButton: CheckButton;

  private completeButton: CompleteButton;

  private translateButton: TranslateButton;

  private pronounciationButton: PronounciationButton;

  private icon: Icon;
  
  private backgroundToggleButton: BackgroundToggleButton;

  constructor(
    check: () => void,
    nextRound: () => void,
    autoComplete: () => void,
    translate: () => void,
    pronounce: () => void,
    hideBackground: () => void,
  ) {
    super({
      tag: 'div',
      classes: [classes.controllers],
    });

    this.continueButton = new ContinueButton(nextRound);

    this.checkButton = new CheckButton(check);

    this.completeButton = new CompleteButton(autoComplete);

    this.translateButton = new TranslateButton(translate);

    this.backgroundToggleButton = new BackgroundToggleButton(hideBackground);

    this.icon = new Icon(pronounce);

    this.pronounciationButton = new PronounciationButton(this.switchIcon.bind(this));
    this.appendChildren(
      this.continueButton,
      this.checkButton,
      this.completeButton,
      this.translateButton,
      this.pronounciationButton,
      this.icon,
      this.backgroundToggleButton,
    );
  }

  switchIcon() {
    this.icon.switchClass();
  }

  animate() {
    this.icon.animateIcon();
  }

  getControllers() {
    return {
      continue: this.continueButton,
      check: this.checkButton,
      complete: this.completeButton,
      translate: this.translateButton,
      pronounce: this.pronounciationButton,
    };
  }
}
