import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';

import { ThemeProvider } from './context/theme-context';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
