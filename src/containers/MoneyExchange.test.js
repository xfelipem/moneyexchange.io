import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MoneyExchange from './MoneyExchange';
import { Form } from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });

test('MoneyExchange changes the target currency input after click', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange.find(Form.Input).first().simulate('change', {
    target: { value: '100,2339' }
  });
  moneyExchange.find(Form.Button).simulate('click');

  expect(moneyExchange.find(Form.Input)[1]).toEqual('110.570019768');
});
