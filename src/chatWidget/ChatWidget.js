// ChatWidget.jsx - Main component
import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';

const ChatWidget = ({ 
  widgetId = 'default_widget', 
  primaryColor = '#4a86e8',
  title = 'Chat Support',
  position = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  // Connect to chat server when widget opens
  useEffect(() => {
    if (isOpen && connectionStatus === 'disconnected') {
      connectToServer(widgetId);
    }
  }, [isOpen, connectionStatus, widgetId]);

  // Simulate server connection
  const connectToServer = (id) => {
    setConnectionStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setConnectionStatus('connected');
      // Add welcome message
      addMessage('system', 'Welcome to our chat support! How can we help you today?');
    }, 1000);
  };

  // Add a message to the chat
  const addMessage = (sender, content) => {
    const newMessage = {
      id: Date.now(),
      sender,
      content,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  // Send message to server
  const sendMessage = (message) => {
    // Add user message to chat
    addMessage('user', message);
    
    // Simulate server response
    setTimeout(() => {
      let response = "Thanks for your message! Our team will get back to you shortly.";
      
      // Simple bot responses
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        response = "Hello there! How can I assist you today?";
      } else if (message.toLowerCase().includes('help')) {
        response = "I'd be happy to help. Could you please provide more details about your issue?";
      } else if (message.toLowerCase().includes('bye')) {
        response = "Thank you for chatting with us. Have a great day!";
      }
      
      addMessage('agent', response);
    }, 1500);
  };

  // Expose methods to parent window when used as embedded widget
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.CustomChatWidget = {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        addSystemMessage: (message) => addMessage('system', message)
      };
    }
  }, []);

  return (
    <div 
      className="chat-widget-container" 
      style={{ 
        '--primary-color': primaryColor,
        [position]: '20px'
      }}
    >
      {isOpen ? (
        <ChatPanel 
          title={title}
          messages={messages} 
          onClose={() => setIsOpen(false)}
          onSendMessage={sendMessage}
        />
      ) : (
        <ChatButton onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
};

export default ChatWidget;