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
    <div className="App">
    <Router>
    <Navigationbar />
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/community' component={Community} />
    </Switch>
    </Router>
    </div>
    
  );
}

export default App;
