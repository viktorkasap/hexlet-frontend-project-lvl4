import React from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Channel from './Channel/Channel';
import { selectors } from '../../../../../../store/channels';

const ChannelsList = ({ handleRename, handleRemove }) => {

  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
      <Nav
fill
variant="pills"
className="d-flex flex-column px-2"
as="ul">
          {
        channels.map(
          (channel) => (
              <Channel
              key={channel.id}
              currentChannelId={currentChannelId}
              channelData={{ ...channel }}
              handleRename={handleRename}
              handleRemove={handleRemove}
            />
          ),
        )
      }
      </Nav>
  );

};

export default ChannelsList;
