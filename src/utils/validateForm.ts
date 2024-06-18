const validateForm = (firstName: string, surname: string) => {
  const errors = { firstName, surname };

  const validPattern = /^[A-Za-z-]+$/;
  const upperCasePattern = /^[A-Z]/;

  const errorMessages = {
    invalidChars: 'Only English alphabet letters and hyphens are allowed.',
    upperCaseFirst: 'The first letter must be in uppercase.',
    minLengthFirstName: 'First name must be at least 3 characters long.',
    minLengthSurname: 'Surname must be at least 4 characters long.',
  };

  if (!validPattern.test(firstName)) {
    errors.firstName = errorMessages.invalidChars;
  } else if (!upperCasePattern.test(firstName)) {
    errors.firstName = errorMessages.upperCaseFirst;
  } else if (firstName.length < 3) {
    errors.firstName = errorMessages.minLengthFirstName;
  } else {
    errors.firstName = '';
  }

  if (!validPattern.test(surname)) {
    errors.surname = errorMessages.invalidChars;
  } else if (!upperCasePattern.test(surname)) {
    errors.surname = errorMessages.upperCaseFirst;
  } else if (surname.length < 4) {
    errors.surname = errorMessages.minLengthSurname;
  } else {
    errors.surname = '';
  }

  return errors;
};

export default validateForm;
