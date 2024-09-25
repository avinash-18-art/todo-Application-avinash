import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import TaskItem from './components/TaskItem';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/tasks" component={TaskManager} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
App
