import { fireEvent, render, screen } from '@testing-library/react';
import { FormInput, FormInputValidator } from './FormInput';

test("renders input element with placeholder value", () => {
  render(<FormInput placeholder="Placeholder Text" />);
  const inputElement = screen.getByPlaceholderText("Placeholder Text");
  expect(inputElement).toBeInTheDocument();
});

test("passes new value to parent when changed", (done) => {
  const expectedValue = "new value";
  const onChange = (value: string) => {
    expect(value).toBe(expectedValue);
    done();
  };
  render(<FormInput placeholder="Placeholder Text" onChange={onChange} />);
  const inputElement = screen.getByPlaceholderText(
    "Placeholder Text"
  ) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: expectedValue } });
});

test("validates when passed a validator (error case)", (done) => {
  const shouldErrorText = "shouldError";
  const errorText = "Some Error Text";
  const validator: FormInputValidator<string> = {
    getErrorsFor: (value: string): string => {
      return value === shouldErrorText ? errorText : "";
    },
  };
  const onIsValidChange = (isValid: boolean) => {
    expect(isValid).toBeFalsy();
    const validationMessage = screen.getByText(errorText);
    expect(validationMessage).toBeInTheDocument();
    done();
  };
  render(
    <FormInput
      placeholder="Placeholder Text"
      validator={validator}
      onIsValidChange={onIsValidChange}
    />
  );
  const inputElement = screen.getByPlaceholderText(
    "Placeholder Text"
  ) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: shouldErrorText } });
});

test("validates when passed a validator (success case)", (done) => {
  const shouldPassText = "shouldPass";
  const errorText = "Some Error Text";
  const validator: FormInputValidator<string> = {
    getErrorsFor: (value: string): string => {
      return value === shouldPassText ? "" : errorText;
    },
  };
  const onIsValidChange = (isValid: boolean) => {
    expect(isValid).toBeTruthy();
    const validationMessage = screen.queryByText(errorText);
    expect(validationMessage).toBeNull();
    done();
  };
  render(
    <FormInput
      placeholder="Placeholder Text"
      validator={validator}
      onIsValidChange={onIsValidChange}
    />
  );
  const inputElement = screen.getByPlaceholderText(
    "Placeholder Text"
  ) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: shouldPassText } });
});

test("only passes value to parent when validation passes", (done) => {
  const shouldPassText = "shouldPass";
  const shouldErrorText = "shouldError";
  const errorText = "Some Error Text";
  const validator: FormInputValidator<string> = {
    getErrorsFor: (value: string): string => {
      return value === shouldPassText ? "" : errorText;
    },
  };
  let inputElement: HTMLInputElement;
  const onChange = (value: string) => {
    expect(value).toBe(shouldPassText);
    done();
  };
  render(
    <FormInput
      placeholder="Placeholder Text"
      validator={validator}
      onChange={onChange}
    />
  );
  inputElement = screen.getByPlaceholderText(
    "Placeholder Text"
  ) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: shouldErrorText } });
  fireEvent.change(inputElement, { target: { value: shouldPassText } });
});
