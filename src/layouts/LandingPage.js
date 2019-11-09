import React from 'react';
import Footer from '../components/Footer';
import ResponsiveContainer from '../components/Responsive';
import MoneyExchange from '../containers/MoneyExchange';

const LandingPage = () => {
  return (
    <ResponsiveContainer>
      <MoneyExchange />
      <Footer />
    </ResponsiveContainer>
  );
};
export default LandingPage;
