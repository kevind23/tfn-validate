import { fireEvent, render, screen } from '@testing-library/react';
import { ValidationForm, ValidationFormOutput } from './ValidationForm';

test("renders with TFN input box", () => {
  render(<ValidationForm />);
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  expect(tfnInput).toBeInTheDocument();
  const submitButton = screen.getByRole("button", { name: "Validate" });
  expect(submitButton).toBeInTheDocument();
});

test("submits when not loading and when a valid number was entered", (done) => {
  const testTfn = 12345678;
  const onSubmit = (form: ValidationFormOutput) => {
    expect(form.taxFileNumber).toBe(testTfn);
    done();
  };
  render(<ValidationForm onSubmit={onSubmit}></ValidationForm>);
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: testTfn } });
  setTimeout(() => {
    const submitButton = screen.getByRole("button", { name: "Validate" });
    fireEvent.click(submitButton);
  });
});

test("disables submission when empty", () => {
  render(<ValidationForm></ValidationForm>);
  const submitButton = screen.getByRole("button", {
    name: "Validate",
  }) as HTMLButtonElement;
  expect(submitButton.disabled).toBeTruthy();
});

test("disables submission when invalid number entered", (done) => {
  render(<ValidationForm></ValidationForm>);
  const submitButton = screen.getByRole("button", {
    name: "Validate",
  }) as HTMLButtonElement;
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: "asdf" } });
  setTimeout(() => {
    expect(submitButton.disabled).toBeTruthy();
    done();
  });
});

test("shows spinner when loading", () => {
  render(<ValidationForm isLoading={true}></ValidationForm>);
  const submitButton = screen.getByRole("button", {
    name: "Loading...",
  }) as HTMLButtonElement;
  expect(submitButton).toBeInTheDocument();
});

test("disables submission when loading", (done) => {
  render(<ValidationForm isLoading={true}></ValidationForm>);
  const submitButton = screen.getByRole("button", {
    name: "Loading...",
  }) as HTMLButtonElement;
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  fireEvent.change(tfnInput, { target: { value: "12345678" } });
  setTimeout(() => {
    expect(submitButton.disabled).toBeTruthy();
    done();
  });
});
