import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import { Provider as ProviderRollBar, ErrorBoundary } from '@rollbar/react';

import store from './store';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';

import './assets/css/index.css';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const clearRU = leoProfanity.getDictionary('ru');
leoProfanity.add(clearRU);

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(
  <Provider store={store}>
    <ProviderRollBar config={rollbarConfig}>
      <ErrorBoundary errorMessage="Error in React render">
        <App />
      </ErrorBoundary>
    </ProviderRollBar>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
