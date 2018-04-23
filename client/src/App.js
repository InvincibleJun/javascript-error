import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './views/Layout';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="App"/>
      </Router>
    );
  }
}

export default App;
