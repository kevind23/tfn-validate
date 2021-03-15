import { fireEvent, render, screen } from '@testing-library/react';
import { TfnValidationServiceContext } from '../../context';
import { ValidatorApp } from './ValidatorApp';

test("Renders validation form", () => {
  render(<ValidatorApp />);
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  expect(tfnInput).toBeInTheDocument();
  const submitButton = screen.getByRole("button", { name: "Validate" });
  expect(submitButton).toBeInTheDocument();
});

const getMockTfnValidationServiceValid = (expectedTfn: number) => ({
  isTaxFileNumberValid: (taxFileNumber: number): Promise<boolean> => {
    expect(taxFileNumber).toBe(expectedTfn);
    return Promise.resolve(true);
  },
});

const getMockTfnValidationServiceInvalid = (expectedTfn: number) => ({
  isTaxFileNumberValid: (taxFileNumber: number): Promise<boolean> => {
    expect(taxFileNumber).toBe(expectedTfn);
    return Promise.resolve(false);
  },
});

const getMockTfnValidationServiceError = (errorMessage: string) => ({
  isTaxFileNumberValid: (): Promise<boolean> => {
    return Promise.reject(errorMessage);
  },
});

test("Displays loading text when loading", () => {
  const testTfn = 12345678;
  render(
    <TfnValidationServiceContext.Provider
      value={getMockTfnValidationServiceValid(testTfn)}
    >
      <ValidatorApp />
    </TfnValidationServiceContext.Provider>
  );
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: testTfn } });
  setTimeout(() => {
    const submitButton = screen.getByRole("button", { name: "Validate" });
    fireEvent.click(submitButton);
    const loadingButton = screen.getByRole("button", { name: "Loading..." });
    expect(loadingButton).toBeInTheDocument();
  });
});

test("Loads TFN validity from service (valid case)", async () => {
  const testTfn = 12345678;
  render(
    <TfnValidationServiceContext.Provider
      value={getMockTfnValidationServiceValid(testTfn)}
    >
      <ValidatorApp />
    </TfnValidationServiceContext.Provider>
  );
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: testTfn } });
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const submitButton = screen.getByRole("button", { name: "Validate" });
      fireEvent.click(submitButton);
      resolve();
    });
  });
  const results = await screen.findByText("Result");
  expect(results).toBeInTheDocument();
  const successText = screen.getByText("is valid", { exact: false });
  expect(successText).toBeInTheDocument();
});

test("Loads TFN validity from service (invalid case)", async () => {
  const testTfn = 12345678;
  render(
    <TfnValidationServiceContext.Provider
      value={getMockTfnValidationServiceInvalid(testTfn)}
    >
      <ValidatorApp />
    </TfnValidationServiceContext.Provider>
  );
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: testTfn } });
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const submitButton = screen.getByRole("button", { name: "Validate" });
      fireEvent.click(submitButton);
      resolve();
    });
  });
  const results = await screen.findByText("Result");
  expect(results).toBeInTheDocument();
  const successText = screen.getByText("is invalid", { exact: false });
  expect(successText).toBeInTheDocument();
});

test("Formats TFN in output", async () => {
  const testTfn = 12345678;
  render(
    <TfnValidationServiceContext.Provider
      value={getMockTfnValidationServiceValid(testTfn)}
    >
      <ValidatorApp />
    </TfnValidationServiceContext.Provider>
  );
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: testTfn } });
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const submitButton = screen.getByRole("button", { name: "Validate" });
      fireEvent.click(submitButton);
      resolve();
    });
  });
  const formattedTfn = await screen.findByText("12 345 678");
  expect(formattedTfn).toBeInTheDocument();
});

test("Clears result when loading again", async () => {
  const testTfn = 12345678;
  render(
    <TfnValidationServiceContext.Provider
      value={getMockTfnValidationServiceValid(testTfn)}
    >
      <ValidatorApp />
    </TfnValidationServiceContext.Provider>
  );
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: testTfn } });
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const submitButton = screen.getByRole("button", { name: "Validate" });
      fireEvent.click(submitButton);
      resolve();
    });
  });
  await screen.findByText("Result");
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const submitButton = screen.getByRole("button", { name: "Validate" });
      fireEvent.click(submitButton);
      const results = screen.queryByText("Result");
      expect(results).toBeNull();
      resolve();
    });
  });
});

test("Handles errors", async () => {
  const testTfn = 12345678;
  render(
    <TfnValidationServiceContext.Provider
      value={getMockTfnValidationServiceError("some error message")}
    >
      <ValidatorApp />
    </TfnValidationServiceContext.Provider>
  );
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: testTfn } });
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const submitButton = screen.getByRole("button", { name: "Validate" });
      fireEvent.click(submitButton);
      resolve();
    });
  });
  const results = await screen.findByText("Result");
  expect(results).toBeInTheDocument();
  const errorText = screen.getByText("some error message", { exact: false });
  expect(errorText).toBeInTheDocument();
});
