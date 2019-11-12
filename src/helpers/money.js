import { validateIsExponential, validateIsInteger } from './validation';
import {
  getNumberLength,
  formatExponential,
  formatMoney,
  splitUnitsDecimals
} from './number';
import { normalizeDecimalCharacter, insertDecimalCharacter } from './string';

class MoneyHelper {
  convert(baseAmount, baseRate, targetCurrencyRate) {
    const integerBaseAmount = this.transformToIntegerModel(
      normalizeDecimalCharacter(baseAmount)
    );
    const integerBaseRate = this.transformToIntegerModel(baseRate);
    const integerTargetCurrencyRate = this.transformToIntegerModel(
      targetCurrencyRate
    );

    const amount =
      integerBaseAmount.amount *
      integerBaseRate.amount *
      integerTargetCurrencyRate.amount;

    if (validateIsExponential(amount)) {
      const exponentialNumber = this.transformToExponentialModel(amount);
      const { decimalPrecision } = exponentialNumber;

      const floatNumber = insertDecimalCharacter(
        exponentialNumber.amount,
        decimalPrecision
      );

      const formated = formatExponential(
        floatNumber,
        exponentialNumber.exponent,
        '.'
      );
      return {
        exponentialNumber,
        formated
      };
    }

    const decimalPrecision =
      integerBaseRate.decimalPrecision +
      integerBaseAmount.decimalPrecision +
      integerTargetCurrencyRate.decimalPrecision;

    const unitPrecision = getNumberLength(amount) - decimalPrecision;

    const precision = unitPrecision + decimalPrecision;

    const floatNumber = insertDecimalCharacter(amount, decimalPrecision);
    const formated = formatMoney(floatNumber, '.');

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
    if (validateIsInteger(number)) {
      return {
        amount: number,
        decimalPrecision: 0,
        precision: 1
      };
    }

    const [units, decimals] = splitUnitsDecimals(number);
    const amount = parseInt(`${units}${decimals}`);

    const unitPrecision = getNumberLength(units);
    const decimalPrecision = getNumberLength(decimals);
    const precision = unitPrecision + decimalPrecision;

    return {
      amount,
      decimalPrecision,
      precision,
      unitPrecision
    };
  }

  transformToExponentialModel(exponentialNumber) {
    const stringExponentialNumber = exponentialNumber.toString();
    const isDecimalRepresentation = stringExponentialNumber.includes('-');
    const exponentialSign = isDecimalRepresentation ? 'e-' : 'e+';

    const [number, stringExponent] = stringExponentialNumber.split(
      exponentialSign
    );
    const exponent = parseInt(stringExponent);
    const integerModel = this.transformToIntegerModel(number);

    return {
      ...integerModel,
      exponent
    };
  }
}

export default new MoneyHelper();
