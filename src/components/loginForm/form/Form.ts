import validateForm from '../../../utils/validateForm';
import BaseComponent from '../../BaseComponent';
import InputField from '../login/InputField';
import Button from '../submit/Button';
import classes from './Form.module.scss';

export default class Form extends BaseComponent<HTMLFormElement> {
  private firstName: string;

  private surname: string;

  private button: Button;

  private inputFields: {firstName: InputField, surname: InputField};

  constructor(firstNameValue: string, surnameValue: string, callback: () => void) {
    super({ classes: [classes.login__form], tag: 'form' });
    this.firstName = surnameValue;
    this.surname = firstNameValue;
    this.button = new Button((e) => this.handleSubmit(e, callback));
    this.inputFields = {
      firstName: new InputField('First Name', (e) => this.handleChange(e, 'firstName'), this.firstName),
      surname: new InputField('Surname', (e) => this.handleChange(e, 'surname'), this.surname),
    };
    this.button = new Button((e) => this.handleSubmit(e, callback));
    this.render();
  }

  private handleChange(event: Event, fieldName: 'firstName' | 'surname') {
    if (event.target instanceof HTMLInputElement) {
      this[fieldName] = event.target.value as string;
      const firstNameFilled = this.firstName.trim() !== '';
      const surnameFilled = this.surname.trim() !== '';
      const {
        firstName: firstNameError,
        surname: surnameErorr,
      } = validateForm(this.firstName, this.surname);
      this.inputFields.firstName.setErrorMessage(firstNameError);
      this.inputFields.surname.setErrorMessage(surnameErorr);

      if (firstNameFilled && surnameFilled) {
        this.button.setStatus(true);
      } else {
        this.button.setStatus(false);
      }
    }
  }

  private handleSubmit(event: Event, callback: () => void) {
    if (event.target instanceof HTMLButtonElement) {
      const {
        firstName: firstNameError,
        surname: surnameErorr,
      } = validateForm(this.firstName, this.surname);
      this.inputFields.firstName.setErrorMessage(firstNameError);
      this.inputFields.surname.setErrorMessage(surnameErorr);
      if (!firstNameError && !surnameErorr) {
        localStorage.setItem('firstName', this.firstName);
        localStorage.setItem('surname', this.surname);
        callback();
      }
    }
  }

  render() {
    this.appendChildren(...Object.values(this.inputFields), this.button);
  }
}
