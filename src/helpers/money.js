import Dinero from 'dinero.js';
import config from '../mocks/configuration'

const { DECIMAL_PRECISION, DEFAULT_CURRENCY } = config.exchange

class MoneyHelper {
  constructor(baseCurrency = DEFAULT_CURRENCY, decimalPrecision = DECIMAL_PRECISION) {
    // Dinero.defaultAmount = 0
    Dinero.defaultCurrency = baseCurrency
    Dinero.defaultPrecision = decimalPrecision

    this.Dinero = Dinero;
  }

  setExchangeApi(userKey) {
    Dinero.globalExchangeRatesApi = {
      ...Dinero.globalExchangeRatesApi,
      endpoint: `http://data.fixer.io/api/latest?access_key=${userKey}`,
      propertyPath: 'data.rates.{{to}}'
    }
  }
}

const MoneyHelperSingleton = new MoneyHelper()

export default MoneyHelperSingleton;
