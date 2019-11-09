export const moneyExchangeActions = {
  /** ACTION TYPES */
  SET_RATES: 'SET_RATES',
  SET_BASE_VALUE: 'SET_BASE_VALUE',
  SET_TARGET_VALUE: 'SET_TARGET_VALUE',
  SHOW_ERROR: 'SHOW_ERROR',
  /**ACTION CREATORS */
  setRates: (baseCurrency, rates, ratesTimestamp) => ({
    type: moneyExchangeActions.SET_RATES,
    baseCurrency,
    rates,
    ratesTimestamp,
  }),
  setBaseValue: baseValue => ({
    type: moneyExchangeActions.SET_BASE_VALUE,
    baseValue,
  }),
  setTargetValue: targetValue => ({
    type: moneyExchangeActions.SET_TARGET_VALUE,
    targetValue,
  }),
  showError: (errorMessage, baseValue) => ({
    type: moneyExchangeActions.SHOW_ERROR,
    baseValue,
    errorMessage,
  }),
};

export default moneyExchangeActions;
