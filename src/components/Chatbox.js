import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './Chatbox.css';
const { v4: uuidv4 } = require('uuid');

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey! How can I help you today? 😊' },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading/skeleton
  const messagesEndRef = useRef(null);
  const uuidRef = useRef(uuidv4());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput('');
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true); // Start loading/skeleton

    try {
      const response = await axios.post('https://akshay050702-chatbot.hf.space/chat', {
        messages: [input],
        thread_id: uuidRef.current,
      });
      console.log('Guid of this thread is: ' + uuidRef.current);

      // Simulating response streaming by progressively showing the bot's message
      let botMessageText = response.data || 'No response from server';
      let currentText = '';
      const botMessage = {
        sender: 'bot',
        text: currentText, // Initially empty text
      };
      setMessages((prev) => [...prev, botMessage]);

      const interval = setInterval(() => {
        if (currentText.length < botMessageText.length) {
          currentText += botMessageText.charAt(currentText.length);
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              text: currentText, 
            };
            return updatedMessages;
          });
        } else {
          clearInterval(interval);
          setIsLoading(false); 
        }
      }, 25); 

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Oops! Something went wrong.',
        },
      ]);
      setIsLoading(false);
    }

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-widget">
      {!isOpen && (
        <div className="chat-toggle" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      <div className={`chat-box-wrapper ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="chat-box">
            <div className="chat-header">
              <span>Student Tribe</span>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="chat-window">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}

              {isLoading && (
                <div className="message bot loading">
                  <div className="skeleton-loader"></div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
