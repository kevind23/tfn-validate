import { TfnFormatter } from './TfnFormatter';

test("formats 8 digit number", () => {
  const input = 12345678;
  const expected = "12 345 678";
  const formatter = new TfnFormatter();
  expect(formatter.formatTaxFileNumber(input)).toBe(expected);
});

test("formats 9 digit number", () => {
  const input = 123456789;
  const expected = "123 456 789";
  const formatter = new TfnFormatter();
  expect(formatter.formatTaxFileNumber(input)).toBe(expected);
});
