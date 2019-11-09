import React from 'react';
import { Input } from 'semantic-ui-react';

const MoneyInput = props => {
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

export default MoneyInput;
