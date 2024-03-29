import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import leoProfanity from 'leo-profanity';

import useChatApi from '../../../../../../hooks/useChatApi';

const Footer = () => {
  const ICON_SIZE = 20;
  const { sendMessage } = useChatApi();
  const { t } = useTranslation();
  const inputRef = useRef(null);
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

  useEffect(() => {
    inputRef.current.focus();
  }, [formik]);

  const {
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
  } = formik;

  return (
    <div className="mt-auto px-5 py-3">
      <div>
        <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              name="message"
              ref={inputRef}
              placeholder={t('channel.message')}
              aria-label={t('message.new')}
              value={values.message}
              disabled={isSubmitting}
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

export default Footer;
