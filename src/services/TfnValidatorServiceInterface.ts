export interface TfnValidatorServiceInterface {
  isTaxFileNumberValid(taxFileNumber: number): Promise<boolean>;
}
