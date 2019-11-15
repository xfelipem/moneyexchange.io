/**
 * LandingPage
 * This is the first layout which will be seen by the user.
 */
import React from 'react';
import LandingFooter from '../components/LandingFooter';
import ResponsiveHoc from '../hocs/Responsive';
import MoneyExchange from '../containers/MoneyExchange';

/**
 * A responsive layout to contain the exchange component.
 *
 * @returns {Component}
 */
const LandingPage = () => {
  return (
    <ResponsiveHoc>
      <MoneyExchange />
      <LandingFooter />
    </ResponsiveHoc>
  );
};
export default LandingPage;
