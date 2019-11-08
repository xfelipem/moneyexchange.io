import React, { useEffect, useReducer, Profiler } from 'react';
import { Segment, Grid, Form } from 'semantic-ui-react';
import {
  validateNumericWithDecimals,
  validateDecimalQuantity,
} from '../helpers';
import MoneyHelper from '../helpers/money'
import { moneyExchangeReducer, moneyExchangeInitialState } from '../state/reducers';
import { moneyExchangeActions } from '../state/actions';
import fetchRates from '../state/fetchers';

const MoneyExchange = () => {
  const [state, dispatch] = useReducer(moneyExchangeReducer, moneyExchangeInitialState);

  const {
    hasError,
    error,
    baseCurrency,
    baseRate,
    baseDecimalCharacter,
    baseInputValue,
    ratesTimestamp,
    targetCurrency,
    targetRate,
    // targetDecimalCharacter,
    targetInputValue
  } = state;

  useEffect(() => {
    fetchRates({
      timestamp: ratesTimestamp,
      dispatch
    });
  }, [baseInputValue, ratesTimestamp]);

  const handleBaseCurrencyChange = (event) => {
    const { value } = event.target;
    const isNumericWithDecimals = validateNumericWithDecimals(value, baseDecimalCharacter);
    const hasValidAmountOfDecimals = validateDecimalQuantity(value, baseDecimalCharacter);

    if (!isNumericWithDecimals) {
      dispatch(moneyExchangeActions.showError('Only numbers are allowed', value))
      return;
    }

    if (!hasValidAmountOfDecimals) {
      dispatch(moneyExchangeActions.showError('Only four decimals are allowed', value))
      return;
    }

    dispatch(moneyExchangeActions.setBaseValue(value))
  };

  const handleClick = () => {
    const isbaseEmpty = baseInputValue === '';

    if (!hasError && !isbaseEmpty) {
      const targetValue = MoneyHelper.convert(baseInputValue, baseRate, targetRate);

      dispatch(moneyExchangeActions.setTargetValue(targetValue.formated));
    }
  };

  return (
    <Profiler id="MoneyExhcange" onRender={console.info}>
      <Segment style={{ padding: '5em' }} vertical>
        <Form>
          <Grid columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column textAlign='right' style={{ paddingRight: '5em' }}>
                <Form.Input
                  fluid
                  placeholder={baseCurrency}
                  error={hasError ? error : false}
                  value={baseInputValue}
                  onChange={handleBaseCurrencyChange}
                />
              </Grid.Column>
              <Grid.Column textAlign='left' style={{ paddingLeft: '5em' }}>
                <Form.Input
                  fluid
                  readOnly
                  placeholder={targetCurrency}
                  value={targetInputValue}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid.Column>
                <Form.Button
                  style={{ width: '30vw' }}
                  content='Let me know!'
                  icon='right arrow'
                  labelPosition='right'
                  onClick={handleClick}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </Profiler>

  );
}

export default MoneyExchange;
