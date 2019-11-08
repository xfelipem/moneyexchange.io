import Dinero from 'dinero.js';
import Decimal from 'decimal.js';
import config from '../mocks/configuration'

const { DECIMAL_PRECISION, DEFAULT_CURRENCY } = config.exchange

class MoneyHelper {
  constructor(baseCurrency = DEFAULT_CURRENCY, decimalPrecision = DECIMAL_PRECISION) {
    // Dinero.defaultAmount = 0
    Dinero.defaultCurrency = baseCurrency
    Dinero.defaultPrecision = decimalPrecision

    Decimal.set({ rounding: 7 });

    this.Dinero = Dinero;
  }

  convert(baseAmount, targetCurrency, rates) {
    const targetCurrencyRate = { ...rates }[targetCurrency];
    const integerBaseAmount = this.transformToInteger(baseAmount);
    const integerTargetCurrencyRate = this.transformToInteger(targetCurrencyRate);
    const dineroBaseAmount = Dinero({
      amount: integerBaseAmount.integer,
      precision: integerBaseAmount.precision
    });
    const dineroTargetCurrencyRate = Dinero({
      amount: integerTargetCurrencyRate.integer,
      precision: integerTargetCurrencyRate.precision
    });

    const [dineroBaseValue, dineroTargetRate] = Dinero.normalizePrecision([
      dineroBaseAmount,
      dineroTargetCurrencyRate
    ]);

    const exchange = dineroBaseValue.getAmount() * dineroTargetRate.getAmount();
    const precision = 10 ** (dineroBaseValue.getPrecision()-1);

    const exchangedValue = Dinero({
      amount: exchange,
      currency: targetCurrency,
      precision: dineroBaseValue.getPrecision()
    });

    console.log({
      exchange,
      precision,
      base: dineroBaseValue.toObject(),
      exchangedValue: exchangedValue.toObject(),
      precisionAmount: integerBaseAmount.precision,
      precisionTarget: integerTargetCurrencyRate.precision,
      targetCurrencyRate
    });

    return exchangedValue
      .toObject();
  }

  transformToInteger(number) {
    const normalizeDecimalCharacter = parseFloat(`${number}`.replace(',', '.'));

    console.log({ normalizeDecimalCharacter });

    const decimalNumber = new Decimal(normalizeDecimalCharacter);
    const [digit0, digit1] = decimalNumber.d;

    console.log({ decimalPrecision: decimalNumber.precision(), precision: digit1 ? `${digit1}`.length : 1 });


    return {
      integer: digit1 ? parseInt(`${digit0}${digit1}`) : digit0,
      precision: decimalNumber.precision()
    };
  }
}

const MoneyHelperSingleton = new MoneyHelper()

export default MoneyHelperSingleton;
