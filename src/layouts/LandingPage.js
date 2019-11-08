import React, { Profiler } from 'react'
import Footer from '../components/Footer';
import ResponsiveContainer from '../components/Responsive';
import MoneyExchange from '../containers/MoneyExchange';

const LandingPage = () => {

  return (
    <Profiler id="LandingPage" onRender={console.info}>
      <ResponsiveContainer>
        <MoneyExchange />
        <Footer />
      </ResponsiveContainer>
    </Profiler>
  )
};
export default LandingPage;