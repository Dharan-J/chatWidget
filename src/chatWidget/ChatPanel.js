import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';

const ChatPanel = ({ title, messages, onClose, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = () => {
    const message = inputValue.trim();
    if (message) {
      onSendMessage(message);
      setInputValue('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-title">{title}</div>
        <div className="chat-close" onClick={onClose}>×</div>
      </div>
      
      <MessageList messages={messages} onSendMessage={onSendMessage} />
      <div ref={messagesEndRef} />
      
      <div className="chat-input-area">
        <textarea 
          className="chat-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="chat-send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
