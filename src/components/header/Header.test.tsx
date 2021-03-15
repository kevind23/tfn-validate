import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test("renders header", () => {
  render(<Header />);
  const text = screen.getByText("Check a TFN");
  expect(text).toBeInTheDocument();
});
