import React from 'react';

const Message = ({ message }) => {
  const { sender, content, timestamp } = message;
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };
  
  return (
    <div className={`chat-message ${sender}-message`}>
      <div className="message-content">{content}</div>
      <div className="message-time">{formatTime(timestamp)}</div>
    </div>
  );
};

export default Message;