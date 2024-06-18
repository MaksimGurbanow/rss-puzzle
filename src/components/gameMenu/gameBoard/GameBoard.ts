import { LevelData, Sentence } from '../../../types/round';
import BaseComponent from '../../BaseComponent';
import WordSequence from './wordSequence/WordSequence';
import classes from './GameBoard.module.scss';
import TextTranslate from './textTranslate/TextTranslate';
import Canvas from './canvas/Canvas';
import Word from './wordSequence/word/Word';
import randomizeWords from '../../../types/wordRandomizer';

export default class GameBoard extends BaseComponent<HTMLDivElement> {
  private canvas: Canvas;

  private wordSequence: WordSequence;

  private textTranslate: TextTranslate;

  private wordBlocks: {order: number, element: Word}[];

  private draggedElem: Word | EventTarget | null = null;

  public currentPosition: {line: number, word: number};

  private levelData: LevelData;

  private words: Sentence[];

  private audio: HTMLAudioElement;

  constructor(levelData: LevelData, words: Sentence[], callback: () => void, animate: () => void) {
    super({
      tag: 'div',
      classes: [classes.game__board],
    });

    this.levelData = levelData;
    this.words = words;

    const { textExample, textExampleTranslate, audioExample } = words[0];

    this.currentPosition = { line: 0, word: 0 };
    this.wordBlocks = textExample.split(' ').map((word, index) => ({
      order: index,
      element: new Word(
        word,
        index,
        (e) => this.handleClick.bind(this)(e, callback),
        (e) => this.handleDragStart.bind(this)(e.target!),
      ),
    }));
    this.wordBlocks.forEach((block) => {
      const { element, order } = block;
      element.setBackground(
        order,
        this.currentPosition.line,
        this.wordBlocks.length,
        words.length,
        levelData.imageSrc,
      );
    });
    this.wordSequence = new WordSequence(
      randomizeWords(this.wordBlocks),
      this.handleDrop.bind(this),
    );
    this.textTranslate = new TextTranslate(textExampleTranslate);
    this.canvas = new Canvas(words.length);
    this.render();
    this.audio = new Audio(`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioExample}`);
    this.audio.addEventListener('play', animate);
    this.audio.addEventListener('ended', animate);
  }

  handleClick(e: Event, callback: () => void) {
    const { target } = e;
    const containers = this.canvas
      .getLineByIndex(this.currentPosition.line)
      .getContainers();
    if (target instanceof HTMLElement) {
      if (target.getAttribute('clicked') === 'false') {
        for (let i = 0; i < containers.length; i += 1) {
          const container = containers[i];
          if (container.isEmpty) {
            container.element.appendChildren(target);
            container.isEmpty = false;
            break;
          }
        }
        if (containers.every((container) => !container.isEmpty)) {
          callback();
        }
        this.currentPosition.word += 1;
      } else {
        for (let i = 0; i < containers.length; i += 1) {
          const container = this.wordSequence.getContainers()[i];
          if (!container?.hasChild(target)) {
            break;
          }
        }
      }
    }
  }

  handleDrop(e: DragEvent) {
    if (e) {
      e.preventDefault();
      const { target } = e;
      if (target instanceof HTMLElement) {
        if (this.draggedElem instanceof HTMLElement) {
          if (
            !this.wordSequence.getContainers().find(
              (container) => container.getElement() === target,
            )
          ) {
            target.appendChild(this.draggedElem);
            this.draggedElem = null;
          }
        }
      }
    }
  }

  handleDragStart(elem: EventTarget) {
    this.draggedElem = elem;
  }

  private render() {
    this.canvas.getLineByIndex(this.currentPosition.line).addBlockContainer(
      this.wordBlocks.length,
      (e) => this.handleDrop.bind(this)(e),
    );
    this.appendChildren(this.textTranslate, this.canvas, this.wordSequence);
  }

  getLine() {
    return this.canvas.getLineByIndex(this.currentPosition.line);
  }

  complete() {
    this.wordBlocks.forEach((block) => {
      const { order, element } = block;
      this.canvas.getLineByIndex(this.currentPosition.line)
        .getContainers()[order].element.appendChildren(element);
    });
  }

  update(callback: () => void) {
    const {
      textExample,
      textExampleTranslate,
      audioExample,
    } = this.words[this.currentPosition.line];
    this.textTranslate.setTextContent(textExampleTranslate);

    this.wordBlocks = textExample.split(' ').map((word, index) => ({
      order: index,
      element: new Word(
        word,
        index,
        (e) => this.handleClick.bind(this)(e, callback),
        (e) => this.handleDragStart.bind(this)(e.target!),
      ),
    }));
    this.wordBlocks.forEach((block) => {
      const { element, order } = block;
      element.setBackground(
        order,
        this.currentPosition.line,
        this.wordBlocks.length,
        this.words.length,
        this.levelData.imageSrc,
      );
    });
    this.wordSequence.update(
      randomizeWords(this.wordBlocks),
      this.handleDrop.bind(this),
    );
    this.canvas.getLineByIndex(this.currentPosition.line)
      .addBlockContainer(this.wordBlocks.length, this.handleDrop.bind(this));
    this.audio = new Audio(`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioExample}`);
  }

  hideBackground() {
    this.wordBlocks.forEach((block) => {
      block.element.setInvisibleBackground();
    });
  }

  playExample() {
    if (this.audio.src) {
      if (this.audio.paused) {
        this.audio.play();
      }
    }
  }

  translate() {
    this.textTranslate.translate();
  }
}
