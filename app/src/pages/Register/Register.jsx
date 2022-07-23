import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';

import Form from './components/Form';

import regImg from '../../assets/img/reg.jpg';

import { useAuth } from '../../hooks';
import { routes } from '../../routes';

export const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { homePage, signupPath } = routes;

  useEffect(() => {
    if (auth.loggedIn) {
      navigate(homePage());
    }
  }, []);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 d-flex align-items-center justify-content-center" md={6}>
                <Image className="rounded-circle" src={regImg} alt="Enter" />
              </Col>
              <Form
                auth={auth}
                signupPath={signupPath}
                navigate={navigate}
                redirectPath={homePage()}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
