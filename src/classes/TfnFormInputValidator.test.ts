import { TfnFormInputValidator } from './TfnFormInputValidator';

let validator: TfnFormInputValidator;
beforeEach(() => {
  validator = new TfnFormInputValidator();
});
test("Entered a space, returns error", () => {
  expect(validator.getErrorsFor(" ")).toBe("Please enter only numbers.");
});
test("Entered a letter, returns error", () => {
  expect(validator.getErrorsFor("a")).toBe("Please enter only numbers.");
});
test("Entered 7 digits, returns error", () => {
  expect(validator.getErrorsFor("1234567")).toBe(
    "Please enter 8 or 9 numbers."
  );
});
test("Entered 10 digits, returns error", () => {
  expect(validator.getErrorsFor("1234567890")).toBe(
    "Please enter 8 or 9 numbers."
  );
});
test("Entered 8 digits, returns no error", () => {
  expect(validator.getErrorsFor("12345678")).toBe("");
});
test("Entered 9 digits, returns no error", () => {
  expect(validator.getErrorsFor("123456789")).toBe("");
});
