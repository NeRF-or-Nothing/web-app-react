import React from 'react';
import './App.css';
import Navigationbar from './components/Navigationbar';
import { BrowserRouter as Router, Route, Switch}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Community from './pages/community';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (  
    <Router>
    <Navigationbar />
    <Switch>
        <Route exact path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/community' element={<Community/>} />
    </Switch>
    </Router>

  );
}

export default App;
