import {
  Modal, Form, Button, FormControl,
} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { newNameChannel } from '../../api';
import { selectors } from '../../store/channels';

export const Rename = ({ onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const isOpen = useSelector(({ modal }) => modal.isOpen);
  const [show, setShow] = useState(isOpen);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map(({ name }) => name);
  const channelId = useSelector(({ modal }) => modal.channelId);
  const currentChannel = channels.find((channel) => channel.id === channelId);
  const { id, name } = currentChannel;
  const notify = () => toast.success(t('channel.renamed'));

  const handleClose = () => {
    setShow(!isOpen);
    onHide();
  };

  useEffect(() => {
    inputRef.current.select();
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
    initialValues: { name },
    onSubmit: ({ name: newName }) => {
      const cleanedName = leoProfanity.clean(newName);

      if (!channelsNames.includes(cleanedName)) {
        newNameChannel({ id, name: cleanedName });

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
        <Modal.Title>{ t('modal.rename') }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormControl
            className="mb-2"
            type="text"
            name="name"
            placeholder={t('modal.name')}
            ref={inputRef}
            autoComplete="current-password"
            value={values.name}
            onChange={handleChange}
            isInvalid={(touched.name && !!errors.name)}
          />
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
              { t('modal.rename') }
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
