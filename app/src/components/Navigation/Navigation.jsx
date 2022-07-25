import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';

const LogOut = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? (
        <Button onClick={auth.logOut}>
          { t('logout') }
        </Button>
      )
      : null
  );
};

const Navigation = () => {
  const { homePage } = routes;

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
          <Link className="navbar-brand" to={homePage()}>Hexlet Chat</Link>
        <LogOut />
      </Container>
    </Navbar>
  );
};

export default Navigation;
