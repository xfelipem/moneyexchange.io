/**
 * CurrencyInput
 * This layer allow us to scalate the features related to select different bases and target
 * currencies.
 */
import React from 'react';
import { Input } from 'semantic-ui-react';

/**
 * Component which works as a data transformer, taking the currency object as a property
 *
 * @returns {Component}
 */
const CurrencyInput = props => {
  const { currency, error, value, onChange, readOnly } = props;

  return (
    <Input
      fluid
      readOnly={readOnly}
      placeholder={currency.id}
      error={error}
      value={value}
      onChange={onChange}
      label={currency.character}
    />
  );
};

export default CurrencyInput;
