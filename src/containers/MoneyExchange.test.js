import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Axios from 'axios';
import ratesResponse from '../mockups/ratesResponse.json';
import MoneyExchange from './MoneyExchange.js';
import { getRatesEndpoint } from '../state/fetchers.js';

jest.mock('axios');

describe('MoneyExchange', () => {
  test('Updates the rates successfully', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      await render(<MoneyExchange />);
    });

    expect(Axios.get).toHaveBeenCalledTimes(1);
    expect(Axios.get).toHaveBeenCalledWith(getRatesEndpoint());
    expect(JSON.parse(localStorage.getItem('storedRates')).rates).toEqual(
      ratesResponse.rates
    );
  });

  test('€1000 Should be converted to $1106.55', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      const { getByPlaceholderText, getByText } = await render(
        <MoneyExchange />
      );
      fireEvent.change(getByPlaceholderText('EUR'), {
        target: { value: '1000' }
      });
      fireEvent.click(getByText('Let me know!'));

      expect(getByPlaceholderText('USD').value).toEqual('1106.55');
    });
  });

  test('€1000000000000000 Should be converted to $1,1065 x 10^25', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      const { getByPlaceholderText, getByText } = await render(
        <MoneyExchange />
      );
      fireEvent.change(getByPlaceholderText('EUR'), {
        target: { value: '100000000000000000000' }
      });
      fireEvent.click(getByText('Let me know!'));

      expect(getByPlaceholderText('USD').value).toEqual('1.1066 x 10^25');
    });
  });

  test('€0,0001 Should be converted to $0.1107', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      const { getByPlaceholderText, getByText } = await render(
        <MoneyExchange />
      );
      fireEvent.change(getByPlaceholderText('EUR'), {
        target: { value: '0,0001' }
      });
      fireEvent.click(getByText('Let me know!'));

      expect(getByPlaceholderText('USD').value).toEqual('0.1107');
    });
  });

  test('If base is empty, should reset exchange input when click the button', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      const { getByPlaceholderText, getByText } = await render(
        <MoneyExchange />
      );
      fireEvent.change(getByPlaceholderText('EUR'), {
        target: { value: '' }
      });
      fireEvent.click(getByText('Let me know!'));

      expect(getByPlaceholderText('USD').value).toEqual('');
    });
  });

  test('€100.1 Should display an error', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      const { getByPlaceholderText } = await render(<MoneyExchange />);
      const baseCurrencyInput = getByPlaceholderText('EUR');
      const inputContainer = baseCurrencyInput.parentNode;

      fireEvent.change(baseCurrencyInput, {
        target: { value: '100.1' }
      });

      expect(inputContainer.classList.contains('error')).toEqual(true);
    });
  });

  test('€1,00001 Should display an error', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      const { getByPlaceholderText } = await render(<MoneyExchange />);
      const baseCurrencyInput = getByPlaceholderText('EUR');
      const inputContainer = baseCurrencyInput.parentNode;

      fireEvent.change(baseCurrencyInput, {
        target: { value: '1,00001' }
      });

      expect(inputContainer.classList.contains('error')).toEqual(true);
    });
  });

  test('If there is an error, should not not calculate the exchange when click the button', async () => {
    Axios.get.mockResolvedValueOnce({
      data: ratesResponse
    });

    await act(async () => {
      const { getByPlaceholderText } = await render(<MoneyExchange />);
      const baseCurrencyInput = getByPlaceholderText('EUR');
      const targetCurrencyInput = getByPlaceholderText('USD');

      fireEvent.change(baseCurrencyInput, {
        target: { value: '1,00001' }
      });

      expect(targetCurrencyInput.value).toEqual('');
    });
  });
});
