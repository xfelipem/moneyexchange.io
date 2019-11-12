import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { transformObjectToSemanticUiPayload } from '../helpers/semantic-ui';

const MoneyDropdown = props => {
  const { baseCurrency, isEditable, rates } = props;

  return (
    <Dropdown
      defaultValue={baseCurrency}
      labelposition={isEditable ? 'right' : 'left'}
      placeholder={baseCurrency}
      options={transformObjectToSemanticUiPayload(rates)}
    />
  );
};

export default MoneyDropdown;
