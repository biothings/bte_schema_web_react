import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import InstallPage from './views/Install';
import UsagePage from './views/Usage';
import TryIt from './views/TryIt';
import AdvancedQuery from './components/advanced/AdvancedQueryComponent';
import { Header } from './components/Header';
import Footer from './components/Footer';
import {delegate} from 'tippy.js';
import 'tippy.js/themes/light.css';

delegate('#root', {
  target: '[data-tippy-content]',
  theme: 'light',
  interactive: true,
  allowHTML: true
});

class App extends Component {

  render() {
    return (
      <BrowserRouter basename="/explorer">
        <Header/>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/install" element={<InstallPage />} />
            <Route path="/try-it" element={<TryIt />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="/query" element={<AdvancedQuery />} />
          </Routes> 
        <Footer/>
      </BrowserRouter>
    );
  }
  
}

export default App;
