import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import Preview from './components/Preview/Preview';
import Chats from './components/Chats/Chats';
import ChatView from './components/ChatView/ChatView';
import { login, logout, selectUser } from './features/appSlice';
import { useDispatch } from 'react-redux';
import Login from './components/Login/Login';
import { useSelector } from 'react-redux';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        })) 
      } else {
        dispatch(logout())
      }
    })
  }, [])
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app-body">
            <Routes>
              <Route path='/' element={<WebcamCapture />} />
              <Route path='/preview' element={<Preview />} />
              <Route path='/chats' element={<Chats />} />
              <Route path='/chats/view' element={<ChatView />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
