import React from 'react';
import { Form } from 'semantic-ui-react';

const MoneyInput = (props) => {
  const { baseValue, error, isEditable, onChange } = props;

  return (
    <Form.Input
      fluid
      placeholder='EUR'
      error={error}
      value={baseValue}
      readOnly={isEditable}
      onChange={onChange}
    />
  );
};

export default MoneyInput;