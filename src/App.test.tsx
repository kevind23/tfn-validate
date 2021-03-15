import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header and form", () => {
  render(<App />);
  const text = screen.getByText("Check a TFN");
  expect(text).toBeInTheDocument();
  const tfnInput = screen.getByPlaceholderText(/Enter a TFN/);
  expect(tfnInput).toBeInTheDocument();
  const submitButton = screen.getByRole("button", { name: "Validate" });
  expect(submitButton).toBeInTheDocument();
});
