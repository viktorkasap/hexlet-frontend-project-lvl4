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
    auth, signupPath, authFailed, setAuthFailed, values, navigate, inputRef, redirectPath, rollbar,
  } = props;

  try {
    const authResponse = await axios.post(signupPath(), values);

    localStorage.setItem('userId', JSON.stringify(authResponse.data));
    auth.logIn();
    navigate(redirectPath);
  } catch (err) {
    if (err.isAxiosError && err.response.status === 401) {
      console.log(`ERROR 401: ${err.message}`);
      console.log('authFailed:', authFailed);

      rollbar.err(err);

      inputRef.current.select();
      setAuthFailed(true);
      return false;
    }

    throw err;
  }

  return true;
};

const FormLogin = ({
  auth, signupPath, navigate, redirectPath,
}) => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints'))
      .required(t('signup.required')),
    password: Yup
      .string()
      .min(6, t('signup.passMin'))
      .required(t('signup.required')),
    passwordConfirm: Yup
      .string()
      .oneOf([Yup.ref('password'), null], t('signup.mustMatch')),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { username: '', password: '', passwordConfirm: '' },
    onSubmit: (values) => handleSubmitForm(
      {
        auth,
        signupPath,
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
      <h1 className="text-center mb-4">{ t('login.signup') }</h1>

      <FloatingLabel label={t('signup.username')} controlId="username" className="mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          placeholder={t('signup.username')}
          ref={inputRef}
          value={values.username}
          onChange={handleChange}
          isInvalid={(touched.username && !!errors.username) || authFailed}
        />

        <FormControl.Feedback type="invalid" tooltip>{ errors.username }</FormControl.Feedback>
      </FloatingLabel>

      <FloatingLabel label={t('signup.password')} controlId="password" className="mb-3">
        <FormControl
          type="password"
          name="password"
          placeholder={t('signup.password')}
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          isInvalid={(touched.password && !!errors.password) || authFailed}
        />

        <FormControl.Feedback type="invalid" tooltip>{ errors.password }</FormControl.Feedback>
      </FloatingLabel>

      <FloatingLabel label={t('signup.confirm')} controlId="password-confirm" className="mb-4">
        <FormControl
          type="password"
          name="passwordConfirm"
          placeholder={t('signup.confirm')}
          autoComplete="new-password"
          value={values.passwordConfirm}
          onChange={handleChange}
          isInvalid={(touched.passwordConfirm && !!errors.passwordConfirm) || authFailed}
        />

        <FormControl.Feedback type="invalid" tooltip>{ errors.passwordConfirm }</FormControl.Feedback>
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
