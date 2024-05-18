import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Farmers from './pages/Farmers';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/about" element={ <About />} />
        <Route path="/farmers" element={ <Farmers />} />
        <Route path="/marketplace" element={ <Marketplace />} />
        <Route path="/profile" element={ <Profile />} />
      </Routes>
    </Router>
  );

}
export default App;