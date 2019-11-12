import Axios from 'axios';
import moneyExchangeActions from './actions';
import appConfiguration from '../configuration';
import { validateMinuteDifference } from '../helpers/validation';

const { API_ACCESS_KEY, API_RESPONSE_LIFE } = appConfiguration.api;
const getRatesEndpoint = accessKey =>
  `http://data.fixer.io/api/latest?access_key=${accessKey}`;

async function fetchRates(payload) {
  try {
    const { timestamp, dispatch } = payload;
    const mustUpdateRates = !validateMinuteDifference(
      API_RESPONSE_LIFE,
      timestamp
    );

    if (mustUpdateRates) {
      const responsePromise = await Axios.get(getRatesEndpoint(API_ACCESS_KEY));
      const { data } = responsePromise;
      const { base, rates, timestamp } = data;

      localStorage.setItem(
        'storedRates',
        JSON.stringify({ base, rates, timestamp })
      );
      dispatch(moneyExchangeActions.setRates(base, rates, timestamp));

      return;
    }

    const { base, rates, timestamp: ratesTimestamp } =
      JSON.parse(localStorage.getItem('storedRates')) || {};

    dispatch(moneyExchangeActions.setRates(base, rates, ratesTimestamp));
  } catch (error) {
    console.error(error);
  }
}

export default fetchRates;
