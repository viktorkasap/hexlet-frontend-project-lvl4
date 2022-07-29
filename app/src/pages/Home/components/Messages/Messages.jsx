import React from 'react';
import { useSelector } from 'react-redux';
/* eslint  no-shadow: 0 */

import { selectors as channelsSelectors } from '../../../../store/channels';

// import { Header, Body, Footer } from './components';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

const Messages = () => {
  // const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  // const currentChannel = useSelector(
  //   (state) => channelsSelectors.selectById(state, currentChannelId),
  // );
  // const allMessages = useSelector(messagesSelectors.selectAll);
  //

  const { currentChannelId, currentChannel, allMessages } = useSelector((state) => ({
    currentChannelId: state.channels.currentChannelId,
    currentChannel: (state) => channelsSelectors.selectById(state, state.channels.currentChannelId),
    allMessages: Object.values(state.messages.entities),
  }));
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

export default Messages;
