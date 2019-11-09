import { Responsive } from 'semantic-ui-react';

export const transformDecimalsToInteger = stringCurrency => {
  return {
    integerValue: stringCurrency,
  };
};

export const validateDaysAreSame = (oldDate, newDate) => {
  return (
    oldDate.getFullYear() === newDate.getFullYear() &&
    oldDate.getMonth() === newDate.getMonth() &&
    oldDate.getDate() === newDate.getDate()
  );
};

export const validateNumericWithDecimals = (stringNumber, decimalCharacter) => {
  const expression = '^\\d*\\' + decimalCharacter + '?\\d*$';
  const isNumericWithDecimalsRegExp = new RegExp(expression);
  const isValid = isNumericWithDecimalsRegExp.test(stringNumber);

  return isValid;
};
export const validateDecimalQuantity = (
  stringNumber,
  decimalCharacter,
  limit = 4
) => {
  const reversedDecimalIndex = getReversedDecimalIndex(
    stringNumber,
    decimalCharacter
  );
  const isBetweenLimits =
    reversedDecimalIndex >= -1 && reversedDecimalIndex < limit + 1;

  return isBetweenLimits;
};
export const getReversedDecimalIndex = (stringNumber, decimalCharacter) =>
  getDecimalIndex(reverseString(stringNumber), decimalCharacter);

export const getDecimalIndex = (stringNumber, decimalCharacter) =>
  stringNumber.indexOf(decimalCharacter);

export const reverseString = string =>
  `${string}`
    .split('')
    .reverse()
    .join('');

export const limitDecimalQuantity = (stringNumber, decimalIndex, limit = 4) => {
  return (
    stringNumber.substr(0, decimalIndex) +
    stringNumber.substr(decimalIndex, limit + 1)
  );
};

export const validateMinuteDifference = (
  maxMinuts,
  timestamp,
  newTimestamp
) => {
  if (!timestamp) {
    return false;
  }

  const newDate = newTimestamp ? new Date(newTimestamp * 1000) : new Date();
  const oldDate = new Date(timestamp * 1000);
  const isSameDate = validateDaysAreSame(newDate, oldDate);

  if (!isSameDate) {
    return false;
  }

  const dateDiff = newDate - oldDate;
  const difference = Math.round(((dateDiff % 86400000) % 3600000) / 60000);

  return difference >= maxMinuts;
};

export const getWidth = () => {
  return Responsive.onlyTablet.minWidth;
};

export default {
  limitDecimalQuantity,
  validateMinuteDifference,
  getWidth,
  validateDecimalQuantity,
  validateNumericWithDecimals,
};
