import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

test("renders with loading text", () => {
  render(<LoadingSpinner />);
  const text = screen.getByText("Loading...");
  expect(text).toBeInTheDocument();
});
