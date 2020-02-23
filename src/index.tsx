import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import './styles/index.scss';

import { initGA } from './hooks/GoogleAnalytics';
import { ServiceWorkerProvider } from './hooks/ServiceWorkerContext';
import { ThemeProvider } from './hooks/ThemeContext';

import App from './components/App';
import ServiceWorkerUI from './components/ServiceWorkerUI';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_API_URI,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
});

initGA();

ReactDOM.render(
  <ServiceWorkerProvider>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <App />
        <ServiceWorkerUI />
      </ThemeProvider>
    </ApolloProvider>
  </ServiceWorkerProvider>,
  document.getElementById('root')
);
