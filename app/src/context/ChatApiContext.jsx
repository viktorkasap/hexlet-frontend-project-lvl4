import React, { createContext, useEffect } from 'react';


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

export const ChatApiProvider = ({ socket, children }) => {
  const NEW_MESSAGE = 'newMessage';
  const NEW_CHANNEL = 'newChannel';
  const RENAME_CHANNEL = 'renameChannel';
  const REMOVE_CHANNEL = 'removeChannel';

  useEffect(() => {
    socket.on(NEW_MESSAGE, (payload) => {
      store.dispatch(addMessage(payload));
    });

    socket.on(NEW_CHANNEL, (payload) => {
      store.dispatch(addChannel(payload));
    });

    socket.on(RENAME_CHANNEL, ({ id, name }) => {
      store.dispatch(renameChannel({ id, changes: { name } }));
    });

    socket.on(REMOVE_CHANNEL, ({ id }) => {
      store.dispatch(removeChannel(id));
      store.dispatch(setDefaultChannelId(null));
    });
  }, [socket]);

  const newChannel = (name, cb) => {
   socket.emit(NEW_CHANNEL, { name }, (response) => {
      const  {status, data: { id } } = response;

      if (status === 'ok') {
        store.dispatch(setCurrentChannelId(id));
        cb();
      }
    });
  };

  const deleteChannel = (id, cb) => {
    socket.emit(REMOVE_CHANNEL, { id }, (response) => {
      const { status } = response;

      if (status === 'ok') {
        cb();
      }
    });
  };

  const newNameChannel = ({ id, name }, cb) => {
    socket.emit(RENAME_CHANNEL, { id, name }, (response) => {
      const { status } = response;

      if (status === 'ok') {
        cb();
      }
    });
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

  return (
    <ChatApiContext.Provider value={value}>
      { children }
    </ChatApiContext.Provider>
  );
};
