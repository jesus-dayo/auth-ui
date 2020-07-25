import React from 'react';
import './App.css';
import Routes from './Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

const browserHistory = createBrowserHistory();

const App = () => (
  <Router history={browserHistory}>
    <Routes/>
  </Router>
);

export default App;
