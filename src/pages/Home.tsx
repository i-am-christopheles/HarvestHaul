import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Chatbot from '../components/ChatContainer';
import 'animate.css';

const Home: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <>
      <NavBar />
      <Hero />
      <div className="notification animate__animated animate__shakeX" onClick={toggleChatbot}>
        Ask questions about ordering
      </div>
      {showChatbot && <Chatbot />}
    </>
  );
}

export default Home;
