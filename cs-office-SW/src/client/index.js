// This is the entry point for our app
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import AppRouter from './routers/AppRouter.js'

import styles from './css/main.css';

render(
  <AppRouter />,
  document.getElementById('root')
);