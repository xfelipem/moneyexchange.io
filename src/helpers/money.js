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
      const { decimalExponent } = exponentialNumber;

      const floatNumber = insertDecimalCharacter(
        exponentialNumber.amount,
        decimalExponent
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

    const decimalExponent =
      integerBaseRate.decimalExponent +
      integerBaseAmount.decimalExponent +
      integerTargetCurrencyRate.decimalExponent;

    const unitExponent = getNumberLength(amount) - decimalExponent;

    const exponent = unitExponent + decimalExponent;

    const floatNumber = insertDecimalCharacter(amount, decimalExponent);
    const formated = formatMoney(floatNumber, '.');

    return {
      amount,
      decimalExponent,
      floatNumber,
      formated,
      exponent,
      unitExponent
    };
  }

  transformToIntegerModel(number) {
    if (validateIsInteger(number)) {
      return {
        amount: number,
        decimalExponent: 0,
        exponent: 1
      };
    }

    const [units, decimals] = splitUnitsDecimals(number);
    const amount = parseInt(`${units}${decimals}`);

    const unitExponent = getNumberLength(units);
    const decimalExponent = getNumberLength(decimals);
    const exponent = unitExponent + decimalExponent;

    return {
      amount,
      decimalExponent,
      exponent,
      unitExponent
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

    return Object.assign({}, integerModel, { exponent });
  }
}

export default new MoneyHelper();
