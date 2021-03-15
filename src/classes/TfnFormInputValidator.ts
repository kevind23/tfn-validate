import { FormInputValidator } from '../components/formInput/FormInput';

export class TfnFormInputValidator implements FormInputValidator<string> {
  public getErrorsFor(value: string): string {
    if (value.match(/[^0-9]/)) {
      return "Please enter only numbers.";
    }
    if (value.length < 8 || value.length > 9) {
      return "Please enter 8 or 9 numbers.";
    }
    return "";
  }
}
