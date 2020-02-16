import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './styles/index.scss';

import { ThemeProvider } from './context/theme-context';
import * as serviceWorker from './serviceWorker';

import App from './components/App';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_API_URI,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
