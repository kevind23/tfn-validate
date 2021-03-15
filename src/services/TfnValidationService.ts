import { TfnValidatorServiceInterface } from './TfnValidatorServiceInterface';

export type ResultDTO = {
  result: boolean;
  error: string;
};

export class TfnValidationService implements TfnValidatorServiceInterface {
  constructor(private readonly apiUrl: string) {}

  public async isTaxFileNumberValid(taxFileNumber: number): Promise<boolean> {
    const data = await this.validateOnServer(taxFileNumber);
    if (data.error) {
      return Promise.reject(data.error);
    }
    return data.result;
  }

  private async validateOnServer(taxFileNumber: number): Promise<ResultDTO> {
    try {
      const requestUrl = this.buildRequestUrlFor(taxFileNumber);
      const result = await fetch(requestUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result.json();
    } catch (error) {
      return Promise.reject("Could not load results from the server.");
    }
  }

  private buildRequestUrlFor(taxFileNumber: number): string {
    return this.apiUrl + "/" + +encodeURIComponent(taxFileNumber);
  }
}
