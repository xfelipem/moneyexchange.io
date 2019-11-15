/**
 * CurrencyExchange
 * Container whichs handles the logic to exchange between currencies.
 */
import React, { useEffect, useMemo, useReducer } from 'react';
import {
  moneyExchangeReducer,
  moneyExchangeInitialState
} from '../state/reducers';
import { moneyExchangeActions } from '../state/actions';
import fetchRates from '../state/fetchers';
import MoneyHelper from '../helpers/money';
import {
  validateNumericWithDecimals,
  validateDecimalQuantity
} from '../helpers/validation';
import CurrencyExchange from '../components/CurrencyExchange';
import './money-exchange.css';

/**
 * This container handles the user interaction and the data fetching required to exchange between
 * currencies. If you need to check the display logic you can see CurrencyExchange component.
 *
 * @returns {Component}
 */
const MoneyExchange = () => {
  const [state, dispatch] = useReducer(
    moneyExchangeReducer,
    moneyExchangeInitialState
  );

  const {
    error,
    baseCurrency,
    baseRate,
    baseDecimalCharacter,
    baseInputValue,
    ratesTimestamp,
    targetCurrency,
    targetRate,
    targetInputValue
  } = state;

  const formatedExchangedValue = useMemo(() => {
    if (error || baseInputValue === '') {
      return '';
    }

    return MoneyHelper.convert(baseInputValue, baseRate, targetRate).formated;
  }, [baseInputValue, baseRate, targetRate, error]);

  useEffect(() => {
    fetchRates({
      timestamp: ratesTimestamp,
      dispatch
    });
  }, [baseInputValue, ratesTimestamp]);

  const handleBaseCurrencyChange = event => {
    const { value } = event.target;
    const isNumericWithDecimals = validateNumericWithDecimals(
      value,
      baseDecimalCharacter
    );
    const hasValidAmountOfDecimals = validateDecimalQuantity(
      value,
      baseDecimalCharacter
    );

    if (!isNumericWithDecimals) {
      dispatch(
        moneyExchangeActions.showError('Only numbers are allowed', value)
      );
      return;
    }

    if (!hasValidAmountOfDecimals) {
      dispatch(
        moneyExchangeActions.showError('Only four decimals are allowed', value)
      );
      return;
    }

    dispatch(moneyExchangeActions.setBaseValue(value));
  };

  const handleClick = () => {
    if (error) {
      return;
    }

    if (baseInputValue === '') {
      dispatch(moneyExchangeActions.setTargetValue(''));
      return;
    }

    dispatch(moneyExchangeActions.setTargetValue(formatedExchangedValue));
  };

  return (
    <CurrencyExchange
      baseCurrency={baseCurrency}
      baseInputValue={baseInputValue}
      error={error}
      handleBaseCurrencyChange={handleBaseCurrencyChange}
      handleClick={handleClick}
      targetCurrency={targetCurrency}
      targetInputValue={targetInputValue}
    />
  );
};

export default MoneyExchange;
