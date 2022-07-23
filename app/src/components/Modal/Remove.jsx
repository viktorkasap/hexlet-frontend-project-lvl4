import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

import { useChatApi } from '../../hooks';

export const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const channelId = useSelector(({ modal }) => modal.channelId);
  const notify = () => toast.success(t('channel.removed'));
  const { deleteChannel } = useChatApi();

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  const handleDelete = () => {
    deleteChannel(channelId);
    handleClose();
    notify();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ t('modal.remove') }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">
          { t('modal.sure') }
          ?
        </p>
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
            variant="danger"
            onClick={handleDelete}
          >
            { t('modal.remove') }
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
