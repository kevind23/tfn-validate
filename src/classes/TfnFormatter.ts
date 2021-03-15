export class TfnFormatter {
  public formatTaxFileNumber(taxFileNumber: number): string {
    const tfnString = taxFileNumber.toString();
    if (tfnString.length === 8) {
      return [
        tfnString.substring(0, 2),
        tfnString.substring(2, 5),
        tfnString.substring(5),
      ].join(" ");
    }
    if (tfnString.length === 9) {
      return [
        tfnString.substring(0, 3),
        tfnString.substring(3, 6),
        tfnString.substring(6),
      ].join(" ");
    }
    return tfnString;
  }
}
