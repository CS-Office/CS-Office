// This is the entry point for our app
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

import styles from './css/main.css';

render(
  <App />,
  document.getElementById('root')
);