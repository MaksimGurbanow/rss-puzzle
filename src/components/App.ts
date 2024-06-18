import { Round } from '../types/round';
import fetchWords from '../utils/fetchWords';
import GameMenu from './gameMenu/GameMenu';
import Form from './loginForm/form/Form';
import StartScreen from './startScreen/StartScreen';
import styles from './App.module.scss';

export default class App {
  private form: Form;

  private startScreen: StartScreen;

  private gameMenu: GameMenu;

  private started: boolean;

  private firstNameValue: string;

  private surnameValue: string;

  private currentRound: Round;

  constructor() {
    this.firstNameValue = localStorage.getItem('firstName') || '';
    this.surnameValue = localStorage.getItem('surname') || '';
    this.started = false;
    this.currentRound = fetchWords()!;
    this.form = new Form(this.firstNameValue, this.surnameValue, this.login.bind(this));
    this.startScreen = new StartScreen(
      this.firstNameValue,
      this.surnameValue,
      this.logout.bind(this),
      this.startGame.bind(this),
    );
    this.gameMenu = new GameMenu(this.currentRound);
  }

  private login() {
    this.firstNameValue = localStorage.getItem('firstName') || '';
    this.surnameValue = localStorage.getItem('surname') || '';
    this.render();
  }

  private logout() {
    localStorage.setItem('firstName', '');
    localStorage.setItem('surname', '');
    this.firstNameValue = '';
    this.surnameValue = '';
    this.render();
  }

  private startGame() {
    this.started = !this.started;
    this.render();
  }

  render() {
    const rootElement = document.getElementById('root');
    rootElement?.classList.add(styles.root);

    if (rootElement) {
      rootElement.innerHTML = '';
      if (this.started) {
        rootElement.appendChild(this.gameMenu.getElement()!);
      } else if (this.firstNameValue && this.surnameValue) {
        rootElement.appendChild(this.startScreen.getElement()!);
      } else {
        this.form = new Form(this.firstNameValue, this.surnameValue, this.login.bind(this));
        rootElement.appendChild(this.form.getElement()!);
      }
    }
  }
}
