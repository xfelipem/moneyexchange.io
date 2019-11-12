import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MoneyExchange from './MoneyExchange';
import { Button } from 'semantic-ui-react';
import MoneyInput from '../components/MoneyInput';

Enzyme.configure({ adapter: new Adapter() });

test('€1000 Should be converted to $1106.55', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(MoneyInput)
    .first()
    .simulate('change', {
      target: { value: '1000' }
    });
  moneyExchange.find(Button).simulate('click');

  expect(moneyExchange.find(MoneyInput).get(1).props.value).toEqual('1106.55');
});

test('€1000000000000000 Should be converted to $1,1065 x 10^25', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(MoneyInput)
    .first()
    .simulate('change', {
      target: { value: '100000000000000000000' }
    });
  moneyExchange.find(Button).simulate('click');

  expect(moneyExchange.find(MoneyInput).get(1).props.value).toEqual(
    '1.1066 x 10^25'
  );
});

test('€0,0001 Should be converted to $0.1107', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(MoneyInput)
    .first()
    .simulate('change', {
      target: { value: '0,0001' }
    });
  moneyExchange.find(Button).simulate('click');

  expect(moneyExchange.find(MoneyInput).get(1).props.value).toEqual('0.1107');
});

test('If base is empty, should reset exchange input when click the button', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(MoneyInput)
    .first()
    .simulate('change', {
      target: { value: '' }
    });

  moneyExchange.find(Button).simulate('click');

  expect(moneyExchange.find(MoneyInput).get(1).props.value).toEqual('');
});

test('€100.1 Should display an error', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(MoneyInput)
    .first()
    .simulate('change', {
      target: { value: '100.1' }
    });

  expect(moneyExchange.find(MoneyInput).get(0).props.error).toEqual(true);
});

test('€1,00001 Should display an error', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(MoneyInput)
    .first()
    .simulate('change', {
      target: { value: '1,00001' }
    });

  expect(moneyExchange.find(MoneyInput).get(0).props.error).toEqual(true);
});

test('If there is an error, should not not calculate the exchange when click the button', () => {
  // Render a checkbox with label in the document
  const moneyExchange = shallow(<MoneyExchange />);

  moneyExchange
    .find(MoneyInput)
    .first()
    .simulate('change', {
      target: { value: '1,00001' }
    });
    
  moneyExchange.find(Button).simulate('click');

  expect(moneyExchange.find(MoneyInput).get(1).props.value).toEqual('');
});
