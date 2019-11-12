export const insertDecimalCharacter = (
  amount,
  decimalPosition,
  decimalCharacter = '.'
) => {
  const reversed = reverseString(`${amount}`);
  const units = reversed.slice(0, decimalPosition);
  const decimals = reversed.slice(decimalPosition);
  const floatNumber = parseFloat(
    reverseString(`${units}${decimalCharacter}${decimals}`)
  );

  return floatNumber;
};

export const normalizeDecimalCharacter = number =>
  parseFloat(`${number}`.replace(',', '.'));

export const reverseString = string =>
  `${string}`
    .split('')
    .reverse()
    .join('');
