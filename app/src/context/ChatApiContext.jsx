import React, { createContext } from 'react';
import { io } from 'socket.io-client';

import store from '../store';

import { addMessage } from '../store/messages';
import {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
  setDefaultChannelId,
} from '../store/channels';

export const ChatApiContext = createContext({});

export const ChatApiProvider = ({ children }) => {
  const socket = io();
  const NEW_MESSAGE = 'newMessage';
  const NEW_CHANNEL = 'newChannel';
  const RENAME_CHANNEL = 'renameChannel';
  const REMOVE_CHANNEL = 'removeChannel';

  socket.on(NEW_MESSAGE, (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on(NEW_CHANNEL, (payload) => {
    store.dispatch(addChannel(payload));

    const { channels: { entities } } = store.getState();
    const [, newChannel] = Object.entries(entities)
      .find(([, channel]) => channel.name === payload.name);

    store.dispatch(setCurrentChannelId(newChannel.id));
  });

  socket.on(RENAME_CHANNEL, ({ id, name }) => {
    store.dispatch(renameChannel({ id, changes: { name } }));
  });

  socket.on(REMOVE_CHANNEL, ({ id }) => {
    store.dispatch(removeChannel(id));
    store.dispatch(setDefaultChannelId(null));
  });

  const newChannel = (name) => {
    socket.emit(NEW_CHANNEL, { name });
  };

  const deleteChannel = (id) => {
    socket.emit(REMOVE_CHANNEL, { id });
  };

  const newNameChannel = ({ id, name }) => {
    socket.emit(RENAME_CHANNEL, { id, name });
  };

  const sendMessage = (data) => {
    socket.emit(NEW_MESSAGE, data);
  };

  const value = {
    newChannel,
    deleteChannel,
    newNameChannel,
    sendMessage,
  };

  return <ChatApiContext.Provider value={value}> { children }</ChatApiContext.Provider>;
};
