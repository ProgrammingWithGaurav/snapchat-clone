import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import Preview from './components/Preview/Preview';
import Chats from './components/Chats/Chats';
import ChatView from './components/ChatView/ChatView';

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app-body">
          <Routes>
            <Route path='/' element={<WebcamCapture />}/>
            <Route path='/preview' element={<Preview />}/>
            <Route path='/chats' element={<Chats />}/>
            <Route path='/chats/view' element={<ChatView />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
