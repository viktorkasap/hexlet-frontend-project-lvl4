import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import fetchAll from '../../api/fetchAll';
import Modal from '../../components/Modal/Modal';
import { addMessages } from '../../store/messages';
import { open, close, setChannelId } from '../../store/modal';
import { addChannels, setCurrentChannelId } from '../../store/channels';

import Channels from './components/Channels/Channels';
import Messages from './components/Messages/Messages';

const Home = () => {
  const dispatch = useDispatch();

  const handleOpen = (type, id = null) => () => {
    dispatch(open(type));
    dispatch(setChannelId(id));
  };

  const handleClose = () => {
    setTimeout(() => {
      dispatch(close());
      dispatch(setChannelId(null));
    }, 300);
  };

  useEffect(() => {
    fetchAll()
      .then((data) => {
        const { channels, currentChannelId, messages } = data;

        dispatch(addMessages(messages));
        dispatch(addChannels(channels));
        dispatch(setCurrentChannelId(currentChannelId));
      });
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels handleOpen={handleOpen} />
        <Messages />
      </Row>

      <Modal onHide={handleClose} />
    </Container>
  );
};

export default Home;
