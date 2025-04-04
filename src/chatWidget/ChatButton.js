// ChatButton.jsx
import React from 'react';

const ChatButton = ({ onClick }) => {
  return (
    <div className="chat-button" onClick={onClick}>
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path 
          fill="currentColor" 
          d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20"
        />
      </svg>
    </div>
  );
};

export default ChatButton;
