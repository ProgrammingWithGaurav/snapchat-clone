import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import Preview from './components/Preview/Preview';

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app-body">
          <Routes>
            <Route path='/' element={<WebcamCapture />}/>
            <Route path='/preview' element={<Preview />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
