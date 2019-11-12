import React, { useEffect, useMemo, useReducer } from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react';
import MoneyHelper from '../helpers/money';
import {
  moneyExchangeReducer,
  moneyExchangeInitialState
} from '../state/reducers';
import { moneyExchangeActions } from '../state/actions';
import fetchRates from '../state/fetchers';
import MoneyInput from '../components/MoneyInput';
import {
  validateNumericWithDecimals,
  validateDecimalQuantity
} from '../helpers/validation';

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
    <Segment style={{ padding: '5em' }} vertical>
      <Grid columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column textAlign="right" style={{ paddingRight: '5em' }}>
            <MoneyInput
              currency={{ id: baseCurrency, character: '€' }}
              error={error}
              value={baseInputValue}
              onChange={handleBaseCurrencyChange}
            />
          </Grid.Column>
          <Grid.Column textAlign="left" style={{ paddingLeft: '5em' }}>
            <MoneyInput
              readOnly
              currency={{ id: targetCurrency, character: '$' }}
              value={targetInputValue}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Button
              style={{ width: '30vw' }}
              content="Let me know!"
              icon="right arrow"
              labelPosition="right"
              onClick={handleClick}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default MoneyExchange;
