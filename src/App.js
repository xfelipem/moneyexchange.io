/**
 * Application
 * This layer allow us to scalate the application by adding a router or a centralized store like
 * Redux.
 */
import React from 'react';
import LandingPage from './layouts/LandingPage';

/**
 * Component which works as single entry point to run the aplication.
 *
 * @returns {Component}
 */
const App = () => {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
};

export default App;
