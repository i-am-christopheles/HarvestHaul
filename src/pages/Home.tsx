import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <h1>Home Page</h1>
    </>
  );
}

export default Home;
