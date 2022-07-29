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

const Rename = ({ onHide }) => {
  const { newNameChannel } = useChatApi();
  const { t } = useTranslation();
  const inputRef = useRef();
  const [show, setShow] = useState(true);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map(({ name }) => name);
  const channelId = useSelector(({ modal }) => modal.channelId);
  const currentChannel = channels.find((channel) => channel.id === channelId);
  const { id, name } = currentChannel;
  const notify = () => toast.success(t('channel.renamed'));

  const handleClose = () => {
    setShow(false);
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
    touched, errors, values, handleSubmit, handleChange, isSubmitting,
  } = formik;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ t('modal.rename') }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormLabel className="visually-hidden" htmlFor="name">{t('channel.name')}</FormLabel>
          <FormControl
            className="mb-2"
            type="text"
            name="name"
            id="name"
            placeholder={t('modal.name')}
            ref={inputRef}
            autoComplete="current-password"
            value={values.name}
            disabled={isSubmitting}
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

export default Rename;
