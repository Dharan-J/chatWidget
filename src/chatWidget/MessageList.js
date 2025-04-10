import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ messages, onSendMessage }) => {
  const bottomRef = useRef(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  return (
    <div className="chat-messages">
      {messages.map(message => (
        <Message key={message.id} message={message?.content} sender={message?.sender} onSendMessage={onSendMessage} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;