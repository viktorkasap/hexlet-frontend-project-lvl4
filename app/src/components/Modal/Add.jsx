import {
  Modal, Form, Button, FormControl, FormLabel,
} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useChatApi from '../../hooks/useChatApi';
import { selectors } from '../../store/channels';

const Add = ({ onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const isOpen = useSelector(({ modal }) => modal.isOpen);
  const [show, setShow] = useState(isOpen);
  const channelsNames = useSelector(selectors.selectAll).map(({ name }) => name);
  const notify = () => toast.success(t('channel.created'));
  const { newChannel } = useChatApi();

  const handleClose = () => {
    setShow(!isOpen);
    onHide();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints'))
      .notOneOf(channelsNames, t('modal.uniq')),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { name: '' },
    onSubmit: ({ name }) => {
      const cleanedName = leoProfanity.clean(name);
      
      if (!channelsNames.includes(cleanedName)) {
        newChannel(leoProfanity.clean(name));

        if (!formik.errors.name) {
          handleClose();
          notify();
        }
      }
    },
  });

  const {
    touched, errors, values, handleSubmit, handleChange,
  } = formik;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {' '}
          { t('modal.add') }
          {' '}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormControl
            className="mb-2"
            type="text"
            name="name"
            id="name"
            placeholder={t('modal.name')}
            ref={inputRef}
            value={values.name}
            onChange={handleChange}
            isInvalid={(touched.name && !!errors.name)}
          />
          <FormLabel className="visually-hidden" htmlFor="name">{t('channel.name')}</FormLabel>
          <FormControl.Feedback type="invalid">{ errors.name }</FormControl.Feedback>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleClose}
            >
              { t('modal.cancel') }
            </Button>

            <Button
              type="submit"
              variant="primary"
            >
              { t('modal.add') }
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
