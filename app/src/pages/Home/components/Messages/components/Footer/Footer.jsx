import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import leoProfanity from 'leo-profanity';

import { sendMessage } from '../../../../../../api';

export const Footer = () => {
  const ICON_SIZE = 20;
  const { t } = useTranslation();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, { resetForm }) => {
      if (message !== '') {
        const cleanedMessage = leoProfanity.clean(message);
        const data = { body: cleanedMessage, channelId: currentChannelId, username };
        sendMessage(data);
        resetForm();
      }
    },
  });

  const { values, handleSubmit, handleChange } = formik;

  return (
    <div className="mt-auto px-5 py-3">
      <div>
        <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              name="message"
              autoComplete="message"
              placeholder={t('channel.message')}
              value={values.message}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="link"
              className="btn-group-vertical text-dark"
              disabled={!values.message.length > 0}
            >
              <ArrowRightSquare size={ICON_SIZE} />
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};
