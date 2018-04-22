import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './views/Layout';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    // throw new Error('324')
    return (
      <Router>
        <div className="App">
          <Layout />
        </div>
      </Router>
    );
  }
}

export default App;
