import './App.css';
import React, {Component} from 'react';
import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Namecards from './components/Namecards.js';
import About from './components/About.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return ( 
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/namecards" component={Namecards}></Route>
            <Route path="/about" component={About}></Route>
          </Switch>
        </div>
      </Router>
    );
  };
}

export default App;
