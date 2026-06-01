
export function isValidSymbol(symbol: any): boolean {
  if (symbol == null) {
    return false;
  }

  const symbolStr = String(symbol).trim();

  if (
    !symbolStr ||
    symbolStr === 'undefined' ||
    symbolStr === 'null' ||
    symbolStr === 'NaN'
  ) {
    return false;
  }

  return true;
}

export function validateSymbol(symbol: any): void {
  if (!isValidSymbol(symbol)) {
    throw new Error('Symbol query parameter is required and must be valid');
  }
}
