import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { TfnFormatter } from '../../classes/TfnFormatter';
import { TfnValidationServiceContext } from '../../context';
import { ValidationForm, ValidationFormOutput } from '../validationForm/ValidationForm';

type ValidatorProps = {};
type ValidatorState = {
  isLoading: boolean;
  result?: ReactNode;
};

export class ValidatorApp extends React.Component<
  ValidatorProps,
  ValidatorState
> {
  public static contextType = TfnValidationServiceContext;
  public context!: React.ContextType<typeof TfnValidationServiceContext>;
  private tfnFormatter: TfnFormatter = new TfnFormatter();

  constructor(props: ValidatorProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  public render(): ReactNode {
    return (
      <Container>
        <ValidationForm
          onSubmit={(form: ValidationFormOutput) => this.onSubmit(form)}
          isLoading={this.state.isLoading}
        ></ValidationForm>
        <br />
        {this.state.result && (
          <>
            <h4>Result</h4>
            {this.state.result}
          </>
        )}
      </Container>
    );
  }

  private onSubmit(form: ValidationFormOutput): Promise<void> {
    return this.wrapWithLoading(this.loadTfnValidity(form.taxFileNumber));
  }

  private async wrapWithLoading<T>(promise: Promise<T>): Promise<T> {
    this.setState({ isLoading: true });
    const result = await promise;
    this.setState({ isLoading: false });
    return result;
  }

  private async loadTfnValidity(taxFileNumber: number): Promise<void> {
    this.clearResult();
    try {
      const isValid = await this.isTfnValid(taxFileNumber);
      if (isValid) {
        this.setValidResultFor(taxFileNumber);
      } else {
        this.setInvalidResultFor(taxFileNumber);
      }
    } catch (error) {
      this.setError(error);
    }
  }

  private clearResult(): void {
    this.setState({ result: null });
  }

  private isTfnValid(taxFileNumber: number): Promise<boolean> {
    return this.context.isTaxFileNumberValid(taxFileNumber);
  }

  private setValidResultFor(taxFileNumber: number): void {
    const formattedTaxFileNumber = this.formatTaxFileNumber(taxFileNumber);
    this.setState({
      result: (
        <p className="text-success">
          TFN <b>{formattedTaxFileNumber}</b> is valid!
        </p>
      ),
    });
  }

  private formatTaxFileNumber(taxFileNumber: number): string {
    return this.tfnFormatter.formatTaxFileNumber(taxFileNumber);
  }

  private setInvalidResultFor(taxFileNumber: number): void {
    const formattedTaxFileNumber = this.formatTaxFileNumber(taxFileNumber);
    this.setState({
      result: (
        <p className="text-danger">
          TFN <b>{formattedTaxFileNumber}</b> is invalid.
        </p>
      ),
    });
  }

  private setError(error: unknown): void {
    this.setState({
      result: (
        <p className="text-danger">
          <b>Error:</b> {String(error)}
        </p>
      ),
    });
  }
}
