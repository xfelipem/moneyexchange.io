import { getBackwardDecimalPosition } from './number';

export const validateAreSameDay = (oldDate, newDate) => {
  return (
    oldDate.getFullYear() === newDate.getFullYear() &&
    oldDate.getMonth() === newDate.getMonth() &&
    oldDate.getDate() === newDate.getDate()
  );
};
export const validateDecimalQuantity = (
  stringNumber,
  decimalCharacter,
  limit = 4
) => {
  const position = getBackwardDecimalPosition(stringNumber, decimalCharacter);
  const isBetweenLimits = position >= -1 && position < limit + 1;

  return isBetweenLimits;
};
export const validateIsExponential = number =>
  number.toString().indexOf('e') !== -1;
export const validateIsInteger = number =>
  !Number.isNaN(number) && Number.isInteger(parseFloat(number));
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
  const isSameDate = validateAreSameDay(newDate, oldDate);

  if (!isSameDate) {
    return false;
  }

  const dateDiff = newDate - oldDate;
  const difference = Math.round(((dateDiff % 86400000) % 3600000) / 60000);

  return difference >= maxMinuts;
};
export const validateNumericWithDecimals = (stringNumber, decimalCharacter) => {
  const expression = '^\\d*\\' + decimalCharacter + '?\\d*$';
  const isNumericWithDecimalsRegExp = new RegExp(expression);
  const isValid = isNumericWithDecimalsRegExp.test(stringNumber);

  return isValid;
};
