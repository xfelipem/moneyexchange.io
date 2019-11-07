import Axios from 'axios';
import { validateMinuteDifference } from '../helpers';
import moneyExchangeActions from './actions';

const API_REFRESH_TIME = 10;

const getRatesEndpoint = (accessKey) => `http://data.fixer.io/api/latest?access_key=${accessKey}`;

async function fetchRates(payload) {

  try {
    const {
      accessKey = '33b23d6e01efe285daf21f65e1124757',
      timestamp,
      dispatch
    } = payload;
    const mustUpdateRates = !validateMinuteDifference(API_REFRESH_TIME, timestamp);

    if (mustUpdateRates) {
      const responsePromise = await Axios.get(getRatesEndpoint(accessKey));
      const { data } = responsePromise;
      const { base, rates, timestamp } = data;

      localStorage.setItem('storedRates', JSON.stringify({ base, rates, timestamp }));
      dispatch(moneyExchangeActions.setRates(base, rates, timestamp))

      return;
    }

    const { base, rates, timestamp: ratesTimestamp } = JSON.parse(localStorage.getItem('storedRates')) || {};
    dispatch(moneyExchangeActions.setRates(base, rates, ratesTimestamp));
  }
  catch (error) {
    console.error(error);
  }
}

export default fetchRates;