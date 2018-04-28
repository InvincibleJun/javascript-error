import React, { Component } from 'react'
import './App.css'
import Layout from './views/Layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Layout} />
      </Router>
    )
  }
}

export default App
