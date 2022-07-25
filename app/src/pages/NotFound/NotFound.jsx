import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => (
  <Container fluid className="h-100">
    <header className="header">
      <div className="container">
        <div className="header__content">
          <h1>404 - Page not found.</h1>
        </div>
      </div>
    </header>

    <main className="main">
      <div className="container">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, sed.</p>
      </div>
    </main>
  </Container>
);

export default NotFound;
