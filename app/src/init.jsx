import React from 'react';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as ProviderRollBar, ErrorBoundary } from '@rollbar/react';

import { App } from './app/App';
import { en, ru } from './locales';
import store from './store';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default async () => {
  const clearRU = leoProfanity.getDictionary('ru');
  leoProfanity.add(clearRU);
  
  const i18n = i18next.createInstance();
  
  await i18n
    .use(initReactI18next)
    .init({
      resources: { en, ru },
      fallbackLng: 'ru',
    });
  
  const vdom = (
    <ProviderRollBar config={rollbarConfig}>
      <ErrorBoundary errorMessage="Error in React render">
        <StoreProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </StoreProvider>
      </ErrorBoundary>
    </ProviderRollBar>
  );
  
  return vdom;
};
