import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import './styles.css';

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

export const App = () => (
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
);
