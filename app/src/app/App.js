import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import NotFound from '../pages/NotFound/NotFound';
import Navigation from '../components/Navigation/Navigation';

import { AuthContextProvider, ChatApiProvider } from '../context';
import useAuth from '../hooks/useAuth';
import routes from '../routes/routes';

const {
  homePage, loginPage, notFoundPage, signupPage,
} = routes;

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} />
  );
};

const App = ({ socket }) => (
  <AuthContextProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navigation />

        <Routes>
          <Route
            path={homePage()}
            element={(
              <ChatApiProvider socket={socket}>
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              </ChatApiProvider>
            )}
          />
          <Route
            path={loginPage()}
            element={<Login />}
          />
          <Route
            path={signupPage()}
            element={<Register />}
          />
          <Route
            path={notFoundPage()}
            element={<NotFound />}
          />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </AuthContextProvider>
);

export { App as default };
