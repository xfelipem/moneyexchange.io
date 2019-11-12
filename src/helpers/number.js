import appConfiguration from '../configuration';
import { reverseString } from './string';
import { validateIsInteger } from './validation';

const { DECIMAL_PRECISION } = appConfiguration.exchange;

export const getBackwardDecimalPosition = (stringNumber, decimalCharacter) =>
  reverseString(stringNumber).indexOf(decimalCharacter);

export const getNumberLength = number => `${number}`.length;

export const formatExponential = (number, exponent, decimalCharacter) => {
  const rounded = roundDecimals(number);

  const [units, decimals] = splitUnitsDecimals(rounded);
  const normalizedDecimals = decimals.replace(/0+$/, '');

  return `${units}${decimalCharacter}${normalizedDecimals} x 10^${exponent}`;
};

export const formatMoney = (number, decimalCharacter) => {
  if (!decimalCharacter && validateIsInteger(number)) {
    return `${number}`;
  }

  const floatNumber = parseFloat(number);
  const rounded = roundDecimals(floatNumber);

  const [units, decimals] = splitUnitsDecimals(rounded);
  const normalizedDecimals = decimals.replace(/0+$/, '');

  return `${units}${decimalCharacter}${normalizedDecimals}`;
};

export const limitDecimalQuantity = (stringNumber, decimalIndex, limit = 4) => {
  return (
    stringNumber.substr(0, decimalIndex) +
    stringNumber.substr(decimalIndex, limit + 1)
  );
};

export const roundDecimals = (
  floatNumber,
  decimalPrecision = DECIMAL_PRECISION
) =>
  (
    Math.round(floatNumber * Math.pow(10, decimalPrecision)) /
    Math.pow(10, decimalPrecision)
  ).toFixed(decimalPrecision);

export const splitUnitsDecimals = number => number.toString().split('.');
