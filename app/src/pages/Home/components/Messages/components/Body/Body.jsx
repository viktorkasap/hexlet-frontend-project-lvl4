import React, { useEffect, useRef } from 'react';

const MessagesList = ({ messages }) => {
  const lastRef = useRef();
  const lastItem = messages[messages.length - 1];

  useEffect(() => {
    if (lastItem) {
      lastRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    messages.map(({ id, username, body }) => (
      <div key={id} className="text-break mb-2" ref={lastRef}>
        <b>{ username }</b>
        :
        { body }
      </div>
    ))
  );
};

const Body = (({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    <MessagesList messages={messages} />
  </div>
));

export default Body;
