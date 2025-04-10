// ChatWidget.jsx - Main component
import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';
import { io } from 'socket.io-client';

const ChatWidget = ({ 
  widgetId = 'default_widget', 
  primaryColor = '#4a86e8',
  title = 'Chat Support',
  position = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const botId = queryParams.get('botId');
    const organizationId = queryParams.get('organizationId');
    const jwtToken = queryParams.get('jwtToken');
  
    console.log('botId:', botId);
    console.log('organizationId:', organizationId);
    console.log('jwtToken:', jwtToken);
  }, []);
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
    sendMessageToBot(message);
  };
  const socket = useRef(null);

  const sendMessageToBot = async (msg) => {
    try {
      const response = await fetch("http://192.168.0.106:8082/send-message", {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botId: 49,
          message: msg,
          organizationId: 26,
          userId: "guest_user_1",
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response?.json(); // Adjust if the API returns text
      console.log("Response from server:", data);
      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      return null;
    }
  };
  
  useEffect(() => {
    try {
      socket.current = io('https://chat-bot.odioiq.com/chatBotV2'); // server URL
    } catch (err) {
      console.log('socketError: ', err);
    }

    try {
      socket.current.on('connect', () => {
        socket.current.emit('userDetails');
        console.log('Connected Successfully');
      });
    } catch (err) {
      console.log('ConnectionError: ', err);
    }

    socket.current.on('chatBotReply/guest_user_1', (message) => {
      console.log('message_CHATJS==>: ', message);
      addMessage('agent', message);
    });

    socket.current.on('output', (message) => {
      console.log('output_message: ', message);
    });
    notifyParentOfState(false);
    return () => {
      try {
        socket.current.disconnect(() => {});
        console.log('Disconnected Successfully');
      } catch (err) {
        console.log('DisconnectedError : ', err);
      }
    };
  }, []);
  const notifyParentOfState = (isOpen) => {
    // Send message to parent with current state
    window.parent.postMessage({
      type: 'CHAT_WIDGET_STATE',
      isOpen: isOpen,
      // You can also send recommended dimensions
      suggestedHeight: isOpen ? '550px' : '85px',
      suggestedWidth: isOpen ? '400px' : '85px'
    }, '*');
  };
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
          onClose={() => {setIsOpen(false);notifyParentOfState(false)}}
          onSendMessage={sendMessage}
        />
      ) : (
        <ChatButton onClick={() => {setIsOpen(true);notifyParentOfState(true)}} />
      )}
    </div>
  );
};

export default ChatWidget;