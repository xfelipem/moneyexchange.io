import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MoneyExchange from './MoneyExchange';
import { Form } from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });

test('€1000 Should be converted to $1106.55', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(Form.Input)
    .first()
    .simulate('change', {
      target: { value: '1000' },
    });
  moneyExchange.find(Form.Button).simulate('click');

  expect(moneyExchange.find(Form.Input).get(1).props.value).toEqual('$1106.55');
});

test('€1000000000000000 Should be converted to $1106550000000000', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(Form.Input)
    .first()
    .simulate('change', {
      target: { value: '1000' },
    });
  moneyExchange.find(Form.Button).simulate('click');

  expect(moneyExchange.find(Form.Input).get(1).props.value).toEqual('$1106.55');
});