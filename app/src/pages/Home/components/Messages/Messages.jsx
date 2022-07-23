import React from 'react';
import { useSelector } from 'react-redux';

import { selectors as channelsSelectors } from '../../../../store/channels';
import { selectors as messagesSelectors } from '../../../../store/messages';

import { Header, Body, Footer } from './components';

export const Messages = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );
  const allMessages = useSelector(messagesSelectors.selectAll);
  const messages = allMessages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header channelName={currentChannel?.name} count={messages.length} />
        <Body messages={messages} />
        <Footer />
      </div>
    </div>
  );
};
