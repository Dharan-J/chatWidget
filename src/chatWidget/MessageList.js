import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;