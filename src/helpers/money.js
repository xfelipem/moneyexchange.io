import appConfiguration from '../configuration';
import { reverseString } from '.';

const { DECIMAL_PRECISION } = appConfiguration.exchange;

const validateIsInteger = number => Number.isInteger(parseFloat(number));

class MoneyHelper {
  convert(baseAmount, baseRate, targetCurrencyRate) {
    const integerBaseAmount = this.transformToIntegerModel(baseAmount);
    const integerBaseRate = this.transformToIntegerModel(baseRate);
    const integerTargetCurrencyRate = this.transformToIntegerModel(
      targetCurrencyRate
    );

    const amount =
      integerBaseAmount.amount *
      integerBaseRate.amount *
      integerTargetCurrencyRate.amount;

    const decimalPrecision =
      integerBaseRate.decimalPrecision +
      integerBaseAmount.decimalPrecision +
      integerTargetCurrencyRate.decimalPrecision;

    const unitPrecision = `${amount}`.length - decimalPrecision;

    const precision = unitPrecision + decimalPrecision;

    const floatNumber = this.transformToFloat(amount, decimalPrecision);
    const formated = this.formatMoney(floatNumber, '$', '.');

    return {
      amount,
      decimalPrecision,
      floatNumber,
      formated,
      precision,
      unitPrecision
    };
  }

  transformToIntegerModel(number) {
    const isInteger = validateIsInteger(number);

    if (isInteger) {
      return {
        amount: number,
        decimalPrecision: 0,
        precision: 1
      };
    }

    const normalizeDecimalCharacter = `${number}`.replace(',', '.');
    const [units, decimals] = normalizeDecimalCharacter.split('.');

    const amount = parseInt(`${units}${decimals}`);

    const unitPrecision = units.length;
    const decimalPrecision = decimals.length;
    const precision = unitPrecision + decimalPrecision;

    return {
      amount,
      decimalPrecision,
      precision,
      unitPrecision
    };
  }

  transformToFloat(amount, decimalPrecision) {
    const reversed = reverseString(`${amount}`);
    const floatNumber = parseFloat(
      reverseString(
        reversed.slice(0, decimalPrecision) +
          '.' +
          reversed.slice(decimalPrecision)
      )
    );

    return floatNumber;
  }

  formatMoney(number, currencyCharacter, decimalCharacter) {
    const isInteger = validateIsInteger(number);

    if (isInteger) {
      return `${currencyCharacter}${number}`;
    }
    const floatNumber = parseFloat(number);

    const roundDecimals = (
      Math.round(floatNumber * Math.pow(10, DECIMAL_PRECISION)) /
      Math.pow(10, DECIMAL_PRECISION)
    ).toFixed(DECIMAL_PRECISION);

    const [units, decimals] = roundDecimals.toString().split('.');
    const normalizedDecimals = decimals.replace(/0+$/, '');

    return `${currencyCharacter}${units}${decimalCharacter}${normalizedDecimals}`;
  }

  transformToExponentialModel(exponentialNumber) {
    // sanity check - is it exponential number
    const str = exponentialNumber.toString();
    if (str.indexOf('e') !== -1) {
      const isDecimalRepresentation = str.includes('-');

      if (isDecimalRepresentation) {
        const exponent = parseInt(str.split('-')[1], 10);
        const amount = exponentialNumber.toFixed(exponent);

        return {
          exponent: 1,
          amount
        };
      }

      const [number, stringExponent] = str.split('e+');
      const exponent = parseInt(stringExponent);
      const integerModel = this.transformToIntegerModel(number);

      return {
        amount: integerModel.amount,
        exponent: exponent - integerModel.decimalPrecision
      };
    }

    return {
      amount: exponentialNumber,
      exponent: 1
    };
  }
}

const MoneyHelperSingleton = new MoneyHelper();

export default MoneyHelperSingleton;
