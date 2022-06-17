import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import AdvancedQuery from './components/advanced/AdvancedQueryComponent';

class App extends Component {

  render() {
    return (
      <BrowserRouter basename="/explorer">
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/query" element={<AdvancedQuery />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
