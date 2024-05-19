  import React, { useState, useEffect, useRef } from 'react';
  import axios from 'axios';
  import '/src/Chatbot.css';

  interface Message {
    sender: 'user' | 'bot';
    text: string;
  }

  const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const chatbotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };
    
      const handleClickOutside = (e: MouseEvent) => {
        if (chatbotRef.current && !chatbotRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
    
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
    
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleMessageSend = async () => {
      if (userInput.trim() !== '') {
        setMessages([...messages, { sender: 'user', text: userInput }]);
        const response = await sendMessageToChatbot(userInput);
        setMessages([...messages, { sender: 'bot', text: response }]);
        setUserInput('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleMessageSend();
      }
    };

    const sendMessageToChatbot = async (message: string) => {
      try {
        const response = await axios.post<string>('/api/chatbot', { message });
        return response.data;
      } catch (error) {
        console.error('Error sending message to chatbot:', error);
        return 'Sorry, I encountered an error.';
      }
    };

    return (
      <div ref={chatbotRef} className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
        {isOpen && (
          <>
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message message-${msg.sender}`}>
                  <span className="message-text">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="user-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleMessageSend}>Send</button>
            </div>
          </>
        )}
      </div>
    );
  };

  export default Chatbot;
