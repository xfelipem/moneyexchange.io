
class MoneyHelper {
  convert(baseAmount, targetCurrency, rates) {
    const targetCurrencyRate = { ...rates }[targetCurrency];

    const integerBaseAmount = this.transformToInteger(baseAmount);
    const integerTargetCurrencyRate = this.transformToInteger(targetCurrencyRate);

    const exchange = integerBaseAmount.amount * integerTargetCurrencyRate.amount;
    const decimalPrecision = integerBaseAmount.decimalPrecision + integerTargetCurrencyRate.decimalPrecision;
    const unitPrecision = `${exchange}`.length - decimalPrecision;

    const precision = unitPrecision + decimalPrecision;

    const exchangedValue = {
      amount: exchange,
      currency: targetCurrency,
      precision,
      decimalPrecision,
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
      precision,
      unitPrecision,
      decimalPrecision
    };
  }
}

const MoneyHelperSingleton = new MoneyHelper()

export default MoneyHelperSingleton;
