import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  FloatingLabel,
  FormControl,
  Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

const handleSubmitForm = async (props) => {
  const {
    auth, loginPath, authFailed, setAuthFailed, values, navigate, inputRef, redirectPath, rollbar,
  } = props;

  try {
    const authResponse = await axios.post(loginPath, values);

    localStorage.setItem('userId', JSON.stringify(authResponse.data));
    auth.logIn();
    navigate(redirectPath);
  } catch (err) {
    if (err.isAxiosError && err.response.status === 401) {
      console.log(`ERROR 401: ${err.message}`);
      console.log('authFailed:', authFailed);

      rollbar.error(err);
      inputRef.current.select();
      setAuthFailed(true);
      return false;
    }

    throw err;
  }

  return true;
};

const FormLogin = ({
  auth, loginPath, navigate, redirectPath,
}) => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const authMessage = t('login.authFailed');
  const rollbar = useRollbar();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .required(t('signup.required')),
    password: Yup
      .string()
      .required(t('signup.required')),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { username: '', password: '' },
    onSubmit: (values) => handleSubmitForm(
      {
        auth,
        loginPath,
        authFailed,
        setAuthFailed,
        values,
        navigate,
        redirectPath,
        inputRef,
        rollbar,
      },
    ),
  });

  const {
    touched, errors, values, handleSubmit, handleChange,
  } = formik;

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">{ t('login.submit') }</h1>

      <FloatingLabel label={t('login.username')} controlId="username" className="mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          placeholder={t('login.username')}
          ref={inputRef}
          value={values.username}
          onChange={handleChange}
          isInvalid={(touched.username && !!errors.username) || authFailed}
        />
      </FloatingLabel>

      <FloatingLabel label={t('login.password')} controlId="password" className="mb-4">
        <FormControl
          type="password"
          name="password"
          placeholder={t('login.password')}
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          isInvalid={(touched.password && !!errors.password) || authFailed}
        />

        <FormControl.Feedback type="invalid" tooltip>{ errors.password ?? authMessage }</FormControl.Feedback>
      </FloatingLabel>

      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
      >
        { t('login.submit') }
      </Button>
    </Form>
  );
};

export default FormLogin;
