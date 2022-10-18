import React from 'react';
import './App.css';
import Navbar from './components/Navbar/index';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Community from './pages/community';

function App() {
  return (  
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/community' element={<Community/>} />
    </Routes>
    </Router>

  );
}

export default App;
