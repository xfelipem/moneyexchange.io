import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const transformRatesToSemanticUiPayload = (rawRates) => Object.keys(rawRates)
  .map((moneyType) => {
    return {
      key: moneyType,
      text: moneyType,
      value: moneyType
    }
  });

const MoneyDropdown = (props) => {
  const { baseCurrency, isEditable, rates } = props;

  return (
    <Dropdown
      defaultValue={baseCurrency}
      labelposition={isEditable ? 'right' : 'left'}
      placeholder={baseCurrency}
      options={transformRatesToSemanticUiPayload(rates)}
    />
  );
};

export default MoneyDropdown;