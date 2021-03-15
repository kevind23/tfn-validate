import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';

type FormInputProps = {
  placeholder?: string;
  validator?: FormInputValidator<string>;
  onChange?: (newValue: string) => void;
  onIsValidChange?: (isValid: boolean) => void;
};

type FormInputState = {
  validationError: string;
};

export interface FormInputValidator<T> {
  getErrorsFor(value: T): string;
}

export class FormInput extends React.Component<FormInputProps, FormInputState> {
  constructor(props: FormInputProps) {
    super(props);
    this.state = {
      validationError: "",
    };
  }

  public render(): ReactNode {
    return (
      <>
        <Form.Control
          type="text"
          placeholder={this.props.placeholder}
          onChange={(event: any) => this.onChange(event)}
          isInvalid={!!this.state.validationError}
        />
        <Form.Control.Feedback type="invalid">
          {this.state.validationError}
        </Form.Control.Feedback>
      </>
    );
  }

  private async onChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const newValue = event.target.value;
    const isValid = await this.validate(newValue);
    if (isValid) {
      this.propagateOnChangeEvent(newValue);
    }
  }

  private propagateOnChangeEvent(newValue: string): void {
    this.props.onChange && this.props.onChange(newValue);
  }

  private validate(value: string): Promise<boolean> {
    return new Promise((resolve) =>
      this.setState(
        () => ({ validationError: this.getValidationErrorFor(value) }),
        () => {
          const isValid = !this.state.validationError;
          this.propagateOnIsValidChangeEvent(isValid);
          resolve(isValid);
        }
      )
    );
  }

  private getValidationErrorFor(input: string): string {
    if (this.props.validator) {
      return this.props.validator.getErrorsFor(input);
    }
    return "";
  }

  private propagateOnIsValidChangeEvent(newValue: boolean): void {
    this.props.onIsValidChange && this.props.onIsValidChange(newValue);
  }
}
