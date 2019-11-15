/**
 * CurrencyExchange
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react';
import MoneyInput from './CurrencyInput';

const CurrencyExchange = ({
  baseCurrency,
  baseInputValue,
  error,
  handleBaseCurrencyChange,
  handleClick,
  targetCurrency,
  targetInputValue
}) => {
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

CurrencyExchange.propTypes = {
  baseCurrency: PropTypes.string,
  baseInputValue: PropTypes.string,
  error: PropTypes.bool,
  handleBaseCurrencyChange: PropTypes.func,
  handleClick: PropTypes.func,
  targetCurrency: PropTypes.string,
  targetInputValue: PropTypes.string
};

export default CurrencyExchange;
