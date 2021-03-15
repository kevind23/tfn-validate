import React, { FormEvent, ReactNode } from 'react';
import { Button, Form } from 'react-bootstrap';
import { TfnFormInputValidator } from '../../classes/TfnFormInputValidator';
import { FormInput } from '../formInput/FormInput';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';

type ValidationFormProps = {
  onSubmit?: (form: ValidationFormOutput) => void;
  isLoading?: boolean;
};

export type ValidationFormOutput = {
  taxFileNumber: number;
};

type ValidationFormState = {
  isValid: boolean;
  taxFileNumber?: number;
};

export class ValidationForm extends React.Component<
  ValidationFormProps,
  ValidationFormState
> {
  constructor(props: ValidationFormProps) {
    super(props);
    this.state = {
      isValid: false,
    };
  }

  public render(): ReactNode {
    return (
      <Form
        onSubmit={(event: FormEvent<HTMLFormElement>) => this.submit(event)}
      >
        <Form.Group>
          <Form.Label>Tax File Number</Form.Label>
          <FormInput
            placeholder="Enter a TFN (8 or 9 numbers)"
            onChange={(newValue: string) => this.setTaxFileNumber(newValue)}
            onIsValidChange={(newValue: boolean) => this.setIsValid(newValue)}
            validator={new TfnFormInputValidator()}
          ></FormInput>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={this.shouldDisableSubmit}
        >
          {this.props.isLoading ? <LoadingSpinner /> : "Validate"}
        </Button>
      </Form>
    );
  }

  private setTaxFileNumber(taxFileNumber: string): void {
    this.setState({ taxFileNumber: parseInt(taxFileNumber) });
  }

  private setIsValid(isValid: boolean): void {
    this.setState({ isValid });
  }

  private get shouldDisableSubmit(): boolean {
    return !this.state.isValid || !!this.props.isLoading;
  }

  private submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.shouldDisableSubmit) {
      return;
    }
    if (this.props.onSubmit) {
      this.props.onSubmit({
        taxFileNumber: this.state.taxFileNumber as number,
      });
    }
  }
}
