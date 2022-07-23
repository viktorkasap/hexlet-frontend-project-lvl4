import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import i18next from 'i18next';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import './styles.css';
import { en, ru } from '../locales';

import {
  Home, Login, Register, NotFound,
} from '../pages';
import { Navigation } from '../components';

import { AuthContextProvider, ChatApiProvider } from '../context';
import { useAuth } from '../hooks';
import { routes } from '../routes';

const {
  homePage, loginPage, notFoundPage, signupPage,
} = routes;

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} />
  );
};

const LangProvider = ({ children }) => {
  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      resources: { en, ru },
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      { children }
    </I18nextProvider>
  );
};

export const App = () => (
  <LangProvider>
    <AuthContextProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navigation />

          <Routes>
            <Route path={homePage()} element={(
              <ChatApiProvider>
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              </ChatApiProvider>)}
            />
            <Route path={loginPage()} element={<Login />} />
            <Route path={signupPage()} element={<Register />} />
            <Route path={notFoundPage()} element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      
      <ToastContainer />
    </AuthContextProvider>
  </LangProvider>
);
