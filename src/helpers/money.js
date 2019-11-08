import appConfiguration from '../configuration';
import { reverseString } from '.';

const { DECIMAL_PRECISION } = appConfiguration.exchange;

class MoneyHelper {
  convert(baseAmount, baseRate, targetCurrencyRate) {
    const integerBaseAmount = this.transformToInteger(baseAmount);
    const integerBaseRate = this.transformToInteger(baseRate);
    const integerTargetCurrencyRate = this.transformToInteger(targetCurrencyRate);

    const amount = integerBaseAmount.amount
      * integerBaseRate.amount
      * integerTargetCurrencyRate.amount;

    const decimalPrecision = integerBaseRate.decimalPrecision
      + integerBaseAmount.decimalPrecision
      + integerTargetCurrencyRate.decimalPrecision;

    const unitPrecision = `${amount}`.length - decimalPrecision;

    const precision = unitPrecision + decimalPrecision;

    const floatNumber = this.transformToFloat(amount, decimalPrecision);
    const formated = this.formatMoney(floatNumber, '$', '.');

    const exchangedValue = {
      amount,
      decimalPrecision,
      floatNumber,
      formated,
      precision,
      unitPrecision
    };

    return exchangedValue;
  }

  transformToInteger(number) {
    const normalizeDecimalCharacter = parseFloat(`${number}`.replace(',', '.'));
    const stringNumber = normalizeDecimalCharacter.toString();

    const [units, decimals] = stringNumber.split('.');
    const unitPrecision = units.length;
    const decimalPrecision = decimals ? decimals.length : 0;

    const precision = unitPrecision + decimalPrecision;
    const amount = parseInt(`${units}${decimals}`);

    return {
      amount,
      decimalPrecision,
      precision,
      unitPrecision
    };
  }

  transformToFloat(amount, decimalPrecision) {
    const reversed = reverseString(`${amount}`);

    return parseFloat(
      reverseString(
        reversed.slice(0, decimalPrecision) + '.' + reversed.slice(decimalPrecision)
      )
    );
  }

  formatMoney(floatNumber, currencyCharacter, decimalCharacter) {
    const roundDecimals = (
      Math.round(floatNumber * Math.pow(10, DECIMAL_PRECISION)) / Math.pow(10, DECIMAL_PRECISION)
    ).toFixed(DECIMAL_PRECISION);

    const [units, decimals] = roundDecimals.toString().split('.');

    if (decimals === '') {
      return `${currencyCharacter}${units}`;
    }

    return `${currencyCharacter}${units}${decimalCharacter}${decimals.replace(/0+/, '')}`

  }
}

const MoneyHelperSingleton = new MoneyHelper()

export default MoneyHelperSingleton;
