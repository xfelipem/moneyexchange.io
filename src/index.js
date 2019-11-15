/**
 * Single entry point to the react app.
 */
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

/**
 * Render the aplication in the element with id "root".
 */
render(<App />, document.getElementById('root'));
