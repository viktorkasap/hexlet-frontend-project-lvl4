import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';

import ChannelsList from './components/ChannelsList/ChannelsList';

const Channels = ({ handleOpen }) => {

  const { t } = useTranslation();
  const handleAdd = () => handleOpen('addChannel');
  const handleRename = (id) => handleOpen('renameChannel', id);
  const handleRemove = (id) => handleOpen('removeChannel', id);

  return (
      <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>
                  {' '}
                  { t('home.channels') }
              </span>
              <Button
          variant="link"
          className="p-0 text-primary btn-group-vertical"
          onClick={handleAdd()}
        >
                  <PlusSquare />
                  <span className="visually-hidden">
                      +
                  </span>
              </Button>
          </div>

          <ChannelsList
handleRename={handleRename}
handleRemove={handleRemove} />
      </Col>
  );

};

export default Channels;
