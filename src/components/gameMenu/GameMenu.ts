import { Round } from '../../types/round';
import BaseComponent from '../BaseComponent';
import Controllers from './controllers/Controllers';
import GameBoard from './gameBoard/GameBoard';
import classes from './GameMenu.module.scss';

export default class GameMenu extends BaseComponent {
  private gameBoard: GameBoard;

  private controllers: Controllers;

  private enabledCheck: boolean = false;

  private enabledContinue: boolean = false;

  constructor(gameParams: Round) {
    super({
      tag: 'div',
      classes: [classes.game__menu],
    });

    this.controllers = new Controllers(
      this.handleCheck.bind(this),
      this.nextRound.bind(this),
      this.complete.bind(this),
      this.translate.bind(this),
      this.pronounce.bind(this),
      this.hideBackground.bind(this),
    );
    const { levelData, words } = gameParams;
    this.gameBoard = new GameBoard(
      levelData,
      words,
      this.enableCheckButton.bind(this),
      this.controllers.animate.bind(this.controllers),
    );

    this.appendChildren(this.controllers, this.gameBoard);
  }

  hideBackground() {
    this.gameBoard.hideBackground();
  }

  translate() {
    this.gameBoard.translate();
  }

  complete() {
    this.gameBoard.complete();
    this.enableContinueButton();
  }

  pronounce() {
    this.gameBoard.playExample();
  }

  handleCheck() {
    if (this.enabledCheck) {
      const words = this.gameBoard.getLine().getContainers();

      words.forEach((word) => {
        const { element } = word;
        element.removeClass(classes.correct);
        element.removeClass(classes.wrong);
        const isCorrect = word.element.compareWithBlock();
        if (isCorrect) {
          element.addClass(classes.correct);
        } else {
          element.addClass(classes.wrong);
        }
      });

      const canContinue = words.every((word) => word.element.compareWithBlock());

      if (canContinue) {
        this.enableContinueButton();
      }
    }
  }

  enableCheckButton() {
    this.controllers.getControllers().check.open();
    this.enabledCheck = true;
  }

  enableContinueButton() {
    this.controllers.getControllers().continue.open();
    this.enabledContinue = true;
    this.controllers.getControllers().check.setStyle('display', 'none');
  }

  nextRound() {
    const words = this.gameBoard.getLine().getContainers();

    const canContinue = words.every((word) => word.element.compareWithBlock());

    if (canContinue) {
      this.gameBoard.currentPosition.line += 1;
      this.gameBoard.currentPosition.word = 0;
      this.gameBoard.update(this.enableCheckButton.bind(this));
      this.enabledContinue = false;
      this.enabledCheck = false;
      this.controllers.getControllers().continue.close();
      this.controllers.getControllers().check.close();
      this.controllers.getControllers().check.setStyle('display', 'flex');
    }
  }
}
