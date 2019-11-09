import { moneyExchangeActions } from './actions';

const storedState = JSON.parse(localStorage.getItem('storedRates')) || {};

export const moneyExchangeInitialState = {
  hasError: false,
  isFetching: true,
  error: { content: '' },
  baseCurrency: storedState.base,
  baseRate: 1,
  baseDecimalCharacter: ',',
  baseInputValue: '',
  rates: storedState.rates,
  ratesTimestamp: storedState.timestamp,
  targetCurrency: 'USD',
  targetRate: 1.10655,
  targetDecimalCharacter: '.',
  targetInputValue: '',
};

export const moneyExchangeReducer = (
  state = moneyExchangeInitialState,
  action
) => {
  switch (action.type) {
    case moneyExchangeActions.SET_BASE_VALUE:
      return Object.assign({}, state, {
        hasError: false,
        error: { content: '' },
        baseInputValue: action.baseValue,
      });
    case moneyExchangeActions.SET_RATES:
      return Object.assign({}, state, {
        baseCurrency: action.baseCurrency,
        rates: action.rates,
        ratesTimestamp: action.ratesTimestamp,
      });
    case moneyExchangeActions.SET_TARGET_VALUE:
      return Object.assign({}, state, {
        hasError: false,
        error: { content: '' },
        targetInputValue: action.targetValue,
      });
    case moneyExchangeActions.SHOW_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: { content: action.errorMessage },
        baseInputValue: action.baseValue,
      });
    default:
      return state;
  }
};

export default moneyExchangeReducer;
